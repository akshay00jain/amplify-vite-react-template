// src/app/pages/contacts/AddContact/page.tsx

import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import AddContactWizard from './components/AddContactWizard'
import { LabelsProvider } from '@/context/LabelsContext';
import { LABELS_PATH } from '@/context/constants'

// Load labels synchronously at runtime
let labels: Record<string, string> = {};

try {
    // Fetch labels synchronously if in a Node.js environment
    const response = await fetch(LABELS_PATH, { method: 'GET' });
    if (response.ok) {
        labels = await response.json();
    } else {
        console.error('Failed to fetch labels:', response.statusText);
    }
} catch (error) {
    console.error('Error fetching labels:', error);
}

const Wizard = () => {
  return (
    <>
      <PageBreadcrumb subName={labels.contacts.titlePlural} title={labels.contacts.add.title} />
      <PageMetaData title={labels.contacts.add.title} />
      <LabelsProvider>
      <AddContactWizard />
        </LabelsProvider>
    </>
  )
}

export default Wizard
