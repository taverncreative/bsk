'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useChat, Message } from 'ai/react';

const InlineFallbackForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submitFallback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'message',
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
      summary: 'Fallback mode activated. AI unavailable.',
      businessType: 'Unknown'
    };

    try {
      const res = await fetch('/api/chat-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-3 p-3 bg-[#D6AD67]/10 border border-[#D6AD67] text-[#D6AD67] rounded-xl text-sm leading-relaxed">
        Thanks — your message has been sent. We'll reply as soon as possible.
      </div>
    );
  }

  return (
    <form onSubmit={submitFallback} className="mt-3 flex flex-col gap-2">
      <input required name="name" type="text" placeholder="Your Name" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="email" type="email" placeholder="Email Address" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <textarea required name="message" placeholder="Your Message" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none min-h-[80px]" />
      <button disabled={status === 'loading'} type="submit" className="w-full mt-1 bg-brand-gold text-black font-bold py-2 rounded-lg text-sm transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs text-center mt-1">Something went wrong. Please try again.</p>}
    </form>
  );
};

const InlineReviewForm = ({ messages }: { messages: Message[] }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const requestReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      url: formData.get('url'),
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
      messages
    };

    try {
      const res = await fetch('/api/website-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-3 p-3 bg-[#D6AD67]/10 border border-[#D6AD67] text-[#D6AD67] rounded-xl text-sm leading-relaxed">
        Thanks — we've received your request. We'll review the details and get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={requestReview} className="mt-3 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200">
      <input required name="name" type="text" placeholder="Your Name" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="email" type="email" placeholder="Email Address" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="url" type="url" pattern="https?://.+" title="Include http:// or https://" placeholder="Website URL" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <button disabled={status === 'loading'} type="submit" className="w-full mt-1 bg-brand-gold text-black font-bold py-2 rounded-lg text-sm transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
        {status === 'loading' ? 'Sending...' : 'Request Review'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs text-center mt-1">Something went wrong. Please try again.</p>}
    </form>
  );
};

const InlineCallForm = ({ messages }: { messages: Message[] }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const requestCall = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'call',
      name: formData.get('name'),
      email: formData.get('email'),
      preferredTime: formData.get('preferredTime'),
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
      messages
    };

    try {
      const res = await fetch('/api/chat-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-3 p-3 bg-[#D6AD67]/10 border border-[#D6AD67] text-[#D6AD67] rounded-xl text-sm leading-relaxed">
        Thanks — we've received your request. We'll review the details and get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={requestCall} className="mt-3 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200">
      <input required name="name" type="text" placeholder="Your Name" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="email" type="email" placeholder="Email Address" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="preferredTime" type="text" placeholder="Preferred time (e.g., Tomorrow morning)" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <button disabled={status === 'loading'} type="submit" className="w-full mt-1 bg-brand-gold text-black font-bold py-2 rounded-lg text-sm transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
        {status === 'loading' ? 'Sending...' : 'Request Call'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs text-center mt-1">Something went wrong. Please try again.</p>}
    </form>
  );
};

const InlineMessageForm = ({ messages }: { messages: Message[] }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const requestMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'message',
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
      messages
    };

    try {
      const res = await fetch('/api/chat-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-3 p-3 bg-[#D6AD67]/10 border border-[#D6AD67] text-[#D6AD67] rounded-xl text-sm leading-relaxed">
        Thanks — we've received your request. We'll review the details and get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={requestMessage} className="mt-3 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-200">
      <input required name="name" type="text" placeholder="Your Name" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="email" type="email" placeholder="Email Address" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <textarea required name="message" placeholder="Your Message" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none min-h-[80px]" />
      <button disabled={status === 'loading'} type="submit" className="w-full mt-1 bg-brand-gold text-black font-bold py-2 rounded-lg text-sm transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs text-center mt-1">Something went wrong. Please try again.</p>}
    </form>
  );
};

export default function AssistantElle() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasActivated, setHasActivated] = useState(false);
  const [lastAction, setLastAction] = useState<{ type: string, time: number } | null>(null);
  const [shownDuplicateWarning, setShownDuplicateWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append, error, setMessages } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi, I'm Elle. How can I help today?"
      }
    ]
  });

  const lastMessageCount = useRef(messages.length);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      if (messages.length > lastMessageCount.current) {
        scrollToBottom();
      }
      lastMessageCount.current = messages.length;
    }
  }, [messages.length, isOpen]);

  useEffect(() => {
    const handleContextEvent = (e: any) => {
      setIsOpen(true);
      setHasActivated(true);
      
      const message = e.detail?.message;
      if (message) {
        // Prevent duplicate immediate messages
        const isDuplicate = messages.some(m => m.content === message);
        if (!isDuplicate) {
          setMessages([
            ...messages,
            {
              id: Date.now().toString(),
              role: 'assistant',
              content: message
            }
          ]);
        }
      }
    };

    const forceOpenHandler = () => {
      setIsOpen(true);
      setHasActivated(true);
    };

    window.addEventListener('open-elle-context', handleContextEvent);
    window.addEventListener('force-open-elle', forceOpenHandler);
    return () => {
      window.removeEventListener('open-elle-context', handleContextEvent);
      window.removeEventListener('force-open-elle', forceOpenHandler);
    };
  }, [messages, setMessages]);

  // Activation behavior (Auto-popup after 5s)
  useEffect(() => {
    if (hasActivated) return;

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return; // Do not auto-open on mobile
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasActivated(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasActivated]);

  const triggerAction = (type: string) => {
    const now = Date.now();
    
    if (lastAction && lastAction.type === type && (now - lastAction.time) < 2500) {
      setLastAction({ type, time: now });
      if (!shownDuplicateWarning) {
        setShownDuplicateWarning(true);
        setMessages([
          ...messages,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: "Whoops — looks like that button was clicked twice. Do you need help choosing an option?"
          }
        ]);
      }
      return;
    }
    
    setLastAction({ type, time: now });

    let newContent = '';
    if (type === 'call') {
      newContent = "[RENDER_CALL_FORM]";
    } else if (type === 'review') {
      newContent = "[RENDER_REVIEW_FORM]";
    } else if (type === 'message') {
      newContent = "[RENDER_MESSAGE_FORM]";
    }

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: newContent
      }
    ]);
  };

  return (
    <div className="fixed bottom-[100px] right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl w-[calc(100vw-3rem)] sm:w-96 h-[28rem] sm:h-[36rem] max-h-[75vh] sm:max-h-[85vh] mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-neutral-950 border-b border-neutral-800 p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-brand-gold/70 shadow-md">
                <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Elle – Website Assistant</h3>
                <p className="text-neutral-400 text-xs mt-0.5">Helping answer questions about websites, SEO and online growth.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Window */}
          <div className="p-6 flex-1 overflow-y-auto bg-black flex flex-col gap-8">
            {messages.map((message: Message) => {
              const segments = message.role === 'assistant' 
                ? message.content.replace('[RENDER_REVIEW_FORM]', '').replace('[RENDER_CALL_FORM]', '').replace('[RENDER_MESSAGE_FORM]', '').split('\n\n').filter(s => s.trim().length > 0)
                : [message.content];
              
              const hasReviewForm = message.role === 'assistant' && message.content.includes('[RENDER_REVIEW_FORM]');
              const hasCallForm = message.role === 'assistant' && message.content.includes('[RENDER_CALL_FORM]');
              const hasMessageForm = message.role === 'assistant' && message.content.includes('[RENDER_MESSAGE_FORM]');

              return (
                <div 
                  key={message.id} 
                  className={`flex flex-col w-full gap-2 ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {segments.map((segment, idx) => (
                    <div 
                      key={idx}
                      className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                        message.role === 'user' 
                          ? 'bg-neutral-800 text-neutral-200 rounded-br-sm border border-neutral-700' 
                          : 'bg-neutral-900 text-white rounded-bl-sm border border-[rgba(255,255,255,0.06)]'
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: segment.replace(/\n/g, '<br/>') }} />
                    </div>
                  ))}
                  {messages.length === 1 && message.role === 'assistant' && (
                    <div className="flex flex-col gap-2 w-full mt-2 animate-in fade-in duration-500">
                      <button onClick={() => append({ role: 'user', content: 'Website Help' })} className="text-left w-fit text-sm text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 px-4 py-2.5 rounded-xl transition-all border border-brand-gold/20">Website Help</button>
                      <button onClick={() => append({ role: 'user', content: 'Getting Found On Google' })} className="text-left w-fit text-sm text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 px-4 py-2.5 rounded-xl transition-all border border-brand-gold/20">Getting Found On Google</button>
                      <button onClick={() => append({ role: 'user', content: 'Website Not Getting Enquiries' })} className="text-left w-fit text-sm text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 px-4 py-2.5 rounded-xl transition-all border border-brand-gold/20">Website Not Getting Enquiries</button>
                      <button onClick={() => append({ role: 'user', content: 'Improve My Current Website' })} className="text-left w-fit text-sm text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 px-4 py-2.5 rounded-xl transition-all border border-brand-gold/20">Improve My Current Website</button>
                    </div>
                  )}
                  {hasReviewForm && (
                     <div className="w-full max-w-[85%]">
                       <InlineReviewForm messages={messages} />
                     </div>
                  )}
                  {hasCallForm && (
                     <div className="w-full max-w-[85%]">
                       <InlineCallForm messages={messages} />
                     </div>
                  )}
                  {hasMessageForm && (
                     <div className="w-full max-w-[85%]">
                       <InlineMessageForm messages={messages} />
                     </div>
                  )}
                </div>
              );
            })}
            
            {!!error && (
              <div className="flex flex-col w-full gap-2 items-start mt-2">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg-neutral-800/80 text-white rounded-bl-sm border border-neutral-700/60">
                  Our assistant is currently unavailable, but you can still send us a message and we'll get back to you.
                </div>
                <div className="w-full max-w-[85%]">
                  <InlineFallbackForm />
                </div>
              </div>
            )}
            
            {isLoading && !error && (!messages.length || messages[messages.length - 1].role === 'user') && (
              <div className="flex w-full justify-start">
                <div className="bg-neutral-800/80 border border-neutral-700/60 rounded-2xl px-4 py-3 text-sm text-neutral-400 rounded-bl-sm flex items-center">
                  <span className="text-xs italic">Elle is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!error && (
            <>
              {/* Input Area */}
              <div className="p-4 bg-neutral-950 border-t border-neutral-800 relative z-10 transition-colors">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  value={input}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Type a message..."
                  className="w-full bg-neutral-900 border border-neutral-700 text-white text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder:text-neutral-500"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-lg bg-brand-gold text-black disabled:opacity-50 disabled:bg-neutral-700 disabled:text-neutral-400 transition-colors"
                  aria-label="Send message"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setHasActivated(true);
          }}
          className="w-[60px] h-[60px] bg-neutral-900 border border-brand-gold/50 text-brand-gold rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-800 transition-colors duration-300 relative group"
          aria-label="Open assistant"
        >
          {/* Subtle Glow Pulse (only pulses if not activated yet) */}
          {!hasActivated && (
            <div className="absolute inset-0 rounded-full bg-brand-gold/30 opacity-0 animate-[slow-pulse_10s_ease-out_infinite] pointer-events-none"></div>
          )}
          
          <div className="relative flex items-center justify-center text-brand-gold">
            <svg className="w-6 h-6 group-hover:hidden transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
            <span className="hidden group-hover:block font-extrabold text-xl">E</span>
          </div>
        </button>
      )}
    </div>
  );
}
