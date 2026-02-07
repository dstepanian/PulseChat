import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../../services/authApi';
import { updateProfile as updateProfileApi } from '../../services/profileApi';
import { authStorage } from '../../utils/storage';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = authStorage.getToken();
    const savedUser = authStorage.getUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setToken(data.token);
    setUser(data.user);
    authStorage.setAuth(data.token, data.user);
    return data;
  };

  const register = async (username, email, password) => {
    const data = await registerUser(username, email, password);
    setToken(data.token);
    setUser(data.user);
    authStorage.setAuth(data.token, data.user);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    authStorage.clear();
  };

  const updateProfile = async (payload) => {
    if (!token) {
      throw new Error('Not authenticated');
    }
    const data = await updateProfileApi(payload, token);
    setUser(data.user);
    authStorage.setAuth(token, data.user);
    return data.user;
  };

  const value = useMemo(() => ({
    user,
    token,
    login,
    register,
    logout,
    updateProfile,
    loading
  }), [user, token, loading]);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
