import IconifyIcon from '@/components/wrappers/IconifyIcon'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Nav,
  NavItem,
  NavLink,
  Row,
  Tab,
  TabContainer,
  TabContent,
  TabPane,
  Tabs,
} from 'react-bootstrap'
import Account from './Account'
import Contact from './Contact'
import SocialLinks from './SocialLinks'
import Exxtra from './Exxtra'
import Finish from './Finish'
import type { TabMenuItem } from '@/types/menu'
import React, { useState, useEffect, useMemo } from "react";
import clsx from 'clsx'
import { ValidationError } from 'yup';
import { serverSideFormValidate } from '@/helpers/data';
import { LABELS_PATH, ALLOW_SEED, DEBUG } from '@/context/constants'

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

type ValidationErrorType = {
  name?: string;
  message: string;
};

// Define TabMenuItem type if not already defined
type TabMenuItem = {
  index: number;
  name: string;
  icon: string;
  tab: JSX.Element;
};

const wizardSteps: TabMenuItem[] = [
  {
    index: 1,
    name: labels.contacts.add.sections.basics,
    icon: 'iconamoon:profile-circle-duotone',
    tab: <Account />,
  },
  {
    index: 2,
    name: labels.contacts.add.sections.contact,
    icon: 'iconamoon:profile-duotone',
    tab: <Contact />,
  },
  {
    index: 3,
    name: labels.contacts.add.sections.socials,
    icon: 'iconamoon:link-fill',
    tab: <SocialLinks />,
  },
  {
    index: 4,
    name: labels.contacts.add.sections.other,
    icon: 'iconamoon:check-circle-1-duotone',
    tab: <Exxtra />,
  },
  {
    index: 5,
    name: 'Finish',
    icon: 'iconamoon:check-circle-1-duotone',
    tab: <Finish />,
  },
]
const FormWizard = () => {
const [activeStep, setActiveStep] = useState<number>(1);
const [formData, setFormData] = useState<any>({});
const [validated, setValidated] = useState(false);
const [formErrors, setFormErrors] = useState<ValidationErrorType[]>([]);

const can_seed = ALLOW_SEED === true;
const [seeded, setSeeded] = useState(false);
const seed = true; // Set manually if you want to trigger

// Function to seed the form with dummy data
  const seedFormData = () => {
    if (seed && !seeded && can_seed) {
      setFormData({
        displayName: 'John Doe',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123-456-7890',
        email: 'john.doe@example.com',
        age: 30,
        birthday: Date.now(),
        gender: 'Male',
        sexuality: 'Heterosexual',
        relationshipType: 'Friend',
        telegramUsername: 'johndoe',
        kikUsername: 'johndoe_kik',
        signalPhoneNumber: '123-456-7890',
        snapchatUsername: 'john_doe_snap',
        linkedinUsername: 'john-doe',
        instagramUsername: 'john_doe_instagram',
        tiktokUsername: 'john_doe_tiktok',
        xUsername: 'john_doe_x',
        address: {
          address1: '123 Example St',
          address2: 'Apt 4B',
          city: 'Example City',
          state: 'CA',
          zip: '90210',
        },
        profileImage: 'https://via.placeholder.com/150',
        notes: 'This is a note about John Doe',
        interactionStyles: ['Friendly', 'Professional'],
        contactTags: ['Colleague', 'Gym Buddy'],
        timezone: 'America/Los_Angeles',
        favorite: true,
        metSource: 'Work',
        metDate: Date.now() - 1000 * 60 * 60 * 24 * 30, // 30 days ago
        activityCount: 5,
        metLocation: 'Office',
        metNotes: 'Met at the company annual meeting',
        isActive: true,
        status: 'Active',
      });
      setSeeded(true);
    }
  };

  // Show seed options in console
    if (DEBUG) {
        console.log('Seed options:', {
            can_seed,
            seeded,
            seed,
        });
    }

  // Effect to seed data when component mounts if seed is true
  React.useEffect(() => {
    seedFormData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidInput = (name: string) => {
    return !formErrors.find((error) => error.name === name);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    // Client-side validation using HTML5 form validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    // Server-side validation
    try {
      const validationReply = (await serverSideFormValidate(formData)) as ValidationError;
      const allErrors: ValidationErrorType[] = [];
      validationReply?.inner?.forEach((e) => {
        allErrors.push({
          name: e.path,
          message: e.message,
        });
      });
      if (allErrors.length > 0) {
        setFormErrors(allErrors);
      } else {
        // If no errors, proceed with submission
        console.log('Form submitted:', formData);
        // Here you would typically send formData to your backend
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  // Since each tab is a component, we need to pass down the necessary props
  const renderTabContent = (step: TabMenuItem) => {
    // Clone the element to pass props
    return React.cloneElement(step.tab, {
      formData: formData,
      handleInputChange: handleInputChange,
      formErrors: formErrors,
      validated: validated,
      isValidInput: isValidInput,
    });
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle as={'h5'} className="anchor" id="basic-wizard">
          Text
          <a className="anchor-link" href="#AddContactForm">
            #
          </a>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="mb-5">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div id="AddContactForm">
              <Tabs
                onSelect={(e) => setActiveStep(Number(e))}
                activeKey={activeStep}
                variant="pills"
                justify
                className="icon-wizard form-wizard-header bg-light p-1">
                {wizardSteps.map((step) => (
                  <Tab
                    key={step.index}
                    as={'span'}
                    className="rounded-0 py-2"
                    eventKey={step.index}
                    title={
                      <>
                        <IconifyIcon icon={step.icon} className="fs-26" />
                        {step.name}
                      </>
                    }>
                    {renderTabContent(step)}
                  </Tab>
                ))}
              </Tabs>
              <div className="d-flex flex-wrap align-items-center wizard justify-content-between gap-3 mt-3">
                <div className="first">
                  <Button variant="soft-primary" onClick={() => setActiveStep(1)}>
                    First
                  </Button>
                </div>
                <div className="d-flex gap-2">
                  <div className="previous">
                    <Button onClick={() => setActiveStep(() => activeStep - 1)} variant="primary" className={clsx({ disabled: activeStep === 1 })}>
                      <IconifyIcon icon="bx:left-arrow-alt" className="me-2" />
                      Back To Previous
                    </Button>
                  </div>
                  <div className="next">
                    <Button
                      variant="primary"
                      onClick={() => setActiveStep(() => activeStep + 1)}
                      className={clsx({ disabled: wizardSteps.length === activeStep })}>
                      Next Step
                      <IconifyIcon icon="bx:right-arrow-alt" className="ms-2" />
                    </Button>
                  </div>
                </div>
                <div className="last">
                  <Button type="submit" variant="soft-primary" disabled={activeStep !== wizardSteps.length}>
                  Finish
                </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </CardBody>
    </Card>
  )
}


const AddContactWizard = () => {
  return (
    <Row>
      <Col xs={12}>
        <FormWizard />
      </Col>
    </Row>
  )
}

export default AddContactWizard
