import { useState } from 'react';
import { useAuth } from '../app/providers/AuthProvider';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const payload = {};
      if (username && username !== user?.username) {
        payload.username = username;
      }
      if (password) {
        payload.password = password;
      }

      if (!Object.keys(payload).length) {
        setStatus({ loading: false, error: 'No changes to save.', success: '' });
        return;
      }

      await updateProfile(payload);
      setPassword('');
      setStatus({ loading: false, error: '', success: 'Profile updated.' });
    } catch (error) {
      setStatus({ loading: false, error: error.message || 'Failed to update profile.', success: '' });
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_25px_70px_-40px_rgba(15,23,42,0.8)] backdrop-blur animate-float-in">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Profile</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Account settings</h1>
            <p className="mt-2 text-sm text-white/70">Update how you appear in conversations.</p>
          </div>
          <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-emerald-100">
            {user?.email}
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">Display name</span>
            <input
              type="text"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">New password</span>
            <input
              type="password"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
              placeholder="Leave blank to keep current"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {status.error && (
            <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {status.error}
            </div>
          )}

          {status.success && (
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              {status.success}
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full rounded-2xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:bg-emerald-300/60"
          >
            {status.loading ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;