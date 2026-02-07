import { useState } from 'react';
import { useAuth } from '../../app/providers/AuthProvider';

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-4xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr] animate-float-in">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
            Live rooms • instant replies
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-white">
            Welcome to <span className="text-emerald-200">PulseChat</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-200/80">
            Build focused rooms, keep threads crisp, and ship conversations with real-time clarity.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">24h</p>
              <p className="text-sm text-slate-200/70">token window</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">3</p>
              <p className="text-sm text-slate-200/70">starter rooms</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)] backdrop-blur animate-pulse-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-200">{isLogin ? 'Sign in' : 'Create account'}</p>
              <h2 className="text-2xl font-semibold text-white">
                {isLogin ? 'Welcome back' : 'Get started'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white"
            >
              {isLogin ? 'Switch to sign up' : 'Switch to sign in'}
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">Username</span>
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                  placeholder="nova"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </label>
            )}
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-white/60">Email</span>
              <input
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-white/60">Password</span>
              <input
                type="password"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            {error && (
              <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-200"
            >
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
