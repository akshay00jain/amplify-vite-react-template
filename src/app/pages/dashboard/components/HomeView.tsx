import { memo } from 'react'
import { Col, TabContainer } from 'react-bootstrap'

import useToggle from '@/hooks/useToggle'
import MyFriendsList from './MyFriendsList'
import NavigationMenu from './NavigationMenu'
import SocialOffcanvasToggler from './SocialOffcanvasToggler'
import SocialTabsList from './SocialTabsList'
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

const MemoNavigationMenu = memo(NavigationMenu)
const MemoMyFriendsList = memo(MyFriendsList)
const MemoSocialTabsList = memo(SocialTabsList)

const HomeView = () => {
  const { isTrue: openFriendsOffcanvas, toggle: toggleFriendsOffcanvas } = useToggle()
  const { isTrue: openNavigationOffcanvas, toggle: toggleNavigationOffcanvas } = useToggle()

  return (
    <>
      <TabContainer defaultActiveKey="Feed" mountOnEnter>
        <Col xxl={3} className="mb-5 d-none d-xxl-block">
          <LabelsProvider>
            <MemoNavigationMenu open={openNavigationOffcanvas} toggle={toggleNavigationOffcanvas} />
          </LabelsProvider>
        </Col>

        <Col xxl={6}>
        <LabelsProvider>
          <SocialOffcanvasToggler toggleFriendsOffcanvas={toggleFriendsOffcanvas} toggleNavigationOffcanvas={toggleNavigationOffcanvas} />
          <MemoSocialTabsList />
        </LabelsProvider>
        </Col>
      </TabContainer>

      <Col xxl={3} className="mb-5">
        <LabelsProvider>
          <MemoMyFriendsList open={openFriendsOffcanvas} toggle={toggleFriendsOffcanvas} />
        </LabelsProvider>
      </Col>
    </>
  )
}

export default HomeView
