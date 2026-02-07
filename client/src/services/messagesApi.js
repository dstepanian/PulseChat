import { apiFetch } from './apiClient';

export const fetchRoomMessages = (roomId, token) => apiFetch(`/api/messages/${roomId}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const createMessage = (payload, token) => apiFetch('/api/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(payload)
});