import { createReducer, on } from '@ngrx/store';
import { initialUIState, UIState } from './ui.state';
import * as UIActions from './ui.actions';

const MAX_NOTIFICATIONS = 20;

export const uiReducer = createReducer(
  initialUIState,
  on(
    UIActions.setNotifications,
    (state, { notifications }): UIState => ({
      ...state,
      notifications: notifications.slice(0, MAX_NOTIFICATIONS),
    }),
  ),

  on(UIActions.addNotification, (state, { notification }): UIState => {
    const updated = [notification, ...state.notifications];

    return {
      ...state,
      notifications: updated.slice(0, MAX_NOTIFICATIONS),
    };
  }),

  on(
    UIActions.markNotificationAsRead,
    (state, { id }): UIState => ({
      ...state,
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }),
  ),

  on(
    UIActions.clearNotifications,
    (state): UIState => ({
      ...state,
      notifications: [],
    }),
  ),
);
