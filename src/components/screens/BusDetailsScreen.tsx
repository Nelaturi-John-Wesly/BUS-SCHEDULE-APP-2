import React from 'react';
import {
  ArrowLeft,
  Clock,
  Circle,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Zap,
  Info,
  ChevronRight,
} from 'lucide-react';
import { BusRoute } from '../../data/busData';

interface BusDetailsScreenProps {
  route: BusRoute;
  journeyDate: string;
  onBack: () => void;
  onBookNow: () => void;
}

export const BusDetailsScreen: React.FC<BusDetailsScreenProps> = ({
  route,
  journeyDate,
  onBack,
  onBookNow,
}) => {
  return (
    <div id="bus-details-screen" className="flex flex-col h-full bg-slate-50 select-none">
      {/* Top App Bar */}
      <div className="flex items-center px-4 py-3.5 bg-indigo-900 text-white shadow-md">
        <button
          id="btn-details-back"
          onClick={onBack}
          aria-label="Back"
          className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-3 text-base font-bold tracking-wide">Bus Details</h2>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-6">
        {/* Details Section Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-indigo-900 text-white font-black text-xs">
                Bus No. {route.routeNumber}
              </span>
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                {route.busType}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>On Time</span>
            </div>
          </div>

          <h3 className="text-base font-black text-slate-900 mt-2">
            {route.source} → {route.destination}
          </h3>

          <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
            <span>Departure: <strong className="text-slate-800">{route.departureTime}</strong></span>
            <span>•</span>
            <span>Arrival: <strong className="text-slate-800">{route.arrivalTime}</strong></span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Date: <strong className="text-slate-700">{journeyDate}</strong></span>
            <span>Platform: <strong className="text-slate-700">Bay 04</strong></span>
          </div>
        </div>

        {/* Metrics Bar: 3-column stats */}
        <div
          id="metrics-bar"
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs"
        >
          <div className="grid grid-cols-3 divide-x divide-slate-200 text-center">
            {/* Stat 1: Total Time */}
            <div className="px-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Time
              </span>
              <span className="text-base font-black text-indigo-900 mt-1 block">
                {route.duration}
              </span>
            </div>

            {/* Stat 2: Fare */}
            <div className="px-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Fare
              </span>
              <span className="text-base font-black text-teal-700 mt-1 block">
                ₹{route.fare}
              </span>
            </div>

            {/* Stat 3: Seats left */}
            <div className="px-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Seats left
              </span>
              <span className="text-base font-black text-emerald-600 mt-1 block">
                {route.seatsLeft}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline View ("Routes & Stops") */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Routes & Stops
            </h4>
            <span className="text-xs text-slate-400">
              {route.stops.length} designated stations
            </span>
          </div>

          <div className="relative pl-2">
            {route.stops.map((stop, idx) => {
              const isLast = idx === route.stops.length - 1;
              return (
                <div key={idx} className="relative flex items-start gap-4 pb-6 last:pb-0">
                  {/* Timeline connector line */}
                  {!isLast && (
                    <div className="absolute left-2.75 top-5 bottom-0 w-0.5 bg-slate-200" />
                  )}

                  {/* Icon badge */}
                  <div
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 transition ${
                      stop.passed
                        ? 'bg-indigo-900 border-indigo-900 text-white'
                        : isLast
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : 'bg-white border-slate-400 text-slate-400'
                    }`}
                  >
                    {stop.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : isLast ? (
                      <MapPin className="w-3.5 h-3.5" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                    )}
                  </div>

                  {/* Stop detail */}
                  <div className="flex-1 -mt-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">
                        {stop.name}
                      </span>
                      <span className="text-xs font-mono font-semibold text-indigo-950">
                        {stop.time}
                      </span>
                    </div>
                    {stop.distance && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {stop.distance} from origin
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Amenity Badges */}
        <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-around text-xs text-indigo-900 font-semibold">
          <span>⚡ USB Charging</span>
          <span>•</span>
          <span>❄️ Climate Control</span>
          <span>•</span>
          <span>🛡️ GPS Live Safety</span>
        </div>
      </div>

      {/* Bottom Sticky Action Bar: "Book Now" Button */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-lg">
        <button
          id="btn-book-now"
          onClick={onBookNow}
          className="w-full py-3.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-sm tracking-wider uppercase shadow-md shadow-indigo-950/20 active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Book Now</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
