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

export const markNotificationAsRead = createAction(
  '[UI] Mark Notification As Read',
  props<{ id: string }>(),
);

export const clearNotifications = createAction('[UI] Clear Notifications');
