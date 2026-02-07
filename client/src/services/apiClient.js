const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const apiFetch = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || 'Request failed';
    throw new Error(message);
  }

  return data;
};

export { API_URL };