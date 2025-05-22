import { lazy } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'
import { paths } from "../constants/paths";

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

// Dashboard
const Dashboard = lazy(() => import('@/app/pages/dashboard/page'))

// Contacts
const ViewContacts  = lazy(() => import('@/app/pages/contacts/ViewContacts'))
const AddContact    = lazy(() => import('@/app/pages/contacts/AddContact/page'))
const ContactInsights = lazy(() => import('@/app/pages/contacts/ContactInsights/page'))

const contactRoutes: RoutesProps[] = [
  {
    name: labels.contacts.viewPlural,
    path: paths.viewContacts,
    element: <ViewContacts />,
  },
  {
    name: labels.contacts.add.title,
    path: paths.addContact,
    element: <AddContact />,
  },
  {
    name: labels.contacts.insights.title,
    path: paths.contactInsights,
    element: <ContactInsights />,
  }
]
// Activities

const ViewActivities = lazy(() => import('@/app/pages/activities/ViewActivities/page'))
const AddActivity = lazy(() => import('@/app/pages/activities/AddActivity/page'))
const ActivityInsights = lazy(() => import('@/app/pages/activities/ActivityInsights/page'))

const activityRoutes: RoutesProps[] = [
    {
        name: labels.activities.viewPlural,
        path: paths.viewActivities,
        element: <ViewActivities />,
    },
    {
        name: labels.activities.add.title,
        path: paths.addActivity,
        element: <AddActivity />,
    },
    {
        name: labels.activities.insights.title,
        path: paths.activityInsights,
        element: <ActivityInsights />,
    },
    ]

// Insights

// Settings


const FAQs = lazy(() => import('@/app/(admin)/pages/faqs/page'))
const ComingSoon = lazy(() => import('@/app/(other)/coming-soon/page'))
const ContactUs = lazy(() => import('@/app/(admin)/pages/contact-us/page'))
const Pricing = lazy(() => import('@/app/(admin)/pages/pricing/page'))
const Maintenance = lazy(() => import('@/app/(other)/maintenance/page'))

// Not Found Routes
const NotFoundAdmin = lazy(() => import('@/app/(admin)/not-found'))
const NotFound = lazy(() => import('@/app/(other)/(error-pages)/error-404/page'))
const NotFound2 = lazy(() => import('@/app/(other)/(error-pages)/error-404-2/page'))

// Auth Routes
const AuthSignIn = lazy(() => import('@/app/pages/auth/sign-in/page'))
const AuthSignUp = lazy(() => import('@/app/pages/auth/sign-up/page'))
const ResetPassword = lazy(() => import('@/app/pages/auth/reset-pass/page'))
const AuthConfirmSignup = lazy(() => import('@/app/pages/auth/confirm-signup/page'))

export const authRoutes: RoutesProps[] = [
  {
    path: paths.login,
    name: labels.user.login,
    element: <AuthSignIn />,
  },
  {
    name: labels.user.signup,
    path: paths.signup,
    element: <AuthSignUp />,
  },
  {
    name: labels.user.resetPassword,
    path: paths.resetPassword,
    element: <ResetPassword />,
  },
  {
      name: labels.user.confirmSignup,
      path: paths.confirmSignup,
      element: <AuthConfirmSignup/>,
  },
  {
    name: '404 Error',
    path: '/error-404',
    element: <NotFound />,
  },
  {
    name: 'Maintenance',
    path: '/maintenance',
    element: <Maintenance />,
  },
  {
    name: '404 Error 2',
    path: '/error-404-2',
    element: <NotFound2 />,
  },
  {
    name: 'Coming Soon',
    path: '/coming-soon',
    element: <ComingSoon />,
  },
]

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  element: RouteProps['element']
  exact?: boolean
}

const initialRoutes: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to="/" />,
  },
  {
    path: '*',
    name: 'not-found',
    element: <NotFound />,
  },
]

const generalRoutes: RoutesProps[] = [
  {
    path: paths.dashboard,
    name: labels.general.dashboard,
    element: <Dashboard />,
  },
]



export const appRoutes = [
  ...initialRoutes,
  ...contactRoutes,
  ...activityRoutes,
  ...generalRoutes,
  ...authRoutes,
]
