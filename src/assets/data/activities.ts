import type {
  ChatMessageType,
  CommentType,
  EmailType,
  GroupType,
  SocialEventType,
  SocialPostType,
  SocialUserType,
  TeamMemberType,
} from '@/types/data'
import { addOrSubtractDaysFromDate, addOrSubtractMinutesFromDate } from '@/utils/date'

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
import groupImg2 from '@/assets/images/app-social/group-2.jpg'
import groupImg3 from '@/assets/images/app-social/group-3.jpg'
import groupImg4 from '@/assets/images/app-social/group-4.jpg'
import groupImg5 from '@/assets/images/app-social/group-5.jpg'
import groupImg6 from '@/assets/images/app-social/group-6.jpg'
import groupImg7 from '@/assets/images/app-social/group-7.jpg'
import groupImg8 from '@/assets/images/app-social/group-8.jpg'
import groupImg9 from '@/assets/images/app-social/group-9.jpg'

import postImg1 from '@/assets/images/app-social/post-1.jpg'
import postImg2 from '@/assets/images/app-social/post-2.jpg'
import postImg3 from '@/assets/images/app-social/post-3.jpg'
import postImg4 from '@/assets/images/app-social/post-4.jpg'
import postImg6 from '@/assets/images/app-social/post-6.jpg'
import postImg7 from '@/assets/images/app-social/post-7.jpg'

import favorite1 from '@/assets/images/app-social/favorite-1.jpg'
import favorite2 from '@/assets/images/app-social/favorite-2.jpg'
import favorite3 from '@/assets/images/app-social/favorite-3.jpg'
import favorite4 from '@/assets/images/app-social/favorite-4.jpg'

import small1 from '@/assets/images/small/img-1.jpg'
import small2 from '@/assets/images/small/img-2.jpg'
import small3 from '@/assets/images/small/img-3.jpg'

export const recentActivityData = [
  {
    id: 'a1',
    avatar: avatar1,
    name: 'Lunch with Sam',
    type: 'in_person',
    summary: 'Talked about past dates and work.',
    time: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
  },
  {
    id: 'a2',
    avatar: avatar2,
    name: 'Late Night Call with Taylor',
    type: 'call',
    summary: 'Discussed recent feelings. Emotional.',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'a3',
    avatar: avatar3,
    name: 'Casual Meetup',
    type: 'in_person',
    summary: 'Walked in the park and grabbed smoothies.',
    time: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 'a4',
    avatar: avatar4,
    name: 'Intimate Moment with Riley',
    type: 'intimate',
    summary: 'Private moment. Will follow up soon.',
    time: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: 'a5',
    avatar: avatar5,
    name: 'Video Chat with Drew',
    type: 'video',
    summary: 'Good energy. Set another call for Friday.',
    time: new Date(Date.now() - 20 * 60 * 60 * 1000),
  },
]
