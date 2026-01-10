import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './ui.state';

export const selectUIState = createFeatureSelector<UIState>('ui');

// NOTIFICATIONS
export const selectNotifications = createSelector(selectUIState, (state) => state.notifications);

export const selectUnreadNotificationsCount = createSelector(
  selectNotifications,
  (notifications) => notifications.filter((n) => !n.read).length,
);
