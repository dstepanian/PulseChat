import { AuthProvider } from './providers/AuthProvider';
import ChatPage from '../pages/ChatPage';

const App = () => {
  return (
    <AuthProvider>
      <ChatPage />
    </AuthProvider>
  );
};

export default App;