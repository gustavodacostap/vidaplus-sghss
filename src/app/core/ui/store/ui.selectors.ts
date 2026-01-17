import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './ui.state';
import { selectEditPacienteLoading } from '../../../features/admin/pacientes/store/pacientes.selectors';

export const selectUIState = createFeatureSelector<UIState>('ui');

// NOTIFICATIONS
export const selectNotifications = createSelector(selectUIState, (state) => state.notifications);

export const selectUnreadNotificationsCount = createSelector(
  selectNotifications,
  (notifications) => notifications.filter((n) => !n.read).length,
);

export const selectSnackbar = createSelector(selectUIState, (state) => state.snackbar);

export const selectGlobalLoading = createSelector(selectEditPacienteLoading, (...loadings) =>
  loadings.some(Boolean),
);
