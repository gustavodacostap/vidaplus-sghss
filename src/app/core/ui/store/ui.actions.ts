import { createAction, props } from '@ngrx/store';
import { UINotification } from '../models/UINotification.model';

export const setNotifications = createAction(
  '[UI] Set Notifications',
  props<{ notifications: UINotification[] }>(),
);

export const addNotification = createAction(
  '[UI] Add Notification',
  props<{ notification: UINotification }>(),
);

export const markAllNotificationsAsRead = createAction('[UI] Mark All Notifications As Read');

export const clearNotifications = createAction('[UI] Clear Notifications');
