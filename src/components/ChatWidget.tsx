import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok || !resp.body) {
    if (resp.status === 429) { onError('Too many requests. Please wait a moment.'); return; }
    if (resp.status === 402) { onError('AI service temporarily unavailable.'); return; }
    onError('Failed to connect to AI.'); return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf('\n')) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (!line.startsWith('data: ')) continue;
      const json = line.slice(6).trim();
      if (json === '[DONE]') { onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch { buf = line + '\n' + buf; break; }
    }
  }
  onDone();
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: "Hi! 👋 I'm David's portfolio assistant. Ask me anything about his skills, experience, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: 'user', content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    let assistantSoFar = '';
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > newMsgs.length) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev.slice(0, newMsgs.length), { role: 'assistant', content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: newMsgs,
        onDelta: upsert,
        onDone: () => setLoading(false),
        onError: (msg) => {
          setMessages(prev => [...prev, { role: 'assistant', content: msg }]);
          setLoading(false);
        },
      });
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }]);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-portfolio-blue text-portfolio-dark shadow-lg hover:scale-110 transition-transform"
        whileTap={{ scale: 0.9 }}
        aria-label="Chat with AI assistant"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] max-h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-[var(--glass-border)]"
            style={{ background: 'var(--portfolio-dark)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--glass-border)] flex items-center gap-2" style={{ background: 'var(--glass-bg)' }}>
              <Bot size={20} className="text-portfolio-blue" />
              <span className="font-semibold text-[var(--text-primary)] text-sm">AI Assistant</span>
              <span className="ml-auto text-xs text-portfolio-blue/60">Powered by AI</span>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[350px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-portfolio-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={14} className="text-portfolio-blue" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-portfolio-blue text-portfolio-dark'
                      : 'glass-card text-[var(--text-primary)]'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_p]:m-0">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-portfolio-purple/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={14} className="text-portfolio-purple" />
                    </div>
                  )}
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-portfolio-blue/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-portfolio-blue" />
                  </div>
                  <div className="glass-card rounded-xl px-3 py-2 text-sm text-[var(--text-secondary)]">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[var(--glass-border)]" style={{ background: 'var(--glass-bg)' }}>
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about David's skills..."
                  className="flex-1 bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-portfolio-blue"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2 rounded-lg bg-portfolio-blue text-portfolio-dark disabled:opacity-50 hover:scale-105 transition-transform"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
