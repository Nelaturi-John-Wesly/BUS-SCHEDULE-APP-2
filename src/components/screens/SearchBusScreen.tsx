import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  ArrowUpDown,
  Search,
  ChevronRight,
} from 'lucide-react';
import { INITIAL_RECENT_SEARCHES, AVAILABLE_CITIES } from '../../data/busData';

interface SearchBusScreenProps {
  onBack: () => void;
  onSearch: (source: string, destination: string, date: string) => void;
}

export const SearchBusScreen: React.FC<SearchBusScreenProps> = ({
  onBack,
  onSearch,
}) => {
  const [source, setSource] = useState('Center');
  const [destination, setDestination] = useState('Railway Station');
  const [journeyDate, setJourneyDate] = useState('05-07-2026');
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [error, setError] = useState('');

  // Swap Source & Destination
  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!source.trim()) {
      setError('Please enter source location.');
      return;
    }
    if (!destination.trim()) {
      setError('Please enter destination location.');
      return;
    }
    if (source.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setError('Source and Destination cannot be the same.');
      return;
    }
    setError('');

    // Add to recent searches if not already there
    const exists = recentSearches.some(
      (s) => s.source === source && s.destination === destination
    );
    if (!exists) {
      setRecentSearches([{ source, destination, date: journeyDate }, ...recentSearches.slice(0, 4)]);
    }

    onSearch(source, destination, journeyDate);
  };

  const handleRecentClick = (s: string, d: string, date: string) => {
    setSource(s);
    setDestination(d);
    setJourneyDate(date);
    onSearch(s, d, date);
  };

  return (
    <div id="search-bus-screen" className="flex flex-col h-full bg-slate-50 select-none">
      {/* Top App Bar */}
      <div className="flex items-center px-4 py-3.5 bg-indigo-900 text-white shadow-md">
        <button
          id="btn-search-bus-back"
          onClick={onBack}
          aria-label="Back"
          className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-3 text-base font-bold tracking-wider uppercase">
          SEARCH BUS
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Search Input Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          {error && (
            <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSearchSubmit} className="space-y-3">
            {/* From (Source) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                From (Source)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-indigo-900">
                  <MapPin className="w-4 h-4" />
                </span>
                <input
                  id="input-search-source"
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Enter departure city/terminal"
                  list="city-options-source"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white rounded-xl border border-slate-300 focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20 text-slate-900 outline-none transition font-medium"
                />
                <datalist id="city-options-source">
                  {AVAILABLE_CITIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Swap Button Divider */}
            <div className="relative flex justify-center -my-1 z-10">
              <button
                type="button"
                id="btn-swap-locations"
                onClick={handleSwap}
                aria-label="Swap locations"
                className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-center hover:bg-indigo-100 active:scale-90 transition shadow-2xs cursor-pointer"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>

            {/* To (Destination) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                To (Destination)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-700">
                  <MapPin className="w-4 h-4" />
                </span>
                <input
                  id="input-search-destination"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter arrival station"
                  list="city-options-dest"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white rounded-xl border border-slate-300 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-slate-900 outline-none transition font-medium"
                />
                <datalist id="city-options-dest">
                  {AVAILABLE_CITIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Journey Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Journey Date
              </label>
              <div
                id="picker-journey-date"
                onClick={() => setShowDatePickerModal(true)}
                className="relative flex items-center pl-10 pr-4 py-3 text-sm bg-white rounded-xl border border-slate-300 hover:border-indigo-900 cursor-pointer transition shadow-2xs"
              >
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-indigo-900">
                  <CalendarIcon className="w-4 h-4" />
                </span>
                <span className="font-semibold text-slate-800">{journeyDate}</span>
                <span className="ml-auto text-[11px] font-medium text-slate-400">
                  Tap to change
                </span>
              </div>
            </div>

            {/* Search Buses Button */}
            <button
              type="submit"
              id="btn-search-buses-submit"
              className="w-full !mt-5 py-3.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-sm tracking-wider uppercase shadow-md shadow-indigo-950/20 active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Buses</span>
            </button>
          </form>
        </div>

        {/* Section: Recent Searches */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Recent Searches</span>
          </h3>

          <div className="space-y-2">
            {recentSearches.map((item, idx) => (
              <div
                key={idx}
                id={`recent-search-${idx}`}
                onClick={() => handleRecentClick(item.source, item.destination, item.date)}
                className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-indigo-400 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-900 transition">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-800 block">
                      {item.source} → {item.destination}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-900 group-hover:translate-x-0.5 transition" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date Picker Modal (Material Date Picker Simulation) */}
      {showDatePickerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs p-5 shadow-2xl border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
              Select Journey Date
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-4">
              Transit Calendar 2026
            </h4>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                '05-07-2026',
                '06-07-2026',
                '07-07-2026',
                '08-07-2026',
                '09-07-2026',
                '10-07-2026',
              ].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setJourneyDate(d);
                    setShowDatePickerModal(false);
                  }}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition cursor-pointer ${
                    journeyDate === d
                      ? 'bg-indigo-900 text-white border-indigo-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {d.split('-')[0]} Jul
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowDatePickerModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDatePickerModal(false)}
                className="px-4 py-1.5 text-xs font-bold bg-indigo-900 text-white rounded-lg cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
