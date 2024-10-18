import React, { Children, ReactNode } from 'react'
import styles from  './GroupNotification.module.scss';

export type SideNotificationPositionProps = 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';

type Props = {
    position?: SideNotificationPositionProps;
    children: ReactNode;

}
const GroupNotification = ({children,   position = 'top-right'}: Props) => {
  return (
    <div
    
    className={`${styles['notification-container']} ${styles.notification} ${styles[position]} `}
    
    >{children}</div>
  )
}

export default GroupNotification