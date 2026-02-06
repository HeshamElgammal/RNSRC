import { baseApi } from '../api/baseApi';
import { API_ENDPOINTS } from '@constants';

// User API Types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

// Inject user endpoints into base API
export const mainApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: API_ENDPOINTS.USER.PROFILE,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<UserProfile, UpdateUserRequest>({
      query: (userData) => ({
        url: API_ENDPOINTS.USER.UPDATE,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
} = mainApi;
