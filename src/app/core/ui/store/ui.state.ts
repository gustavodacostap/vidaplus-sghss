import { UINotification } from '../models/UINotification.model';

export interface UIState {
  notifications: UINotification[];
}

export const initialUIState: UIState = {
  notifications: [],
};
