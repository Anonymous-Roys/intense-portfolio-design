import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/joe-chat`;

const QUICK_PROMPTS = [
  'Which programs do you offer?',
  'How do I apply?',
  'What are the fees like?',
  'Where is MPTI located?',
];

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
    if (resp.status === 429) { onError("I'm getting a lot of questions right now — give me a moment and try again."); return; }
    if (resp.status === 402) { onError("I'm temporarily offline. Please try again shortly."); return; }
    onError("Sorry, I couldn't connect just now. Please try again."); return;
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

const JoeChatDemo = () => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: "Hey, I'm Joe — I handle admissions questions here at MPTI. Ask me about programs, fees, or how to apply." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    const userMsg: Msg = { role: 'user', content: text };
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
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong on my end. Mind trying again?" }]);
      setLoading(false);
    }
  };

  return (
    <div className="glass-card-strong overflow-hidden max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--glass-border)] flex items-center gap-3" style={{ background: 'var(--glass-bg)' }}>
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-portfolio-blue to-portfolio-purple flex items-center justify-center text-white font-bold text-sm shrink-0">
          J
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[var(--portfolio-dark)]" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[var(--text-primary)] text-sm leading-tight">Joe</p>
          <p className="text-xs text-[var(--text-muted)] leading-tight truncate">MPTI Admissions Assistant · Online</p>
        </div>
        <span className="ml-auto text-[10px] font-mono px-2 py-1 rounded-full glass-tag text-portfolio-blue shrink-0">
          LIVE DEMO
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="px-4 py-4 space-y-3 min-h-[320px] max-h-[420px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-portfolio-blue text-white dark:text-background rounded-br-sm'
                : 'glass-card text-[var(--text-primary)] rounded-bl-sm'
            }`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm prose-invert max-w-none [&_p]:m-0">
                  <ReactMarkdown>{msg.content || ' '}</ReactMarkdown>
                </div>
              ) : msg.content}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="glass-card rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm text-[var(--text-secondary)] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-portfolio-blue animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-portfolio-blue animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-portfolio-blue animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      {messages.length < 2 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((p) => (
            <motion.button
              key={p}
              onClick={() => send(p)}
              whileTap={{ scale: 0.96 }}
              className="glass-tag text-[11px] px-2.5 py-1 text-[var(--text-secondary)] hover:text-portfolio-blue transition-colors"
            >
              {p}
            </motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-[var(--glass-border)]" style={{ background: 'var(--glass-bg)' }}>
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask Joe about courses, fees, admissions..."
            className="flex-1 bg-transparent border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-portfolio-blue"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2 rounded-lg bg-portfolio-blue text-white dark:text-background disabled:opacity-50 hover:scale-105 transition-transform shrink-0"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoeChatDemo;
