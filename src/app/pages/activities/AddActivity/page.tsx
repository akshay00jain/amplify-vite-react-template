import { Card, CardBody, Col, Row } from 'react-bootstrap'

import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import CreateActivityForms from './components/CreateActivityForms'
import PageMetaData from '@/components/PageTitle'
import { LabelsProvider, useLabels } from '@/context/LabelsContext';
import { paths } from '@/constants/paths';

const CreateActivity = () => {
  const labels = useLabels(); // Access labels from LabelsContext
  return (
    <>
      <PageBreadcrumb title={labels.activities.add.title} subName={labels.activities.titlePlural} link={paths.viewActivities}  />
      <PageMetaData title={labels.activities.add.title} />

      <Row>
        <Col>
          <Card>
            <CardBody>
              <CreateActivityForms />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

const CreateActivityWithLabels = () => {
  return (
    <LabelsProvider>
      <CreateActivity />
    </LabelsProvider>
  );
};

export default CreateActivityWithLabels;
