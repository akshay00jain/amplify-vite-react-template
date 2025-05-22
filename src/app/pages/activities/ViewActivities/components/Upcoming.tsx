import IconifyIcon from '@/components/wrappers/IconifyIcon'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  OverlayTrigger,
  ProgressBar,
  Row,
  Tooltip,
} from 'react-bootstrap'
import type { ProjectType } from '../types'
import { useLabels } from '@/context/LabelsContext';
import { paths } from '@/constants/paths';

import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import avatar6 from '@/assets/images/users/avatar-6.jpg'
import avatar7 from '@/assets/images/users/avatar-7.jpg'
import avatar8 from '@/assets/images/users/avatar-8.jpg'

const projectData = [
  {
    title: 'Late Night Video Chat',
    days: 2, // Days until follow-up
    file: 4, 
    task: '2/5', 
    progressValue: 40,
    progressVariant: 'info',
    location: "{{Location}}",
    contacts: [avatar1, avatar3],
  },
  {
    icon: 'iconamoon:heart-duotone',
    iconColor: 'danger',
    title: 'Intimate Night',
    days: 6,
    file: 3,
    task: '4/6',
    progressValue: 67,
    progressVariant: 'danger',
    location: "{{Location}}",
    contacts: [avatar4],
  },
]

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const labels = useLabels();
  const { days, file, icon, iconColor, progressVariant, progressValue, location, contacts, title, task } = project
  return (
    <Card className="shadow-none mb-0">
      <CardBody className="p-lg-3 p-2">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="avatar-md flex-shrink-0">
            <span className="avatar-title bg-light rounded-circle">
              <IconifyIcon icon={icon} className={`text-${iconColor} fs-28`} />
            </span>
          </div>
          <span role="button" className="fw-medium text-dark">
            {title}
          </span>
          <div className="ms-auto">
            <OverlayTrigger overlay={<Tooltip>{labels.activities.deletethis}</Tooltip>} placement="bottom">
              <span role="button" className="fw-medium text-muted fs-18">
                <IconifyIcon icon="iconamoon:trash-duotone" />
              </span>
            </OverlayTrigger>
          </div>
        </div>
        <div className="d-flex gap-2">
          <CardTitle as={'h5'} className="badge text-secondary d-flex gap-1 align-items-center py-1 px-2 fs-13 mb-3 border rounded-1">
            <IconifyIcon icon="iconamoon:clock-duotone" />
            {days} day left
          </CardTitle>
          <CardTitle as={'h5'} className="badge text-secondary d-flex gap-1 align-items-center py-1 px-2 fs-13 mb-3 border rounded-1">
            <IconifyIcon icon="iconamoon:file-duotone" />
            ##PrimaryActivityType
          </CardTitle>
        </div>
        <div>
          <p className="fs-15 mb-1 float-end">{task}</p>
          <p className="fs-15 mb-1">{progressValue}%</p>
          <ProgressBar variant={progressVariant} striped animated now={progressValue} className="progress-sm mb-3" />
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="avatar-group">
            {contacts.map((member, idx) => (
              <div className="avatar-group-item" key={idx}>
                <img src={member} alt="avatar" className="rounded-circle avatar-sm" />
              </div>
            ))}
          </div>
          <h5 className="mb-0">{location}</h5>
        </div>
      </CardBody>
    </Card>
  )
}

const Upcoming = () => {
  const labels = useLabels();
  return (
    <Card>
      <CardHeader className="d-flex align-items-center">
        <CardTitle as={'h5'}>{labels.activities.upcoming.titlePlural}</CardTitle>
        <div className="ms-auto">
          <Dropdown>
            <DropdownToggle as={'a'} role="button" className="arrow-none">
              <IconifyIcon icon="bx:dots-vertical-rounded" className="fs-18 text-dark" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>
                <IconifyIcon icon="bx:export" className="me-2" />
                Export Profile
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>
      <CardBody>
        <Row className="g-3">
          {projectData.map((project, idx) => (
            <Col lg={6} key={idx}>
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

export default Upcoming
