import type { MenuItemType } from '@/types/menu'
import { paths } from "../../constants/paths";
import { useEffect } from 'react';

// Load labels synchronously at runtime
let labels: Record<string, string> = {};

try {
    // Fetch labels synchronously if in a Node.js environment
    const response = await fetch('/labels.json', { method: 'GET' });
    if (response.ok) {
        labels = await response.json();
    } else {
        console.error('Failed to fetch labels:', response.statusText);
    }
} catch (error) {
    console.error('Error fetching labels:', error);
}

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'general',
    label: 'GENERAL',
    isTitle: true,
  },
  {
    key: 'dashboard',
    icon: 'iconamoon:home-duotone',
    label: labels.general.dashboard,
    url: paths.dashboard,
  },
  {
    key: 'contacts',
    icon: 'iconamoon:profile-circle-duotone',
    label: labels.contacts.titlePlural,
    children: [
      {
        key: 'contacts-view',
        label: labels.contacts.viewPlural,
        url: paths.viewContacts,
        parentKey: 'contacts',
      },
      {
        key: 'contacts-add',
        label: labels.contacts.add.title,
        url: paths.addContact,
        parentKey: 'contacts',
      },
      {
        key: 'contacts-analytics',
        label: labels.contacts.insights.title,
        url: paths.contactInsights,
        parentKey: 'contacts',
      },
    ],
  },
  {
    key: 'activities',
    icon: 'ri:calendar-check-line',
    label: 'Activities',
    children: [
      {
        key: 'activities-view',
        label: labels.activities.viewPlural,
        url: paths.viewActivities,
        parentKey: 'activities',
      },
      {
        key: 'activities-add',
        label: labels.activities.add.title,
        url: paths.addActivity,
        parentKey: 'activities',
      },
      {
        key: 'activities-analytics',
        label: labels.activities.insights.title,
        url: paths.activityInsights,
        parentKey: 'activities',
      },
    ],
  },
  {
    key: 'settings',
    icon: 'material-symbols:settings-outline',
    label: 'Settings',
    url: paths.settings,
  },
];
