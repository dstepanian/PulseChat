import { apiFetch } from './apiClient';

export const updateProfile = (payload, token) => apiFetch('/api/auth/profile', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(payload)
});