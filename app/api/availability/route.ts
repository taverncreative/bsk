import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to add days
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper to format date YYYY-MM-DD
const formatDate = (date: Date) => date.toISOString().split('T')[0];

export async function GET() {
  const today = new Date();
  const endDate = addDays(today, 30); // Check next 30 days
  
  // Default structure
  // Tuesdays (2) and Thursdays (4)
  const defaultTimes = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];
  let availableSlots: Record<string, string[]> = {};

  // 1. Generate default slots
  for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (day === 2 || day === 4) { // Tue or Thu
      const dateStr = formatDate(d);
      // Skip today if it's past
      if (d.toDateString() === today.toDateString() && today.getHours() >= 12) {
        // Simple logic: if it's today and past 12pm, don't show today's slots
        // Could be more complex, but this avoids immediate bookings
        continue;
      }
      availableSlots[dateStr] = [...defaultTimes];
    }
  }

  try {
    // 2. Fetch overrides (extra days/slots or blocks)
    const { data: overrides } = await supabase
      .from('slot_overrides')
      .select('*')
      .gte('override_date', formatDate(today))
      .lte('override_date', formatDate(endDate));

    if (overrides) {
      for (const override of overrides) {
        const dStr = override.override_date;
        if (!availableSlots[dStr]) availableSlots[dStr] = [];
        
        // Generate override blocks (30min)
        let customTimes: string[] = [];
        let [sH, sM] = override.start_time.split(':').map(Number);
        let [eH, eM] = override.end_time.split(':').map(Number);
        
        let curH = sH;
        let curM = sM;
        while (curH < eH || (curH === eH && curM < eM)) {
          customTimes.push(`${curH.toString().padStart(2, '0')}:${curM.toString().padStart(2, '0')}`);
          curM += 30;
          if (curM >= 60) {
            curM = 0;
            curH++;
          }
        }

        if (override.is_available) {
          // Merge custom slots
          availableSlots[dStr] = [...new Set([...availableSlots[dStr], ...customTimes])].sort();
        } else {
          // Block custom slots
          availableSlots[dStr] = availableSlots[dStr].filter(t => !customTimes.includes(t));
          if (availableSlots[dStr].length === 0) {
            delete availableSlots[dStr];
          }
        }
      }
    }

    // 3. Fetch current bookings to remove them
    const { data: bookings } = await supabase
      .from('bookings')
      .select('booking_date, booking_time')
      .gte('booking_date', formatDate(today))
      .lte('booking_date', formatDate(endDate));

    if (bookings) {
      for (const b of bookings) {
        const dateStr = b.booking_date;
        // The DB might return '12:00:00', so we slice the first 5 chars '12:00'
        const timeStr = b.booking_time.slice(0, 5); 
        
        if (availableSlots[dateStr]) {
          availableSlots[dateStr] = availableSlots[dateStr].filter(t => t !== timeStr);
          if (availableSlots[dateStr].length === 0) {
            delete availableSlots[dateStr];
          }
        }
      }
    }

    // Convert object to array sorted by date
    const sortedDates = Object.keys(availableSlots).sort();
    const result = sortedDates.map(date => ({
      date,
      times: availableSlots[date]
    }));

    return NextResponse.json({ slots: result });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}
