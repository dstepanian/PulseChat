import { useState } from 'react';

const MessageComposer = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-white/10 bg-slate-900/40 px-6 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Share the latest update..."
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
        />
        <button
          type="submit"
          disabled={disabled}
          className="rounded-2xl bg-emerald-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:bg-emerald-300/60"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageComposer;