/**
 * @file LabelsContext.js
 *
 * React Context to provide localized labels across the app.
 * Loads label JSON data asynchronously at app startup.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Labels context
const LabelsContext = createContext(null);

/**
 * Provider component that loads labels and supplies them via context.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that can access labels.
 * @returns {JSX.Element} The context provider wrapping its children.
 */
export function LabelsProvider({ children }) {
    const [labels, setLabels] = useState(null);

    useEffect(() => {
        async function fetchLabels() {
            try {
                // You can swap to external URL if needed via environment variable
                const response = await fetch('/labels.json'); 

                if (!response.ok) {
                    throw new Error(`Failed to load labels: HTTP ${response.status}`);
                }

                const data = await response.json();
                setLabels(data);
            } catch (error) {
                console.error('Error loading labels:', error);
                setLabels({}); // Fallback to empty object to prevent crashes
            }
        }

        fetchLabels();
    }, []);

    if (!labels) {
        // Customize this as needed (spinner, splash screen, etc.)
        return <div>Loading labels...</div>;
    }

    return (
        <LabelsContext.Provider value={labels}>
            {children}
        </LabelsContext.Provider>
    );
}

// Recursive type: every non-leaf property is an object, every leaf property is a string
type DeepLabels = {
  [key: string]: string | DeepLabels;
};

/**
 * Custom React hook to access labels easily.
 *
 * @returns {DeepLabels} The labels object.
 * @throws Will throw an error if used outside of a LabelsProvider.
 */
export function useLabels(): DeepLabels {
    const context = useContext(LabelsContext);

    if (context === null) {
        throw new Error('useLabels must be used within a LabelsProvider');
    }

    return context as DeepLabels;
}
