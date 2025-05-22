// 📁 src/lib/filters/contactFilters.js

import { subMonths, isAfter } from "date-fns";
import {
    registerFilter,
    applyFilter,
    getAllRegisteredFilterKeys
} from './filterSystem';

/**
 * Computes the count of contacts for each registered filter key.
 *
 * @param {Array} contactList - The full list of contacts.
 * @param {Array} activityList - List of contact activities.
 * @param {Array} sourceOptions - Source metadata (e.g., apps, websites).
 * @param {Array} sourceCategoryOptions - Categories of sources (e.g., 'app').
 * @returns {Object} Map of filterKey -> count.
 */
export function getContactCountsByFilter(contactList, activityList, sourceOptions, sourceCategoryOptions) {
    const counts = {};

    for (const filterKey of getAllRegisteredFilterKeys()) {
        try {
            counts[filterKey] = applyFilter(filterKey, contactList, activityList, {
                sourceOptions,
                sourceCategoryOptions
            }).length;
        } catch (err) {
            console.warn(`❌ Error computing count for filter '${filterKey}':`, err);
            counts[filterKey] = 0;
        }
    }

    if (process.env.REACT_APP_DEBUG) {
        console.group('[Filter Count Debug]');
        Object.entries(counts).forEach(([key, value]) => {
            console.log(`• ${key}: ${value}`);
        });
        console.groupEnd();
    }


    return counts;
}

/**
 * Returns an array of source IDs that match a given category.
 *
 * @param {Array} sourceOptions
 * @param {string} categoryKey
 * @returns {Array<string>}
 */
function getSourceIdsByCategory(sourceOptions = [], categoryKey = '') {
    return sourceOptions
        .filter(opt => opt.category?.toLowerCase() === categoryKey.toLowerCase())
        .map(opt => opt.value);
}

/**
 * Creates a reusable filter function to check if a contact's metSource
 * belongs to a specified category.
 *
 * @param {string} categoryKey - Category to filter by (e.g., 'app').
 * @param {Array} sourceOptions - Source metadata.
 * @returns {Function}
 */
function createCategoryFilter(categoryKey, sourceOptions) {
    return (contact) => {
        const matchedSource = sourceOptions.find(src => src.value === contact.metSource);
        const matches = matchedSource?.category === categoryKey;

        if (process.env.REACT_APP_DEBUG) {
            console.groupCollapsed(`🔎 [Filter: ${categoryKey}] Contact: ${contact.displayName}`);
            console.log("Met Source:", contact.metSource);
            console.log("Matched Source Object:", matchedSource);
            console.log("Source Category:", matchedSource?.category);
            console.log("Matches Filter:", matches);
            console.groupEnd();
        }

        return matches;
    };
}

/**
 * Initializes and registers all contact filters, including predefined,
 * dynamic (category-based), and relationship-based filters.
 *
 * @param {Array} sourceOptions - All available sources for contacts.
 * @param {Array} sourceCategoryOptions - All available source categories.
 */
export function initializeContactFilters(sourceOptions = [], sourceCategoryOptions = []) {
    const uniqueCategories = sourceCategoryOptions.map(opt => opt.value).filter(Boolean);

    // --- General Filters ---
    registerFilter('all', () => true);
    registerFilter('favorites', contact => contact.favorite === true);

    // --- Recent Contact Filter ---
    registerFilter('recent', (contact, activityList, recentMonths = 1) => {
        const months = Number(recentMonths) || 1;
        const oneMonthAgo = subMonths(new Date(), months);

        const createdAt = contact.createdAt ? new Date(contact.createdAt * 1000) : null;
        const metDate = contact.metDate ? new Date(contact.metDate * 1000) : null;

        const wasCreatedRecently = createdAt && isAfter(createdAt, oneMonthAgo);
        const wasMetRecently = metDate && isAfter(metDate, oneMonthAgo);

        const hadRecentActivity = activityList?.some(activity =>
            activity.contactUserIds?.includes(contact.contactId) &&
            activity.dateTime &&
            isAfter(new Date(activity.dateTime * 1000), oneMonthAgo)
        );

        return wasCreatedRecently || wasMetRecently || hadRecentActivity;
    });

    // --- Relationship Filters ---
    registerFilter('relatives', contact =>
        contact.relationshipType?.toLowerCase() === 'relative'
    );

    // --- Dynamic Category Filters ---
    uniqueCategories.forEach(categoryKey => {
        registerFilter(categoryKey, createCategoryFilter(categoryKey, sourceOptions));
    });

    // --- Debug Output ---
    if (process.env.REACT_APP_DEBUG) {
        console.groupCollapsed("📚 Registered Category Filters");
        uniqueCategories.forEach(cat => {
            const ids = getSourceIdsByCategory(sourceOptions, cat);
            console.log(`• ${cat}:`, ids.length ? `${ids.length} sourceIds` : "No matches");
        });
        console.groupEnd();
    }
}
