import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  Users,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { BusRoute } from '../../data/busData';

interface BusScheduleScreenProps {
  searchRoute: string;
  searchDate: string;
  routes: BusRoute[];
  onBack: () => void;
  onSelectRoute: (route: BusRoute) => void;
}

export const BusScheduleScreen: React.FC<BusScheduleScreenProps> = ({
  searchRoute,
  searchDate,
  routes,
  onBack,
  onSelectRoute,
}) => {
  const [filter, setFilter] = useState<'all' | 'ac' | 'fast'>('all');

  const filteredRoutes = routes.filter((r) => {
    if (filter === 'ac') return r.busType.toLowerCase().includes('ac');
    if (filter === 'fast') return r.duration.includes('1h 30m') || r.duration.includes('1h 15m');
    return true;
  });

  return (
    <div id="bus-schedule-screen" className="flex flex-col h-full bg-slate-50 select-none">
      {/* Top App Bar */}
      <div className="flex items-center px-4 py-3.5 bg-indigo-900 text-white shadow-md">
        <button
          id="btn-schedule-back"
          onClick={onBack}
          aria-label="Back"
          className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-3 text-base font-bold tracking-wider uppercase">
          BUS SCHEDULE
        </h2>
      </div>

      {/* Route Header Banner */}
      <div className="px-5 py-3.5 bg-indigo-950 text-white border-b border-indigo-800 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold tracking-wide text-white">
            {searchRoute}
          </div>
          <div className="text-xs text-teal-300 font-medium mt-0.5">
            {searchDate}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-800 text-indigo-200 font-mono font-bold">
            {filteredRoutes.length} Buses
          </span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
            filter === 'all'
              ? 'bg-indigo-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Buses
        </button>
        <button
          onClick={() => setFilter('ac')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
            filter === 'ac'
              ? 'bg-indigo-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          AC Express Only
        </button>
        <button
          onClick={() => setFilter('fast')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
            filter === 'fast'
              ? 'bg-indigo-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Fastest Trips
        </button>
      </div>

      {/* Schedule Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
        {filteredRoutes.map((route) => (
          <div
            key={route.id}
            id={`schedule-card-${route.routeNumber}`}
            onClick={() => onSelectRoute(route)}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-400 hover:shadow-xs transition cursor-pointer group"
          >
            {/* Bus No. & Price Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-900 text-white font-black text-xs">
                  Bus No. {route.routeNumber}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {route.busType}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-teal-700">
                  ₹{route.fare}
                </span>
              </div>
            </div>

            {/* Departure & Arrival Time with Route Arrow */}
            <div className="py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="text-left">
                <div className="text-xs text-slate-400 font-medium">Departure</div>
                <div className="text-sm font-bold text-slate-900">
                  {route.departureTime}
                </div>
                <div className="text-xs text-slate-600 font-semibold">{route.source}</div>
              </div>

              <div className="flex flex-col items-center px-2">
                <span className="text-[10px] text-slate-400 font-mono font-medium">
                  {route.duration}
                </span>
                <div className="flex items-center gap-1 my-0.5 text-indigo-900">
                  <span className="w-8 h-px bg-indigo-300"></span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-emerald-600 font-bold">Direct</span>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Arrival</div>
                <div className="text-sm font-bold text-slate-900">
                  {route.arrivalTime}
                </div>
                <div className="text-xs text-slate-600 font-semibold">{route.destination}</div>
              </div>
            </div>

            {/* Card Footer: Seats Left & Action hint */}
            <div className="flex items-center justify-between mt-3 pt-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>{route.seatsLeft} seats left</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-indigo-900 group-hover:translate-x-0.5 transition">
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
