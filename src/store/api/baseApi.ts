import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

// Create base API slice that will be extended by auth and main slices
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Auth'],
  endpoints: () => ({}),
});
