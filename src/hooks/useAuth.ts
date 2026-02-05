import { useAppSelector, useAppDispatch } from './redux';
import { logout, updateUser, removeTokenFromKeychain } from '@store/slices/authSlice';
import type { User } from '@store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    // Remove token from keychain
    await dispatch(removeTokenFromKeychain());
    // Clear auth state
    dispatch(logout());
  };

  const handleUpdateUser = (userData: Partial<User>) => {
    dispatch(updateUser(userData));
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    logout: handleLogout,
    updateUser: handleUpdateUser,
  };
};
