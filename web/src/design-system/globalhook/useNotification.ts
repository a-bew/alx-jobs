// useNotification.ts

import { addNotification, removeNotification, SideNotificationItem } from '@/redux/notification/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  UrgencyProps } from '../_components/SideNotification/SideNotification';
import { RootState } from '@/app/store';
import { SideNotificationPositionProps } from '../_components/SideNotification/GroupNotification';
// import { RootState } from '../redux/store';
// import { SideNotificationItem, addNotification, removeNotification } from '../redux/notificationSlice';
// import { SideNotificationPositionProps, UrgencyProps } from '../components/sidenotification/SideNotification';

interface UseNotification {
  notifications: SideNotificationItem[];
  showNotification: (message: string, position: SideNotificationPositionProps, urgency?:UrgencyProps, duration?: number) => void;
  onClose: (id: number) => void;
}

const useNotification = (): UseNotification => {
  const dispatch = useDispatch();

  const notifications:SideNotificationItem[] = useSelector((state: RootState) => state.notifications.notifications);

  const showNotification = (message: string, position: SideNotificationPositionProps, urgency?:UrgencyProps, duration: number = 0) =>   {
    const id = Date.now();
    dispatch(addNotification({ id, message, position, urgency }));
    duration? setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration): null;
  };

  const onClose= (id:number) => dispatch(removeNotification(id))

  return { notifications, showNotification, onClose };

};

export default useNotification;