// src/lib/formatUtils.js
import { useState } from 'react';

/**
 * Formats an address object or contact information into a displayable string
 * @param {Object} contact - The contact object containing address information
 * @returns {string} - Formatted address string
 */
export function formatAddress(contact) {
    if (!contact) return "Location not specified";

    // If address is an object with address fields
    if (contact.address && typeof contact.address === 'object') {
        const addr = contact.address;
        const addressParts = [
            addr.address1,
            addr.address2,
            addr.city,
            addr.state,
            addr.zip
        ].filter(Boolean); // Remove empty/undefined values

        return addressParts.length > 0 ? addressParts.join(', ') : "Location not specified";
    }

    // If there are separate city and state fields
    if (contact.city && contact.state) {
        return `${contact.city}, ${contact.state}`;
    }

    // If address is a simple string
    if (contact.address && typeof contact.address === 'string') {
        return contact.address;
    }

    // Default case
    return "Location not specified";
}

/**
 * Creates a formatted display name from contact information
 * @param {Object} contact - The contact object
 * @returns {string} - Formatted name
 */
export function formatContactName(contact) {
  if (!contact) return "";

  if (contact.displayName) {
    return contact.displayName;
  }

  const first = contact.firstName || "";
  const last = contact.lastName || "";

  return `${first} ${last}`.trim();
}

/**
 * Converts a numeric rating (e.g., 3.5) into an array of star icon paths
 * for rendering full, half, and empty stars.
 *
 * @param {number} rating - The rating from 0 to 5 (can be decimal).
 * @returns {string[]} An array of 5 icon paths representing star states.
 */
export function formatStarRating(rating) {
    const fullStarIcon = '/icons/star-full.svg';
    const halfStarIcon = '/icons/star-half.svg';
    const emptyStarIcon = '/icons/star-empty.svg';

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const roundedUp = rating % 1 >= 0.75;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(fullStarIcon);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(halfStarIcon);
        } else if (i === fullStars && roundedUp) {
            stars.push(fullStarIcon);
        } else {
            stars.push(emptyStarIcon);
        }
    }

    return stars;
}

/**
 * Formats a list of contact names or IDs into a readable summary string.
 * e.g. ["John"] → "John", ["John", "Mary"] → "John and Mary",
 * ["John", "Mary", "Alex"] → "John, Mary, and Alex"
 *
 * @param {string[]} contacts - Array of contact names or IDs
 * @returns {string} Summary string
 */
export function formatPartnerSummary(contacts) {
    if (!contacts || contacts.length === 0) return 'Alone';
    if (contacts.length === 1) return contacts[0];
    if (contacts.length === 2) return `${contacts[0]} and ${contacts[1]}`;

    const allButLast = contacts.slice(0, -1).join(', ');
    const last = contacts[contacts.length - 1];
    return `${allButLast}, and ${last}`;
}



/**
 * Truncate a string to a maximum number of words.
 * @param {string} text - The text to truncate.
 * @param {number} maxWords - Max number of words.
 * @returns {string}
 */
export function truncateWords(text, maxWords) {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
}

/**
* Toggles expanded state for cards individually.
* @param {string} id - Unique activity id
*/
export function useToggleExpand() {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        if (expandedId === id) {
            setExpandedId(null); // collapse if clicking same one
        } else {
            setExpandedId(id); // expand new one
        }
    };

    return { expandedId, toggleExpand };
}

export function formatDate(date) {
    if (!date) return "No date specified";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Helper function to format date
export const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Not available';
    return formatDate(new Date(timestamp * 1000)); // Assuming timestamp is in seconds
};