import { Col, Row } from 'react-bootstrap'

import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import SummaryCard from './components/SummaryCard'
import Activity from './components/Activity'
import Followers from './components/Followers'
import Activities from './components/Activities'
import PersonalInfo from './components/PersonalInfo'
import Upcoming from './components/Upcoming'
import Skill from './components/Skill'

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

const Profile = () => {
  return (
    <>
      <PageBreadcrumb subName={labels.activities.titlePlural} title={labels.general.dashboard} />
      <PageMetaData title="Profile" />

      <Row>
        <Col xxl={4}>
          <Row>
            <Col xs={12}>
            <LabelsProvider>  
                <SummaryCard />
            </LabelsProvider>
              <Skill />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Activity />
            </Col>
          </Row>
        </Col>
        <Col xxl={8}>
            <Row>
                <Col xs={12}>
                <LabelsProvider>
                    <Activities />
                    <Upcoming />
                  </LabelsProvider>
                </Col>
              </Row>
          <Row>
            <Col lg={6}>
              <PersonalInfo />
            </Col>
            <Col lg={6}>
              <Followers />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Profile
