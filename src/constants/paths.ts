// src/constants/paths.js

export const paths = {
    home: "/",

    // Authentication
    login: "/login",
    signup: "/signup",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    confirmSignup: "/confirm-signup",
    verifyAccount: "/verify-account",
    lockScreen: "/lock-screen",
    logout: "/logout",

    // Profile
    profile: "/profile",
    editProfile: "/profile/edit",
    settings: "/settings",

    // Contacts
    viewContacts: "/contacts",
    addContact: "/contacts/add",
    viewContact: (contactId = ":contactId") => `/contacts/${contactId}`,
    updateContact: (contactId = ":contactId") => `/contacts/${contactId}/update`,
    contactInsights: "/contacts/insights",

    // Activities
    viewActivities: "/activities",
    addActivity: "/activities/add",
    addActivityByContact: (contactName = ":contactName") => `/contacts/${contactName}/add-activity`,
    viewActivity: (activityId = ":activityId") => `/activities/${activityId}`,
    updateActivity: (activityId = ":activityId") => `/activities/${activityId}/update`,
    activityInsights: "/activities/insights",


    // Membership / Billing
    membership: "/membership",
    billing: "/billing",
    paymentHistory: "/billing/payments",

    // Admin
    adminDashboard: "/admin",
    manageUsers: "/admin/users",
    manageActivities: "/admin/activities",

    // Error pages
    notFound: "/404",
    serverError: "/500",

    // Support
    help: "/help",
    faq: "/faq",
    documentation: "/docs",

    // Miscellaneous
    about: "/about",
    terms: "/terms",
    privacy: "/privacy",
    contact: "/contact",
    dashboard: "/dashboard",

};
