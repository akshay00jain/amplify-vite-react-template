import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import IconifyIcon from '../wrappers/IconifyIcon'

type PageBreadcrumbProps = {
  title: string
  subName: string
  link?: string; // Optional link for navigation
}

const PageBreadcrumb = ({ title, subName, link }: PageBreadcrumbProps) => {
  return (
    <Row>
      <Col xs={12}>
        <div className="page-title-box">
          <h4 className="mb-0 fw-semibold">{title}</h4>
          <ol className="breadcrumb mb-0 align-items-center">
            <li className="breadcrumb-item icons-center">
              <Link to={link}>{subName}</Link>
              <div className="ms-1" style={{ height: 24 }}>
                <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
              </div>
            </li>
            <li className="breadcrumb-item active content-none">{title}</li>
          </ol>
        </div>
      </Col>
    </Row>
  )
}

export default PageBreadcrumb
