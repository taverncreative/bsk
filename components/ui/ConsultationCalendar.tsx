'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight, User, Mail, MessageSquare } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

interface TimeSlot {
  date: string;
  times: string[];
}

export default function ConsultationCalendar() {
  const [availableData, setAvailableData] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fallback mode entirely if API fails or zero slots returned
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  useEffect(() => {
    fetch('/api/availability')
      .then(res => res.json())
      .then(data => {
        if (data.slots && data.slots.length > 0) {
          setAvailableData(data.slots);
          setSelectedDate(data.slots[0].date);
        } else {
          setIsFallbackMode(true);
        }
      })
      .catch(() => {
        setIsFallbackMode(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: selectedDate, time: selectedTime })
      });
      
      const result = await res.json();
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg(result.error || 'Failed to book slot.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-neutral-900 border border-brand-gold/30 rounded-3xl p-12 text-center shadow-2xl">
        <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-extrabold text-white mb-4">Consultation Confirmed</h3>
        <p className="text-lg text-neutral-300 mb-8 max-w-lg mx-auto">
          Thanks, {formData.name}. Your booking for <strong>{selectedDate} at {selectedTime}</strong> is confirmed. Check your email for instructions.
        </p>
      </div>
    );
  }

  if (isFallbackMode) {
    return <FallbackEnquiryForm />;
  }

  // Find the times for the selected date
  const selectedDayData = availableData.find(d => d.date === selectedDate);
  const times = selectedDayData?.times || [];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden shadow-black/50">
      <div className="bg-neutral-950 px-8 py-6 border-b border-neutral-800 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Select A Date & Time</h3>
          <p className="text-sm text-neutral-400 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            Consultation slots are limited each week.
          </p>
        </div>
        <div className="hidden sm:flex bg-neutral-900 rounded-lg p-3 items-center gap-3 border border-neutral-800">
           <Clock className="w-5 h-5 text-brand-gold" />
           <span className="text-sm font-medium text-white">30 Min Call</span>
        </div>
      </div>

      {!selectedTime ? (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Calendar Side */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-neutral-800">
            <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6 flex items-center gap-2">
               <CalendarIcon className="w-4 h-4" /> Available Days
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {availableData.map((slot) => {
                const isSelected = selectedDate === slot.date;
                const d = new Date(slot.date);
                const dayName = d.toLocaleDateString('en-GB', { weekday: 'short' });
                const dayNum = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                
                return (
                  <button
                    key={slot.date}
                    onClick={() => setSelectedDate(slot.date)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? 'bg-brand-gold border-brand-gold text-black shadow-[0_0_15px_rgba(214,173,103,0.3)]' 
                        : 'bg-neutral-950 border-neutral-800 text-white hover:border-brand-gold/50'
                    }`}
                  >
                    <span className={`text-xs font-bold uppercase ${isSelected ? 'text-black/70' : 'text-neutral-500'}`}>{dayName}</span>
                    <span className={`text-lg font-extrabold mt-1`}>{dayNum}</span>
                  </button>
                );
              })}
            </div>
            {availableData.length === 0 && (
               <p className="text-neutral-400 text-sm mt-4">No remaining slots for this month.</p>
            )}
            <div className="mt-8 pt-6 border-t border-neutral-800">
               <button 
                onClick={() => setIsFallbackMode(true)}
                className="text-brand-gold text-sm font-bold hover:text-white transition-colors"
               >
                 Can't see a time that works? Request another time &rarr;
               </button>
            </div>
          </div>

          {/* Time Slots Side */}
          <div className="p-8 bg-neutral-950/50">
            <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6 flex items-center gap-2">
               <Clock className="w-4 h-4" /> Available Times
            </h4>
            {times.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {times.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className="py-4 rounded-xl font-bold bg-neutral-900 border border-neutral-800 text-white hover:border-brand-gold hover:text-brand-gold transition-colors focus:ring-2 ring-brand-gold/50"
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-neutral-400">Select a day to view remaining times.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Booking Details Form inside Calendar Card */
        <div className="p-8">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-800">
             <div>
               <h4 className="text-2xl font-bold text-white">Enter Your Details</h4>
               <p className="text-neutral-400 mt-1">
                 Booking for {new Date(selectedDate!).toLocaleDateString('en-GB', { dateStyle: 'long' })} at {selectedTime}
               </p>
             </div>
             <button 
               onClick={() => setSelectedTime(null)}
               className="text-sm font-bold text-neutral-500 hover:text-white transition-colors border border-neutral-800 py-2 px-4 rounded-lg bg-neutral-950"
             >
               Change Slot
             </button>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-5 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                  required
                  type="text" 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 pl-12 pr-4 focus:border-brand-gold outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                  required
                  type="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 pl-12 pr-4 focus:border-brand-gold outline-none focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>
            </div>
            
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-neutral-500" />
              <textarea 
                placeholder="What would you like to discuss? (Optional)" 
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 pl-12 pr-4 min-h-[120px] focus:border-brand-gold outline-none focus:ring-1 focus:ring-brand-gold transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-gold text-black font-extrabold py-5 rounded-xl text-lg flex items-center justify-center gap-3 transition-transform active:scale-[0.98] shadow-[0_0_20px_rgba(214,173,103,0.2)] hover:shadow-[0_0_40px_rgba(214,173,103,0.4)] hover:bg-white disabled:opacity-50 disabled:pointer-events-none mt-4 group"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Consultation Booking'}
              {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Internal fallback form component logic included smoothly
function FallbackEnquiryForm() {
  const [formData, setFormData] = useState({ name: '', email: '', preferred_day: '', preferred_time: '', message: '' });
  const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-neutral-900 border border-brand-gold/30 rounded-3xl p-12 text-center shadow-2xl">
        <h3 className="text-3xl font-extrabold text-white mb-4">Request Sent</h3>
        <p className="text-lg text-neutral-300">We've received your alternative availability request and will be in touch shortly to confirm a slot.</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 lg:p-12 shadow-2xl">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Can't see a time that works?</h3>
        <p className="text-neutral-400 text-lg">Let us know your preferred availability and we'll try to fit you in.</p>
      </div>
      
      {status === 'error' && <p className="text-red-400 mb-6 bg-red-900/20 p-4 rounded-lg">Something went wrong. Please try again.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 px-5 focus:border-brand-gold outline-none" />
          <input required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 px-5 focus:border-brand-gold outline-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Preferred Day (e.g., Next Wednesday)" value={formData.preferred_day} onChange={e => setFormData({...formData, preferred_day: e.target.value})} className="bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 px-5 focus:border-brand-gold outline-none" />
          <input type="text" placeholder="Preferred Time (e.g., 10:00 AM)" value={formData.preferred_time} onChange={e => setFormData({...formData, preferred_time: e.target.value})} className="bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 px-5 focus:border-brand-gold outline-none" />
        </div>
        <textarea required placeholder="Brief message..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-4 px-5 min-h-[120px] focus:border-brand-gold outline-none" />
        <button disabled={status === 'loading'} type="submit" className="w-full bg-brand-gold text-black font-extrabold py-5 rounded-xl text-lg hover:bg-white transition-colors">{status === 'loading' ? 'Sending...' : 'Send Request'}</button>
      </form>
    </div>
  );
}
