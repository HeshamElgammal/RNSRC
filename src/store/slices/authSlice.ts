import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { keychain } from '@utils/keychain';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunk to save token to keychain
export const saveTokenToKeychain = createAsyncThunk(
  'auth/saveToken',
  async (token: string) => {
    await keychain.setToken(token);
    return token;
  }
);

// Async thunk to load token from keychain
export const loadTokenFromKeychain = createAsyncThunk(
  'auth/loadToken',
  async () => {
    const token = await keychain.getToken();
    return token;
  }
);

// Async thunk to remove token from keychain
export const removeTokenFromKeychain = createAsyncThunk(
  'auth/removeToken',
  async () => {
    await keychain.removeToken();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTokenToKeychain.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(loadTokenFromKeychain.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(removeTokenFromKeychain.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setLoading, setError, loginSuccess, logout, updateUser, setToken } =
  authSlice.actions;
export default authSlice.reducer;
