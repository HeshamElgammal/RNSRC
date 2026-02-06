import { useAppSelector, useAppDispatch } from '../redux';
import { logout, updateUser, removeTokenFromKeychain } from '@store/auth';
import { useLogoutMutation } from '@store/auth';
import type { User } from '@store/auth';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // Call logout API
      await logoutApi().unwrap();
    } catch (err) {
      // Continue with logout even if API call fails
      console.error('Logout API failed:', err);
    } finally {
      // Remove token from keychain
      await dispatch(removeTokenFromKeychain());
      // Clear auth state
      dispatch(logout());
    }
  };

  const handleUpdateUser = (userData: Partial<User>) => {
    dispatch(updateUser(userData));
  };

  return {
    user,
    token,
    isAuthenticated,
    logout: handleLogout,
    updateUser: handleUpdateUser,
  };
};
