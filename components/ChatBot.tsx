'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageSquareText, Send, X } from 'lucide-react';
import { site } from '@/config/site';
import { answer, intents, type BotAction } from '@/lib/chatbot';

type Msg = { from: 'bot' | 'user'; text: string; actions?: BotAction[] };

const chips = intents.filter((i) => i.chip);

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: 'bot',
      text: `Hi! I'm the ${site.shortName} assistant. Ask me about timings, fees, location or programmes.`,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Tell the floating action stack above us to get out of the way.
  useEffect(() => {
    if (open) document.body.dataset.chatOpen = 'true';
    else delete document.body.dataset.chatOpen;
    return () => {
      delete document.body.dataset.chatOpen;
    };
  }, [open]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: 'user', text: q }]);
    setInput('');
    setTyping(true);
    // Small delay so it reads as a reply rather than an instant page update.
    setTimeout(() => {
      const res = answer(q);
      setTyping(false);
      setMsgs((m) => [...m, { from: 'bot', text: res.text, actions: res.actions }]);
    }, reduce ? 0 : 420);
  };

  return (
    <>
      {/* Launcher — bottom right */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Chat with us'}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-page shadow-gold-lg transition-transform duration-300 hover:scale-110"
      >
        <AnimatePresence initial={false} mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={24} aria-hidden />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageSquareText size={24} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={`${site.name} chat assistant`}
            className="fixed bottom-24 right-4 z-40 flex max-h-[70vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl shadow-black/60 sm:right-5 sm:w-[23rem]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-line bg-sand px-4 py-3.5">
              <span className="inline-flex items-center justify-center rounded-full bg-cream p-1 ring-1 ring-gold/60">
                <Image src="/images/logo.webp" alt="" width={40} height={40} className="h-8 w-8 object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base uppercase tracking-wider text-ink">
                  {site.shortName} Assistant
                </p>
                <p className="text-[11px] text-muted">Usually replies instantly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-card hover:text-gold-dark"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'rounded-br-sm bg-gold-gradient text-page'
                        : 'rounded-bl-sm border border-line bg-card text-ink/90'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.actions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.actions.map((a) => (
                          <a
                            key={a.label}
                            href={a.href}
                            {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            onClick={() => !a.external && a.href.startsWith('#') && setOpen(false)}
                            className="rounded-full border border-gold/50 px-3 py-1.5 text-xs font-semibold text-gold-dark transition-colors hover:bg-gold/10"
                          >
                            {a.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-line bg-card px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
              {chips.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => send(c.label)}
                  className="rounded-full border border-line bg-card px-3 py-1.5 text-xs text-ink/85 transition-colors hover:border-gold/60 hover:bg-gold/10 hover:text-gold-dark"
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line bg-sand px-3 py-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Type your question
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                autoComplete="off"
                className="flex-1 rounded-full border border-line bg-page px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-gold"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-page transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                <Send size={17} aria-hidden />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
