import { Row } from 'react-bootstrap'

import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'
import HomeView from './components/HomeView'

const Social = () => {
  return (
    <>
      <PageBreadcrumb title="Social" subName="Apps" />
      <PageMetaData title="Social" />

      <Row className="justify-content-center">
        <HomeView />
      </Row>
    </>
  )
}

export default Social
