import clsx from 'clsx'
import { useState, useMemo } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useForm, FormProvider, useWatch } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import type { TabMenuItem } from '@/types/menu'
import Basics from './Basics'
import WhoWhat from './WhoWhat'
import Gallery from './Gallery'
import LastTab from './LastTab'
import { basicActivitySchema, gallerySchema, whoWhatSchema, lastTabSchema } from "@/validation/activityValidation";
import { LABELS_PATH } from '@/context/constants'

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

const schemaMap = [
  basicActivitySchema,
  whoWhatSchema,
  gallerySchema,
  lastTabSchema,
];

const CreateActivityForms = () => {
  const [activeStep, setActiveStep] = useState<number>(1)

  // Memoize the resolver for the current step
  const resolver = useMemo(
    () => yupResolver(schemaMap[activeStep]),
    [activeStep]
  );

  
const methods = useForm({
    resolver,
    mode: "onChange",
    shouldUnregister: false,
  });

  // Watch values globally
  const activityType = useWatch({ control: methods.control, name: "activityType" });
  const secondaryActivityTypes = useWatch({ control: methods.control, name: "secondaryActivityTypes" });

  // Determine if "intimate" fields should be shown
  const showIntimateFields =
    activityType === "intimate" ||
    (Array.isArray(secondaryActivityTypes) && secondaryActivityTypes.includes("intimate"));

  console.log("activityType:", activityType);
  console.log("secondaryActivityTypes:", secondaryActivityTypes);
  console.log("showIntimateFields:", showIntimateFields);

  const formSteps: TabMenuItem[] = [
  {
    index: 1,
    name: labels.activities.add.sections.basics.title,
    icon: 'bxs:contact',
    tab: <Basics />,
  },
  {
    index: 2,
    name: labels.activities.add.sections.whowhat.title,
    icon: 'bxs:book',
    tab: <WhoWhat showIntimateFields={showIntimateFields} />, // Pass flag as prop
  },
  {
    index:3,
    name: labels.activities.add.sections.gallery.title,
    icon: 'bxs:gallery',
    tab: <Gallery />,
  },
  {
    index: 4,
    name: labels.activities.add.sections.last.title,
    icon: 'bxs:check-circle',
    tab: <LastTab />,
  },
]

const [formData, setFormData] = useState({});

  return (
    <FormProvider {...methods}>
      <Tabs
        variant="underline"
        activeKey={activeStep}
        className="nav nav-tabs card-tabs"
        onSelect={(e) => setActiveStep(Number(e))}
      >
        {formSteps.map((step) => (
          <Tab
            key={step.index}
            eventKey={step.index}
            className="nav-item"
            tabClassName="pb-3"
            title={
              <span className="fw-semibold">
                <IconifyIcon icon={step.icon} className="me-1" />
                <span className="d-none d-sm-inline">{step.name}</span>
              </span>
            }
          >
            {step.tab}
          </Tab>
        ))}
      </Tabs>

      <div className="d-flex flex-wrap gap-2 wizard justify-content-between mt-3">
        <div className="previous me-2">
          <button
            type="button"
            onClick={() => {
              console.log("Form data on previous:", methods.getValues());
              setActiveStep((prev) => prev - 1);
            }}
            className={clsx("btn btn-primary", { disabled: activeStep === 1 })}
          >
            <IconifyIcon icon="bx:left-arrow-alt" className="me-2" />
            Back To Previous
          </button>
        </div>
        <div className="next">
          <button
            type="button"
            onClick={() => {
              console.log("Form data on next:", methods.getValues());
              setActiveStep((prev) => prev + 1);
            }}
            className={clsx("btn btn-primary", { disabled: formSteps.length === activeStep })}
          >
            Next Step
            <IconifyIcon icon="bx:right-arrow-alt" className="ms-2" />
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateActivityForms;
