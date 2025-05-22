import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { useLabels } from '@/context/LabelsContext';
import { paths } from '@/constants/paths';
import clsx from 'clsx';
import getDaySuffix from '@/utils/date';

import avatar1 from '@/assets/images/users/avatar-1.jpg'
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import avatar6 from '@/assets/images/users/avatar-6.jpg'
import avatar7 from '@/assets/images/users/avatar-7.jpg'
import avatar8 from '@/assets/images/users/avatar-8.jpg'
import avatar9 from '@/assets/images/users/avatar-9.jpg'
import avatar10 from '@/assets/images/users/avatar-10.jpg'
import avatar11 from '@/assets/images/users/avatar-11.jpg'
import avatar12 from '@/assets/images/users/avatar-12.jpg'
import groupImg1 from '@/assets/images/app-social/group-1.jpg'

const RecentActivities = () => {
  const labels = useLabels();

  const fakeActivities = [
  {
    activityId: 'act1',
    userId: 'user123',
    activityName: 'Coffee Date with Jamie',
    description: 'Nice low-key meetup to catch up',
    activityTypeId: 'in_person',
    activityTags: ['casual', 'chatty'],
    secondaryActivityTypeIds: ['intimate'],
    isPrivate: false,
    dateTime: 1715290000,
    location: 'Blue Fig Café',
    cost: 12.5,
    contactUserIds: ['contact1'],
    starRating: 4,
    howWasIt: 'Really good conversation, felt relaxed.',
    createdAt: 1715290100,
    updatedAt: 1715290200,
  },
  {
    activityId: 'act2',
    userId: 'user123',
    activityName: 'Late Night Call',
    description: 'Spontaneous call that went deep',
    activityTypeId: 'call',
    activityTags: ['deep', 'unexpected'],
    secondaryActivityTypeIds: [],
    isPrivate: true,
    dateTime: 1715300000,
    location: '',
    cost: 0,
    contactUserIds: ['contact2'],
    starRating: 5,
    howWasIt: 'Surprisingly vulnerable and warm.',
    createdAt: 1715300100,
    updatedAt: 1715300200,
  },
  {
    activityId: 'act3',
    userId: 'user123',
    activityName: 'Museum + Ice Cream',
    description: 'First time doing something cultural with them.',
    activityTypeId: 'in_person',
    activityTags: ['creative', 'fun'],
    secondaryActivityTypeIds: ['romantic'],
    isPrivate: false,
    dateTime: 1715310000,
    location: 'City Museum & Cream Bar',
    cost: 30,
    contactUserIds: ['contact3'],
    starRating: 3,
    howWasIt: 'A little awkward, but memorable.',
    createdAt: 1715310100,
    updatedAt: 1715310200,
  }
];


  const [allRecentActivities, setAllRecentActivities] = useState([]);

  useEffect(() => {
    setAllRecentActivities(fakeActivities);
  }, []);

  return (
    <Card>
      <CardHeader className="d-flex align-items-center">
        <CardTitle as={'h5'}>
          {labels.activities?.recentActivities?.titlePlural || 'Recent Activities'}
        </CardTitle>
        <div className="ms-auto">
          <span className="text-primary icons-center" role="button">
            <a href={paths.addActivity}>{labels.activities.add.title} <IconifyIcon icon="bx:calendar-plus" className="ms-1" /></a>
          </span>
        </div>
      </CardHeader>

      <CardBody>
  <ul className="list-unstyled mb-0">
    {allRecentActivities.map((item, idx) => (
      <li
        key={item.activityId}
        className={clsx(
          { 'pb-3': idx === 0 },
          idx === 0
            ? 'pb-3 border-bottom'
            : allRecentActivities.length - 1 === idx
            ? 'pt-3'
            : 'py-3 border-bottom'
        )}
      >
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <img
            src={
              item.photoUrls && item.photoUrls.length > 0
                ? item.photoUrls[0]
                : groupImg1
            }
            alt={item.activityName}
            className="avatar-md rounded-circle"
          />
          <div className="d-block">
            <h5 className="fs-15 mt-0 mb-1">{item.activityName || 'Untitled Activity'}</h5>
            <p className="text-muted fs-13 text-break mb-1">{item.howWasIt || 'No summary available.'}</p>

            {/* Activity Tags */}
            <div className="d-flex flex-wrap gap-1">
              {item.activityTags?.map((tag, i) => (
                <span key={i} className="badge bg-soft-primary text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="ms-auto text-end">
            <p className="text-muted mb-0">
              {new Date(item.dateTime * 1000).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
              }) + getDaySuffix(new Date(item.dateTime * 1000).getDate())}
            </p>
          </div>
        </div>
      </li>
    ))}
  </ul>
</CardBody>

    </Card>
  );
};

export default RecentActivities;
