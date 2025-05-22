import IconifyIcon from '@/components/wrappers/IconifyIcon'

import small6 from '@/assets/images/small/img-6.jpg'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import { Button, Card, CardBody, CardFooter, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
const AboutCard = () => {
  return (
    <Card>
      <div className="position-relative">
        <img src={small6} alt="avatar" className="card-img rounded-bottom-0" height={200} />
      </div>
      <CardBody className="mt-4">
        <div>
    <div className="d-flex align-items-center">
      <div className="d-block">
        <h4 className="mb-1">Activity Snapshot</h4>
        <p className="fs-14 mb-0">User: ##user identifier##</p>
      </div>
      <div className="ms-auto">
        <Dropdown>
          <DropdownToggle as={'a'} role="button" className="arrow-none">
            <IconifyIcon icon="bx:dots-vertical-rounded" className="fs-18 text-dark" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem>
              <IconifyIcon icon="mdi:refresh" className="me-2" />
              Refresh Stats
            </DropdownItem>
            <DropdownItem>
              <IconifyIcon icon="bx:export" className="me-2" />
              Export CSV
            </DropdownItem>
            <DropdownItem>
              <IconifyIcon icon="ri-settings-4-line" className="me-2" />
              Customize View
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
          <Row className="mt-3">
            <Col xs={12}>
             <CardTitle as="h5" className="badge bg-light text-secondary py-1 px-2 fs-13 mb-3 border-start border-secondary border-2 rounded-1">
          Recent Activity Summary
        </CardTitle>
              <p className="fs-15 text-muted mb-2">
                  You’ve logged <strong>142 activities</strong> so far. Last week, you added 5 new entries—2 romantic, 3 social.
                </p>
              <div className="mt-3">
                <div className="d-flex gap-2 flex-wrap">
                  <span className="badge text-secondary py-1 px-2 fs-12 border rounded-1">⭐ Avg Rating: 4.1</span>
                  <span className="badge text-secondary py-1 px-2 fs-12 border rounded-1">💸 Avg Spend: $38.40</span>
                  <span className="badge text-secondary py-1 px-2 fs-12 border rounded-1">❤️ Last Romantic: 6d ago</span>
                  <span className="badge text-secondary py-1 px-2 fs-12 border rounded-1">📍Top Spot: Central Park</span>
                </div>
              </div>
              <div className="mt-4">
                  <h6 className="text-dark fw-medium mb-2">Quick Filters:</h6>
                  <div className="d-flex flex-wrap gap-2">
                        <Button size="sm" variant="soft-primary">This Week</Button>
                        <Button size="sm" variant="soft-secondary">Romantic</Button>
                        <Button size="sm" variant="soft-success">By Contact</Button>
                        <Button size="sm" variant="soft-info">Expensive</Button>
                  </div>
                </div>
            </Col>
          </Row>
        </div>
      </CardBody>
      <CardFooter className="bg-light-subtle">
        <Row className="g-2 mb-1">
          <Col lg={4}>
            <Button variant="primary" type="button" className="d-flex align-items-center justify-content-center gap-1 w-100">
              <IconifyIcon icon="iconamoon:profile-duotone" />
              Contact
            </Button>
          </Col>
          <Col lg={4}>
            <Button variant="success" type="button" className="d-flex align-items-center justify-content-center gap-1 w-100">
              <IconifyIcon icon="iconamoon:comment-dots-duotone" />
              Activity
            </Button>
          </Col>
          <Col lg={4}>
            <Button variant="danger" type="button" className="d-flex align-items-center justify-content-center gap-1 w-100">
              <IconifyIcon icon="iconamoon:share-1-duotone" />
              Share
            </Button>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  )
}

export default AboutCard
