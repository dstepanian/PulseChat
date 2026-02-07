import { useEffect, useMemo, useRef, useState } from 'react';
import ProfilePage from '../../pages/ProfilePage';
import useSocket from '../../hooks/useSocket';
import { fetchRoomMessages, createMessage } from '../../services/messagesApi';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';

const rooms = [
  { id: 'general', label: 'General', description: 'Company-wide updates' },
  { id: 'random', label: 'Random', description: 'Offbeat sparks' },
  { id: 'tech', label: 'Tech', description: 'Engineering flow' }
];

const ChatLayout = ({ user, children, onLogout, onNavigate, activeView }) => {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[260px_1fr] animate-float-in">
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Profile</p>
              <p className="mt-2 text-lg font-semibold text-white">{user.username}</p>
              <p className="text-sm text-white/60">{user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white"
            >
              Logout
            </button>
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Navigate</p>
            <div className="mt-4 space-y-3">
              <button
                onClick={() => onNavigate('chat')}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  activeView === 'chat'
                    ? 'border-emerald-300/60 bg-emerald-300/10 text-white'
                    : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                <div className="text-sm font-semibold">Chat</div>
                <div className="text-xs text-white/50">Join live rooms</div>
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  activeView === 'profile'
                    ? 'border-emerald-300/60 bg-emerald-300/10 text-white'
                    : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
                }`}
              >
                <div className="text-sm font-semibold">Profile</div>
                <div className="text-xs text-white/50">Account settings</div>
              </button>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Tip</p>
            <p className="mt-2 text-sm text-white/80">
              Keep messages short to stay readable across mobile and desktop.
            </p>
          </div>
        </aside>

        <section className="flex min-h-[70vh] flex-col rounded-3xl border border-white/10 bg-white/5 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.8)] backdrop-blur">
          {children}
        </section>
      </div>
    </div>
  );
};

const ChatShell = ({ user, token, onLogout }) => {
  const [currentRoom, setCurrentRoom] = useState(rooms[0].id);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: '' });
  const [view, setView] = useState('chat');
  const socketRef = useSocket();
  const messagesEndRef = useRef(null);

  const activeRoom = useMemo(
    () => rooms.find((room) => room.id === currentRoom),
    [currentRoom]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!token || view !== 'chat') return;

    setStatus({ loading: true, error: '' });

    fetchRoomMessages(currentRoom, token)
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
        scrollToBottom();
      })
      .catch((error) => {
        setMessages([]);
        setStatus({ loading: false, error: error.message });
      })
      .finally(() => {
        setStatus((prev) => ({ ...prev, loading: false }));
      });
  }, [currentRoom, token, view]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || view !== 'chat') return;

    socket.emit('join_room', currentRoom);

    const handleReceive = (message) => {
      setMessages((prevMessages) => {
        if (message?._id && prevMessages.some((item) => item._id === message._id)) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
      scrollToBottom();
    };

    socket.on('receive_message', handleReceive);

    return () => {
      socket.off('receive_message', handleReceive);
    };
  }, [currentRoom, socketRef, view]);

  const handleSend = async (content) => {
    try {
      const savedMessage = await createMessage({ content, room: currentRoom }, token);
      setMessages((prevMessages) => [...prevMessages, savedMessage]);
      socketRef.current?.emit('send_message', savedMessage);
      scrollToBottom();
    } catch (error) {
      setStatus({ loading: false, error: error.message || 'Failed to send message' });
    }
  };

  if (view === 'profile') {
    return (
      <ChatLayout user={user} onLogout={onLogout} onNavigate={setView} activeView={view}>
        <ProfilePage />
      </ChatLayout>
    );
  }

  return (
    <ChatLayout user={user} onLogout={onLogout} onNavigate={setView} activeView={view}>
      <header className="border-b border-white/10 px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Now chatting</p>
            <h2 className="text-2xl font-semibold text-white">{activeRoom?.label}</h2>
            <p className="text-sm text-white/60">{activeRoom?.description}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
            {status.loading ? 'Syncing…' : 'Live'}
          </div>
        </div>
        {status.error && (
          <div className="mt-4 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {status.error}
          </div>
        )}
      </header>

      <div className="border-b border-white/10 px-6 py-4">
        <div className="flex flex-wrap gap-3">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setCurrentRoom(room.id)}
              className={`rounded-2xl border px-4 py-2 text-left text-sm transition ${
                room.id === currentRoom
                  ? 'border-emerald-300/60 bg-emerald-300/10 text-white'
                  : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              <div className="font-semibold">{room.label}</div>
              <div className="text-xs text-white/50">{room.description}</div>
            </button>
          ))}
        </div>
      </div>

      <MessageList
        messages={messages}
        currentUserId={user.id}
        messagesEndRef={messagesEndRef}
      />

      <MessageComposer onSend={handleSend} disabled={!token} />
    </ChatLayout>
  );
};

export default ChatShell;
