import { getCurrentUser } from "@aws-amplify/auth"; // Modular import for retrieving current user
import { Hub } from "@aws-amplify/core"; // Hub for listening to auth events

/**
 * Retrieves the current authenticated user's ID (Cognito sub).
 * @returns {Promise<string|null>} userId
 */
export async function getCurrentUserId() {
    try {
        const user = await getCurrentUser(); // Get the current user
        return user.attributes.sub; // Return the user's ID (Cognito sub)
    } catch (error) {
        console.error("Error getting current user ID:", error);
        return null; // Return null if user is not authenticated
    }
}

/**
 * Ensures the user's ID is available, even if authentication is not ready yet.
 * @param {string|null} existingUserId - The user ID if it's already known.
 * @returns {Promise<string>} userId
 */
export async function ensureUserIdReady(existingUserId) {
    if (existingUserId) return existingUserId;

    try {
        // Try to get the user ID immediately
        const user = await getCurrentUser();
        return user.attributes.sub;
    } catch (initialError) {
        console.warn("Auth not ready yet, listening for configuration...");
    }

    // If immediate attempt fails, wait for the 'configured' event
    return new Promise((resolve, reject) => {
        const listener = (data) => {
            if (data.payload.event === "configured") {
                // Stop listening once the configuration is ready
                Hub.remove("auth", listener);

                // Fetch the user ID after the configuration is ready
                getCurrentUser()
                    .then((user) => resolve(user.attributes.sub))
                    .catch((err) => reject(err));
            }
        };

        // Start listening for auth events
        Hub.listen("auth", listener);

        // Optional: Timeout after 5 seconds
        setTimeout(() => {
            Hub.remove("auth", listener);
            reject(new Error("Auth configuration timeout."));
        }, 5000);
    });
}