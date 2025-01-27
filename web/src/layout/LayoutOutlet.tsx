import React, { Suspense } from 'react'
import {  Outlet } from 'react-router-dom';
// import { Spinner } from '../imageloader/ImageLoader';
import ErrorBoundary from '../error/ErrorBoundary';
import HeadNavbar from '@/design-system/_components/HeadNavbar/HeadNavbar';
import styles from './LayoutOutlet.module.scss';
import useNotification from '@/design-system/globalhook/useNotification';
import SideNotification from '@/design-system/_components/SideNotification/SideNotification';
import GroupNotification from '@/design-system/_components/SideNotification/GroupNotification';

const LayoutOutlet = ({children = null}: {children?: React.ReactNode}) => {
  
  const { notifications, onClose } = useNotification();

       


  return (
    <Suspense fallback={
      children
    }>
      <ErrorBoundary reloadOnReset>
<HeadNavbar />
<GroupNotification
    position={notifications.length?notifications[notifications.length - 1].position: 'top-right'}
>
  {notifications.map((notification) => (
    <SideNotification
      key={notification.id}
      id={notification.id}
      message={notification.message}
      urgency={notification.urgency}
      onClose={()=>onClose(notification.id)}
    />
  ))}
</GroupNotification>

    <div className={styles['body']}>
      <Outlet />
    </div>

      </ErrorBoundary>
    </Suspense>
  )
}

export default LayoutOutlet;