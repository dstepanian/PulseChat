import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../services/apiClient';

const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(API_URL, {
      autoConnect: true
    });

    socketRef.current = socket;

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  return socketRef;
};

export default useSocket;
