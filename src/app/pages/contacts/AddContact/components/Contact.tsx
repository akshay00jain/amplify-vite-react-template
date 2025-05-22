import avatar1 from '@/assets/images/users/dummy-avatar.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TextFormInput from '@/components/form/TextFormInput'
import { useForm } from 'react-hook-form'
import SelectFormInput from '@/components/form/SelectFormInput'
import { Col, Row } from 'react-bootstrap'

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

const Contact = () => {
  const { control } = useForm()
   return (
    <>
      <h4 className="fs-16 fw-semibold mb-1">Contact Information</h4>
      <p className="text-muted">Enter your contact details.</p>

      {/* First Row: Email and Phone */}
      <Row className="g-4">
        <Col md={12} lg={6}>
          <TextFormInput
            name="email"
            label="Email"
            control={control}
            placeholder="Enter email address"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={12} lg={6}>
          <TextFormInput
            name="phone"
            label="Phone"
            control={control}
            placeholder="Enter phone number"
            containerClassName="mb-3"
          />
        </Col>
      </Row>

      {/* Second Row and onwards: Address, City, State, Zip, Social Media */}
      <Row className="g-4 mt-0"> {/* mt-0 to reduce top margin if needed */}
        {/* Address */}
        <Col md={12} lg={3}>
          <TextFormInput
            name="address1"
            label="Address 1"
            control={control}
            placeholder="Enter address line 1"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={12} lg={2}>
          <TextFormInput
            name="address2"
            label="Address 2"
            control={control}
            placeholder="Enter address line 2"
            containerClassName="mb-3"
          />
        </Col>

        {/* City, State, Zip */}
        <Col md={6} lg={3}>
          <TextFormInput
            name="city"
            label="City"
            control={control}
            placeholder="Enter city"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={3} lg={2}>
          <TextFormInput
            name="state"
            label="State"
            control={control}
            placeholder="Enter state"
            containerClassName="mb-3"
          />
        </Col>
        <Col md={3} lg={2}>
          <TextFormInput
            name="zip"
            label="Zip Code"
            control={control}
            placeholder="Enter zip code"
            containerClassName="mb-3"
          />
        </Col>
      </Row>
    </>
  );
};


export default Contact
