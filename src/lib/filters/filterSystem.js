/**
 * @module filterSystem
 * @description
 * Central registry and application mechanism for contact list filters.
 * Filters can be registered with a unique key and applied by referencing that key.
 */

const contactFilters = {};

/**
 * Registers a new contact filter function by key.
 *
 * @param {string} filterKey - Unique identifier for the filter.
 * @param {Function} filterFn - Filtering function to apply.
 */
export function registerFilter(filterKey, filterFn) {
    contactFilters[filterKey] = filterFn;
}

/**
 * Applies a registered filter to a contact list.
 *
 * @param {string} filterKey - The key of the registered filter.
 * @param {Array} contactList - List of contacts to filter.
 * @param {Array} [activityList=[]] - Optional list of activities associated with contacts.
 * @param {Object} [extra={}] - Additional parameters to pass to the filter function.
 * @returns {Array} - Filtered list of contacts.
 */
export function applyFilter(filterKey, contactList, activityList = [], extra = {}) {
    const filterFn = contactFilters[filterKey];

    if (!filterFn) {
        console.warn(`[applyFilter] No filter registered for key: ${filterKey}`);
        return contactList;
    }

    return contactList.filter(contact =>
        filterFn(contact, activityList, extra)
    );
}

/**
 * Returns a list of all registered filter keys.
 *
 * @returns {Array<string>} - List of registered filter identifiers.
 */
export function getAllRegisteredFilterKeys() {
    return Object.keys(contactFilters);
}
