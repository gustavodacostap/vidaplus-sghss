export const initialState: AuthState = {
  loading: false,
  error: null,
};

export interface AuthState {
  loading: boolean;
  error: string | null;
}
