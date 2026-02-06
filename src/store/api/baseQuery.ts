import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

export const BASE_URL = 'https://clean-dash.art-sketch.net/api/';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json');
    
    // Add language header from app state
    const state = getState() as RootState;
    const language = state.app.language || 'en';
    headers.set('Accept-Language', language);
    
    // Add auth token if available
    const token = state.auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});
