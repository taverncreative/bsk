'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, Info, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const DEFAULT_LADDER: Record<number, number> = {
  1: 60,
  2: 55,
  3: 50,
  4: 48,
  5: 46,
  6: 44,
  7: 42,
  8: 40,
  9: 40,
  10: 40,
  11: 40,
  12: 40,
};

// Simulated Override for demonstration (Could be fetched from DB)
const CLIENT_OVERRIDE: any = null; 
// e.g., { hourlyRate: 35, minHours: 4, maxHours: 8 }

export default function AccountPage() {
  const [clientRecord, setClientRecord] = useState<any>(null);
  const [hours, setHours] = useState(4);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    // In a real application, filter by authenticated user id
    const { data } = await supabase.from('clients').select('*').limit(1);
    if (data && data.length > 0) {
      setClientRecord(data[0]);
      setHours(data[0].monthly_hours || 4);
    }
    setInitialLoading(false);
  };

  const minHours = CLIENT_OVERRIDE?.minHours || 1;
  const maxHours = CLIENT_OVERRIDE?.maxHours || 12;

  const calculateRate = (h: number) => {
    if (CLIENT_OVERRIDE?.hourlyRate) return CLIENT_OVERRIDE.hourlyRate;
    return DEFAULT_LADDER[h] || 40;
  };

  const rate = calculateRate(hours);
  const total = rate * hours;

  const currentPlanHours = clientRecord?.monthly_hours || 4;
  const isIncrease = hours > currentPlanHours;
  const isDecrease = hours < currentPlanHours;
  const isChanged = hours !== currentPlanHours;

  const handleUpdate = async () => {
    if (!clientRecord || !isChanged) return;
    setLoading(true);

    const prevHours = clientRecord.monthly_hours;
    const prevRate = clientRecord.hourly_rate;

    const { error: clientError } = await supabase.from('clients')
      .update({ monthly_hours: hours, hourly_rate: rate })
      .eq('id', clientRecord.id);

    if (!clientError) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setDate(1);

      await supabase.from('client_pricing_history').insert({
        client_id: clientRecord.id,
        previous_hours: prevHours,
        new_hours: hours,
        previous_rate: prevRate,
        new_rate: rate,
        effective_date: nextMonth.toISOString().split('T')[0]
      });

      alert('Subscription plan updated! Changes take effect next billing cycle.');
      fetchClient();
    } else {
      console.error(clientError);
      alert('Error updating plan');
    }
    setLoading(false);
  };

  if (initialLoading) return <div className="p-8 text-white"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8">Account & Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Support / Contact */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-zinc-950 p-6 rounded-lg border border-zinc-800 shadow">
            <h2 className="text-lg font-medium text-white mb-4">Dedicated Support</h2>
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">
                You can reach out to our team at any time for support, queries, or strategy discussions.
              </p>
              <div className="flex items-center space-x-3 text-zinc-300 w-full">
                <div className="flex-shrink-0 bg-brand-gold/10 p-2 rounded">
                  <Mail className="h-5 w-5 text-brand-gold" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Business Sorted Kent</p>
                  <p className="text-sm text-zinc-400 break-all">hello@businesssortedkent.co.uk</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-zinc-300 w-full mt-4">
                <div className="flex-shrink-0 bg-brand-gold/10 p-2 rounded">
                  <Phone className="h-5 w-5 text-brand-gold" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Phone Support</p>
                  <p className="text-sm text-zinc-400 truncate">07522388055</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Monthly Plan Slider */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-950 p-6 rounded-lg border border-zinc-800 shadow">
            <h2 className="text-lg font-medium text-white mb-4">Monthly Retainer Hours</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Adjust your monthly support hours dynamically. More hours mean we can allocate more time to aggressive improvements, technical audits, and content rollouts on your behalf.
            </p>

            <div className="mb-8">
              <label htmlFor="hours-slider" className="block text-sm font-medium text-zinc-300 mb-4">
                Selected: {hours} {hours === 1 ? 'hour' : 'hours'}
              </label>
              <input
                id="hours-slider"
                type="range"
                min={minHours}
                max={maxHours}
                step="1"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                <span>{minHours}h</span>
                <span>{maxHours}h</span>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 text-sm">Hourly Rate</span>
                <span className="text-white font-medium">£{rate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm">Monthly Total (<span className="text-brand-gold text-xs">Excl. VAT</span>)</span>
                <span className="text-2xl font-bold text-brand-gold">£{total}</span>
              </div>
            </div>

            {isChanged && (
              <div className="space-y-4 mb-6 animate-in slide-in-from-top-4 fade-in duration-300">
                <div className="flex p-4 text-sm bg-blue-900/20 text-blue-200 border-l-4 border-blue-500">
                  <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                  <p>Changes will take effect at the start of the next billing cycle. The current month will remain unaffected.</p>
                </div>
                
                {isIncrease && (
                  <div className="flex p-4 text-sm bg-green-900/20 text-green-300 border-l-4 border-green-500">
                    <Clock className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <p>Increasing hours allows us to implement improvements faster, which usually leads to faster growth in enquiries and search visibility.</p>
                  </div>
                )}

                {isDecrease && (
                  <div className="flex p-4 text-sm bg-orange-900/20 text-orange-300 border-l-4 border-orange-500">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                    <p>Reducing hours means fewer improvements each month. Progress will continue but growth may be slower.</p>
                  </div>
                )}
              </div>
            )}

            <button 
              onClick={handleUpdate}
              disabled={!isChanged || loading}
              className={`w-full py-3 px-4 rounded-md font-medium shadow-sm transition-all flex items-center justify-center focus:outline-none 
              ${isChanged && !loading 
                ? 'bg-brand-gold text-black hover:bg-yellow-500 shadow-brand-glow' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? 'Updating...' : 'Update Subscription Plan'}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}