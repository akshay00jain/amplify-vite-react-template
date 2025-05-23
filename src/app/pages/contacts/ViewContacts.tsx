import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { getAllCustomers } from '@/helpers/data'
import type { CustomerType } from '@/types/data'

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

const ContactCard = ({ contact }: { contact: CustomerType }) => {
  const { address, name, image, phone } = contact
  return (
    <Card>
      <CardBody>
        <div className="text-center">
          <img src={image} alt="avatar-1" className="img-fluid avatar-xl img-thumbnail rounded-circle avatar-border" />
          <h4 className="mt-3 fs-18">
            <span role="button" className="text-dark">
              {name}
            </span>
          </h4>
          <span role="button" className="mb-1 d-inline-block icons-center">
            <IconifyIcon icon="bx:location-plus" className="text-danger fs-14 me-1" />
            {address}
          </span>
          <br />
          <span role="button">
            <IconifyIcon icon="bx:phone-call" className="text-success fs-14 me-1" />
            {phone}
          </span>
          <br />
          <Link to="/pages/profile" className="btn btn-sm btn-outline-primary mt-3">
            View Profile
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}

const Contacts = () => {
  const [contactData, setContactData] = useState<CustomerType[]>()

  useEffect(() => {
    (async () => {
      const data = await getAllCustomers()
      setContactData(data)
    })()
  }, [])

  return (
    <>
      <PageBreadcrumb subName={labels.contacts.titlePlural} title={labels.general.dashboard} />
      <PageMetaData title={labels.contacts.titlePlural} />

      <Row className="row-cols-1 row-cols-md-2 row-cols-xl-4 gx-3">
        {contactData?.map((contact, idx) => (
          <Col key={idx}>
            <ContactCard contact={contact} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Contacts
