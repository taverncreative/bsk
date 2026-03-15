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
  const [status, setStatus] = useState<'idle' | 'generating' | 'confirm' | 'editing' | 'loading' | 'success' | 'error'>('idle');
  const [summary, setSummary] = useState('');
  const [businessType, setBusinessType] = useState('Unknown');
  const [formDataCache, setFormDataCache] = useState<any>(null);

  const requestSummary = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('generating');
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      url: formData.get('url'),
      pageUrl: window.location.href,
      timestamp: new Date().toISOString()
    };
    setFormDataCache(data);

    try {
      const res = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      const json = await res.json();
      if (res.ok && json.summary) {
        setSummary(json.summary);
        setBusinessType(json.businessType || 'Unknown');
        setStatus('confirm');
      } else {
        submitFinal(data, 'Summary generation failed', 'Unknown');
      }
    } catch {
      submitFinal(data, 'Summary generation failed', 'Unknown');
    }
  };

  const submitFinal = async (overrideData?: any, overrideSummary?: string, overrideBusiness?: string) => {
    setStatus('loading');
    const data = overrideData || {
      ...formDataCache,
      summary: overrideSummary || summary,
      businessType: overrideBusiness || businessType
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
        Thanks — we've received your request and will be in touch shortly.
      </div>
    );
  }

  if (status === 'confirm' || status === 'editing') {
    return (
      <div className="mt-3 flex flex-col gap-3 bg-neutral-900 border border-neutral-700 p-4 rounded-xl animate-in fade-in zoom-in-95 duration-200">
        <p className="text-neutral-300 text-sm leading-relaxed">Here's a quick summary of our conversation. You can confirm or edit anything before sending.</p>
        
        {status === 'editing' ? (
          <textarea 
            className="w-full bg-neutral-950 border border-neutral-700 text-neutral-300 text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none min-h-[120px]"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-lg py-3 px-3 min-h-[120px] whitespace-pre-wrap">
            {summary}
          </div>
        )}
        
        <div className="flex gap-2 w-full">
          <button onClick={() => setStatus('idle')} className="flex-1 border border-neutral-700 text-neutral-400 font-semibold py-2 rounded-lg text-xs hover:bg-neutral-800 transition-colors hidden sm:block">Cancel</button>
          {status === 'confirm' && (
            <button onClick={() => setStatus('editing')} className="flex-1 bg-neutral-800 text-white font-semibold py-2 rounded-lg text-xs hover:bg-neutral-700 transition-colors">Edit</button>
          )}
          <button onClick={() => submitFinal()} className="flex-[2] bg-brand-gold text-black font-semibold py-2 rounded-lg text-xs hover:opacity-90 transition-opacity">
            {status === 'editing' ? 'Save & Confirm' : 'Confirm'}
          </button>
        </div>
        <button onClick={() => setStatus('idle')} className="w-full border border-neutral-700 text-neutral-400 font-semibold py-1.5 rounded-lg text-xs hover:bg-neutral-800 transition-colors sm:hidden mt-2">Cancel</button>
      </div>
    );
  }

  return (
    <form onSubmit={requestSummary} className="mt-3 flex flex-col gap-2">
      <input required name="name" type="text" placeholder="Your Name" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="email" type="email" placeholder="Email Address" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="url" type="url" pattern="https?://.+" title="Include http:// or https://" placeholder="Website URL" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <button disabled={status === 'generating' || status === 'loading'} type="submit" className="w-full mt-1 bg-brand-gold text-black font-bold py-2 rounded-lg text-sm transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
        {status === 'generating' || status === 'loading' ? (
           <>
             <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
             {status === 'generating' ? 'Generating Summary...' : 'Sending...'}
           </>
        ) : 'Request Review'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs text-center mt-1">Something went wrong. Please try again.</p>}
    </form>
  );
};

const InlineCallForm = ({ messages }: { messages: Message[] }) => {
  const [status, setStatus] = useState<'idle' | 'generating' | 'confirm' | 'editing' | 'loading' | 'success' | 'error'>('idle');
  const [summary, setSummary] = useState('');
  const [businessType, setBusinessType] = useState('Unknown');
  const [formDataCache, setFormDataCache] = useState<any>(null);

  const requestSummary = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('generating');
    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'call',
      name: formData.get('name'),
      email: formData.get('email'),
      preferredTime: formData.get('preferredTime'),
      pageUrl: window.location.href,
      timestamp: new Date().toISOString()
    };
    setFormDataCache(data);

    try {
      const res = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      const json = await res.json();
      if (res.ok && json.summary) {
        setSummary(json.summary);
        setBusinessType(json.businessType || 'Unknown');
        setStatus('confirm');
      } else {
        submitFinal(data, 'Summary generation failed', 'Unknown');
      }
    } catch {
      submitFinal(data, 'Summary generation failed', 'Unknown');
    }
  };

  const submitFinal = async (overrideData?: any, overrideSummary?: string, overrideBusiness?: string) => {
    setStatus('loading');
    const data = overrideData || {
      ...formDataCache,
      summary: overrideSummary || summary,
      businessType: overrideBusiness || businessType
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
        Thanks — we've received your request and will be in touch shortly.
      </div>
    );
  }

  if (status === 'confirm' || status === 'editing') {
    return (
      <div className="mt-3 flex flex-col gap-3 bg-neutral-900 border border-neutral-700 p-4 rounded-xl animate-in fade-in zoom-in-95 duration-200">
        <p className="text-neutral-300 text-sm leading-relaxed">Here's a quick summary of our conversation. You can confirm or edit anything before sending.</p>
        
        {status === 'editing' ? (
          <textarea 
            className="w-full bg-neutral-950 border border-neutral-700 text-neutral-300 text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none min-h-[120px]"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-lg py-3 px-3 min-h-[120px] whitespace-pre-wrap">
            {summary}
          </div>
        )}
        
        <div className="flex gap-2 w-full">
          <button onClick={() => setStatus('idle')} className="flex-1 border border-neutral-700 text-neutral-400 font-semibold py-2 rounded-lg text-xs hover:bg-neutral-800 transition-colors hidden sm:block">Cancel</button>
          {status === 'confirm' && (
            <button onClick={() => setStatus('editing')} className="flex-1 bg-neutral-800 text-white font-semibold py-2 rounded-lg text-xs hover:bg-neutral-700 transition-colors">Edit</button>
          )}
          <button onClick={() => submitFinal()} className="flex-[2] bg-brand-gold text-black font-semibold py-2 rounded-lg text-xs hover:opacity-90 transition-opacity">
            {status === 'editing' ? 'Save & Confirm' : 'Confirm'}
          </button>
        </div>
        <button onClick={() => setStatus('idle')} className="w-full border border-neutral-700 text-neutral-400 font-semibold py-1.5 rounded-lg text-xs hover:bg-neutral-800 transition-colors sm:hidden mt-2">Cancel</button>
      </div>
    );
  }

  return (
    <form onSubmit={requestSummary} className="mt-3 flex flex-col gap-2">
      <input required name="name" type="text" placeholder="Your Name" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="email" type="email" placeholder="Email Address" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="preferredTime" type="text" placeholder="Preferred time (e.g., Tomorrow morning)" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <button disabled={status === 'generating' || status === 'loading'} type="submit" className="w-full mt-1 bg-brand-gold text-black font-bold py-2 rounded-lg text-sm transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
        {status === 'generating' || status === 'loading' ? (
           <>
             <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
             {status === 'generating' ? 'Generating Summary...' : 'Sending...'}
           </>
        ) : 'Request Call'}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs text-center mt-1">Something went wrong. Please try again.</p>}
    </form>
  );
};

const InlineMessageForm = ({ messages }: { messages: Message[] }) => {
  const [status, setStatus] = useState<'idle' | 'generating' | 'confirm' | 'editing' | 'loading' | 'success' | 'error'>('idle');
  const [summary, setSummary] = useState('');
  const [businessType, setBusinessType] = useState('Unknown');
  const [formDataCache, setFormDataCache] = useState<any>(null);

  const requestSummary = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('generating');
    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'message',
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      pageUrl: window.location.href,
      timestamp: new Date().toISOString()
    };
    setFormDataCache(data);

    try {
      const res = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      const json = await res.json();
      if (res.ok && json.summary) {
        setSummary(json.summary);
        setBusinessType(json.businessType || 'Unknown');
        setStatus('confirm');
      } else {
        submitFinal(data, 'Summary generation failed', 'Unknown');
      }
    } catch {
      submitFinal(data, 'Summary generation failed', 'Unknown');
    }
  };

  const submitFinal = async (overrideData?: any, overrideSummary?: string, overrideBusiness?: string) => {
    setStatus('loading');
    const data = overrideData || {
      ...formDataCache,
      summary: overrideSummary || summary,
      businessType: overrideBusiness || businessType
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
        Thanks — we've received your request and will be in touch shortly.
      </div>
    );
  }

  if (status === 'confirm' || status === 'editing') {
    return (
      <div className="mt-3 flex flex-col gap-3 bg-neutral-900 border border-neutral-700 p-4 rounded-xl animate-in fade-in zoom-in-95 duration-200">
        <p className="text-neutral-300 text-sm leading-relaxed">Here's a quick summary of our conversation. You can confirm or edit anything before sending.</p>
        
        {status === 'editing' ? (
          <textarea 
            className="w-full bg-neutral-950 border border-neutral-700 text-neutral-300 text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none min-h-[120px]"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="w-full bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm rounded-lg py-3 px-3 min-h-[120px] whitespace-pre-wrap">
            {summary}
          </div>
        )}
        
        <div className="flex gap-2 w-full">
          <button onClick={() => setStatus('idle')} className="flex-1 border border-neutral-700 text-neutral-400 font-semibold py-2 rounded-lg text-xs hover:bg-neutral-800 transition-colors hidden sm:block">Cancel</button>
          {status === 'confirm' && (
            <button onClick={() => setStatus('editing')} className="flex-1 bg-neutral-800 text-white font-semibold py-2 rounded-lg text-xs hover:bg-neutral-700 transition-colors">Edit</button>
          )}
          <button onClick={() => submitFinal()} className="flex-[2] bg-brand-gold text-black font-semibold py-2 rounded-lg text-xs hover:opacity-90 transition-opacity">
            {status === 'editing' ? 'Save & Confirm' : 'Confirm'}
          </button>
        </div>
        <button onClick={() => setStatus('idle')} className="w-full border border-neutral-700 text-neutral-400 font-semibold py-1.5 rounded-lg text-xs hover:bg-neutral-800 transition-colors sm:hidden mt-2">Cancel</button>
      </div>
    );
  }

  return (
    <form onSubmit={requestSummary} className="mt-3 flex flex-col gap-2">
      <input required name="name" type="text" placeholder="Your Name" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <input required name="email" type="email" placeholder="Email Address" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none" />
      <textarea required name="message" placeholder="Your Message" className="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded-lg py-2 px-3 focus:border-brand-gold outline-none min-h-[80px]" />
      <button disabled={status === 'generating' || status === 'loading'} type="submit" className="w-full mt-1 bg-brand-gold text-black font-bold py-2 rounded-lg text-sm transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
        {status === 'generating' || status === 'loading' ? (
           <>
             <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
             {status === 'generating' ? 'Generating Summary...' : 'Sending...'}
           </>
        ) : 'Send Message'}
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
        content: "Hi, I'm Elle. I can help answer questions about websites, SEO or getting more enquiries from your site. What would you like to know?"
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



  // Activation behavior (Manually only)
  useEffect(() => {
    if (hasActivated) return;

    // No auto-popup logic. Wait for user to explicitly click the widget.

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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl w-80 sm:w-96 h-[36rem] max-h-[85vh] mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-neutral-950 border-b border-neutral-800 p-4 flex items-center justify-between">
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
          <div className="p-5 flex-1 overflow-y-auto bg-black flex flex-col gap-6">
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
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user' 
                          ? 'bg-neutral-800 text-neutral-200 rounded-br-sm border border-neutral-700' 
                          : 'bg-neutral-800/80 text-white rounded-bl-sm border border-neutral-700/60'
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: segment.replace(/\n/g, '<br/>') }} />
                    </div>
                  ))}
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
              {/* Action Bar */}
              <div className="bg-neutral-950 border-t border-neutral-800 py-3 px-4">
                <div className="flex flex-col sm:flex-row gap-2 w-full justify-center hide-scrollbar">
                   <button onClick={() => triggerAction('call')} className="whitespace-nowrap flex-1 rounded-full px-3 py-1.5 text-xs font-semibold bg-neutral-900 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-colors text-center selection-none">
                     Book A Call
                   </button>
                   <button onClick={() => triggerAction('review')} className="whitespace-nowrap flex-1 rounded-full px-3 py-1.5 text-xs font-semibold bg-neutral-900 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-colors text-center selection-none">
                     Website Review
                   </button>
                   <button onClick={() => triggerAction('message')} className="whitespace-nowrap flex-1 rounded-full px-3 py-1.5 text-xs font-semibold bg-neutral-900 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition-colors text-center selection-none">
                     Send Message
                   </button>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-neutral-950 border-t border-neutral-800">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  value={input}
                  onChange={handleInputChange}
                type="text"
                placeholder="Ask Elle a question..."
                className="w-full bg-neutral-800 border border-neutral-700 text-white text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder:text-neutral-500"
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
            <div className="absolute inset-0 rounded-full border border-brand-gold opacity-0 animate-[ping_25s_cubic-bezier(0,0,0.2,1)_infinite_5s] pointer-events-none md:animate-[ping_40s_cubic-bezier(0,0,0.2,1)_infinite_10s]"></div>
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
