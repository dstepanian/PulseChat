const MessageList = ({ messages, currentUserId, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
      {messages.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-8 text-center text-sm text-slate-200/70">
          No messages yet. Start the spark.
        </div>
      )}

      {messages.map((message) => {
        const isMine = message.sender?._id === currentUserId || message.sender?.id === currentUserId;

        return (
          <div
            key={message._id}
            className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm shadow-lg sm:max-w-[60%] ${
                isMine
                  ? 'bg-gradient-to-br from-emerald-300/90 via-emerald-200/90 to-cyan-200/90 text-slate-900'
                  : 'bg-white/10 text-white'
              }`}
            >
              <div className="text-[11px] uppercase tracking-[0.2em] opacity-70">
                {message.sender?.username || 'Anonymous'}
              </div>
              <div className="mt-1 text-base leading-relaxed">
                {message.content}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;