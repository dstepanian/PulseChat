import { useAuth } from '../app/providers/AuthProvider';
import AuthCard from '../components/auth/AuthCard';
import ChatShell from '../components/chat/ChatShell';

const ChatPage = () => {
  const { user, token, logout } = useAuth();

  if (!user) {
    return <AuthCard />;
  }

  return <ChatShell user={user} token={token} onLogout={logout} />;
};

export default ChatPage;