// labels.ts
export async function fetchLabels(): Promise<Record<string, string>> {
    let labels: Record<string, string> = {};

    try {
        const response = await fetch('/labels.json', { method: 'GET' });
        if (response.ok) {
            labels = await response.json();
        } else {
            console.error('Failed to fetch labels:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching labels:', error);
    }

    return labels;
}

import React, { useState, useEffect, createContext, useContext } from 'react';

const LabelsContext = createContext({}); // Provide a default value

export function LabelsProvider({ children }) {
    const [labels, setLabels] = useState({});

    useEffect(() => {
        async function loadLabels() {
            const fetchedLabels = await fetchLabels();
            setLabels(fetchedLabels);
        }

        loadLabels();
    }, []);

    return (
        <LabelsContext.Provider value={labels}>
            {children}
        </LabelsContext.Provider>
    );
}

export function useLabels() {
    const context = useContext(LabelsContext);
    if (context === undefined) {
        throw new Error('useLabels must be used within a LabelsProvider');
    }
    return context;
}