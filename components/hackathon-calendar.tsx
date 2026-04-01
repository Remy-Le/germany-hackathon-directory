'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllApprovedHackathons, type Hackathon } from '@/lib/data';

const CITY_COLORS: Record<string, { bg: string; hover: string; text: string }> = {
  Berlin:    { bg: 'bg-blue-600',   hover: 'hover:bg-blue-500',   text: 'text-white' },
  Munich:    { bg: 'bg-violet-600', hover: 'hover:bg-violet-500', text: 'text-white' },
  Hamburg:   { bg: 'bg-emerald-600',hover: 'hover:bg-emerald-500',text: 'text-white' },
  Frankfurt: { bg: 'bg-amber-600',  hover: 'hover:bg-amber-500',  text: 'text-white' },
  Cologne:   { bg: 'bg-rose-600',   hover: 'hover:bg-rose-500',   text: 'text-white' },
  Darmstadt: { bg: 'bg-cyan-600',   hover: 'hover:bg-cyan-500',   text: 'text-white' },
  Mannheim:  { bg: 'bg-fuchsia-600',hover: 'hover:bg-fuchsia-500',text: 'text-white' },
  Karlsruhe: { bg: 'bg-orange-600', hover: 'hover:bg-orange-500', text: 'text-white' },
};

const FORMAT_BADGE: Record<string, string> = {
  'in-person': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  hybrid:      'bg-violet-500/20 text-violet-300 border-violet-500/30',
};

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toLocalDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

interface CalendarEvent {
  hackathon: Hackathon;
  startDate: Date;
  endDate: Date;
}

interface EventSlot {
  event: CalendarEvent;
  colStart: number; // 0-6 day of week
  colSpan: number;
  row: number;
  isStart: boolean;
  isEnd: boolean;
}

function buildWeekSlots(
  weekStart: Date,
  events: CalendarEvent[],
  usedRows: Map<string, Set<number>>
): EventSlot[] {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const slots: EventSlot[] = [];

  for (const event of events) {
    // Does this event overlap with this week?
    if (event.endDate < weekStart || event.startDate > weekEnd) continue;

    const clampedStart = event.startDate < weekStart ? weekStart : event.startDate;
    const clampedEnd   = event.endDate   > weekEnd   ? weekEnd   : event.endDate;

    const colStart = clampedStart.getDay();
    const colSpan  = Math.round((clampedEnd.getTime() - clampedStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const isStart  = sameDay(clampedStart, event.startDate);
    const isEnd    = sameDay(clampedEnd, event.endDate);

    const weekKey = weekStart.toISOString();
    if (!usedRows.has(weekKey)) usedRows.set(weekKey, new Set());
    const taken = usedRows.get(weekKey)!;

    // Find first free row for this event in this week
    let row = 0;
    while (true) {
      let conflict = false;
      for (let c = colStart; c < colStart + colSpan; c++) {
        if (taken.has(row * 7 + c)) { conflict = true; break; }
      }
      if (!conflict) break;
      row++;
      if (row > 4) break; // max 5 rows
    }

    for (let c = colStart; c < colStart + colSpan; c++) {
      taken.add(row * 7 + c);
    }

    slots.push({ event, colStart, colSpan, row, isStart, isEnd });
  }

  return slots.sort((a, b) => a.row - b.row);
}

export default function HackathonCalendar() {
  const allHackathons = getAllApprovedHackathons();
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [tooltip, setTooltip] = useState<{ hackathon: Hackathon; x: number; y: number } | null>(null);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // Build calendar grid — always 6 rows of 7 days
  const firstDayOfMonth = new Date(year, month, 1);
  const startOfGrid     = new Date(firstDayOfMonth);
  startOfGrid.setDate(startOfGrid.getDate() - startOfGrid.getDay());

  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(startOfGrid);
      day.setDate(startOfGrid.getDate() + w * 7 + d);
      week.push(day);
    }
    weeks.push(week);
  }

  // Trim weeks that are entirely in the next month (keep at most 5 weeks when clean)
  const trimmedWeeks = weeks.filter((week) =>
    week.some((d) => d.getMonth() === month)
  );

  const calendarEvents: CalendarEvent[] = useMemo(() =>
    allHackathons.map(h => ({
      hackathon: h,
      startDate: toLocalDate(h.date),
      endDate:   toLocalDate(h.endDate),
    })), [allHackathons]);

  // Pre-compute slots per week
  const usedRows = new Map<string, Set<number>>();
  const weekSlots = trimmedWeeks.map(week =>
    buildWeekSlots(week[0], calendarEvents, usedRows)
  );

  const maxRowsPerWeek = weekSlots.map(slots =>
    slots.length === 0 ? 0 : Math.max(...slots.map(s => s.row)) + 1
  );

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }
  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }
  function goToday() {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  return (
    <div className="w-full">
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToday}
            className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevMonth}
            className="text-slate-300 hover:text-white hover:bg-slate-700"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            className="text-slate-300 hover:text-white hover:bg-slate-700"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <h2 className="text-xl font-semibold text-white ml-1">{monthName}</h2>
        </div>

        {/* City legend */}
        <div className="hidden md:flex items-center gap-3 flex-wrap justify-end">
          {Object.entries(CITY_COLORS).map(([city, colors]) => (
            <div key={city} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm ${colors.bg}`} />
              <span className="text-xs text-slate-400">{city}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 border-t border-l border-slate-700">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="border-r border-b border-slate-700 py-2 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-800/40"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar weeks */}
      <div className="border-l border-slate-700">
        {trimmedWeeks.map((week, wi) => {
          const slots   = weekSlots[wi];
          const maxRows = maxRowsPerWeek[wi];
          const rowHeight = Math.max(80, 32 + maxRows * 28);

          return (
            <div
              key={week[0].toISOString()}
              className="relative grid grid-cols-7 border-b border-slate-700"
              style={{ minHeight: rowHeight }}
            >
              {/* Day cells */}
              {week.map((day) => {
                const isToday     = sameDay(day, today);
                const inMonth     = day.getMonth() === month;
                return (
                  <div
                    key={day.toISOString()}
                    className={`relative border-r border-slate-700 pt-1 pl-1 ${
                      inMonth ? 'bg-slate-900/30' : 'bg-slate-900/10'
                    }`}
                    style={{ minHeight: rowHeight }}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm leading-none select-none
                        ${isToday
                          ? 'bg-blue-600 text-white font-bold'
                          : inMonth
                            ? 'text-slate-200'
                            : 'text-slate-600'
                        }`}
                    >
                      {day.getDate()}
                    </span>
                  </div>
                );
              })}

              {/* Event bars — absolutely positioned over the grid */}
              {slots.map((slot, si) => {
                const colors = CITY_COLORS[slot.event.hackathon.city] ?? CITY_COLORS['Berlin'];
                const topOffset = 26 + slot.row * 28; // below the date number
                // Each column is 1/7 of total width
                const leftPct  = (slot.colStart / 7) * 100;
                const widthPct = (slot.colSpan  / 7) * 100;
                const roundedLeft  = slot.isStart ? 'rounded-l-[3px]' : '';
                const roundedRight = slot.isEnd   ? 'rounded-r-[3px]' : '';
                return (
                  <Link
                    key={`${slot.event.hackathon.id}-w${wi}-${si}`}
                    href={`/hackathon/${slot.event.hackathon.id}`}
                    className={`absolute z-10 flex items-center px-2 text-xs font-medium truncate
                      ${colors.bg} ${colors.hover} ${colors.text}
                      ${roundedLeft} ${roundedRight}
                      transition-opacity hover:opacity-90 cursor-pointer`}
                    style={{
                      top:    topOffset,
                      left:   `calc(${leftPct}% + 2px)`,
                      width:  `calc(${widthPct}% - 4px)`,
                      height: 22,
                    }}
                    onMouseEnter={(e) => {
                      const rect = (e.target as HTMLElement).closest('a')!.getBoundingClientRect();
                      setTooltip({
                        hackathon: slot.event.hackathon,
                        x: rect.left + rect.width / 2,
                        y: rect.bottom + 8,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    aria-label={slot.event.hackathon.name}
                  >
                    {slot.isStart ? slot.event.hackathon.name : ''}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none bg-slate-800 border border-slate-600 rounded-lg shadow-xl p-3 w-64"
          style={{ left: tooltip.x - 128, top: tooltip.y }}
        >
          <p className="font-semibold text-white text-sm mb-1">{tooltip.hackathon.name}</p>
          <p className="text-slate-400 text-xs mb-2">{tooltip.hackathon.city} &mdash; {tooltip.hackathon.venue}</p>
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-xs">
              {toLocalDate(tooltip.hackathon.date).toLocaleDateString('en-DE', { month: 'short', day: 'numeric' })}
              {' – '}
              {toLocalDate(tooltip.hackathon.endDate).toLocaleDateString('en-DE', { month: 'short', day: 'numeric' })}
            </span>
            <Badge className={`text-xs border ${FORMAT_BADGE[tooltip.hackathon.format]}`}>
              {tooltip.hackathon.format}
            </Badge>
          </div>
          <p className="text-blue-400 text-xs mt-1 font-medium">{tooltip.hackathon.prizes}</p>
        </div>
      )}
    </div>
  );
}
