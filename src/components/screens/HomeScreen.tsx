import React, { useState } from 'react';
import {
  Bell,
  Search,
  Calendar,
  Ticket,
  Heart,
  MapPin,
  ArrowRight,
  ChevronRight,
  Home as HomeIcon,
  Compass,
  User as UserIcon,
  Bus,
  Clock,
  Navigation,
  X,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { BusRoute, BookingRecord, POPULAR_ROUTES } from '../../data/busData';

interface HomeScreenProps {
  userName: string;
  bookings: BookingRecord[];
  onNavigateSearch: () => void;
  onNavigateSchedule: (route: BusRoute) => void;
  onNavigateAllSchedules: () => void;
  onSelectBookingDetails: (booking: BookingRecord) => void;
  onLogout: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName,
  bookings,
  onNavigateSearch,
  onNavigateSchedule,
  onNavigateAllSchedules,
  onSelectBookingDetails,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'routes' | 'bookings' | 'profile'>('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLiveTracking, setShowLiveTracking] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(['route-101']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFavorite = (routeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(routeId)) {
      setFavorites(favorites.filter((id) => id !== routeId));
      showToast('Removed from Favourites');
    } else {
      setFavorites([...favorites, routeId]);
      showToast('Added to Favourites ❤️');
    }
  };

  return (
    <div id="home-screen" className="flex flex-col h-full bg-slate-50 select-none relative">
      {/* App Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-indigo-900 text-white shadow-md z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Bus className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <span className="font-bold text-base tracking-wide block leading-none">
              Bus Schedule App
            </span>
            <span className="text-[10px] text-teal-200 font-mono">Transit Network</span>
          </div>
        </div>

        <button
          id="btn-home-notifications"
          onClick={() => setShowNotifications(true)}
          aria-label="Notifications"
          className="relative p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-indigo-900 animate-pulse" />
        </button>
      </div>

      {/* Toast popup */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Body Content based on Active Bottom Tab */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="p-4 space-y-5 pb-8">
            {/* Header: Personalized Greeting */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  Hello, {userName} 👋
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Where are you travelling today?
                </p>
              </div>
              <div className="w-11 h-11 rounded-full bg-linear-to-tr from-indigo-900 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-indigo-100">
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Search Bar Input Box */}
            <div
              id="search-bus-input-box"
              onClick={onNavigateSearch}
              className="group flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-400 transition cursor-pointer"
            >
              <Search className="w-5 h-5 text-slate-400 group-hover:text-indigo-900 transition" />
              <div className="flex-1 text-sm font-medium text-slate-400">
                Search Bus (Source, Destination, Date)...
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900">
                Find
              </span>
            </div>

            {/* Grid/Category Quick Cards: 3-column grid */}
            <div>
              <div className="grid grid-cols-3 gap-2.5">
                {/* Card 1: Bus Schedule */}
                <button
                  id="card-quick-schedule"
                  onClick={onNavigateAllSchedules}
                  className="flex flex-col items-center justify-center p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 hover:shadow-xs active:scale-[0.98] transition cursor-pointer text-center"
                >
                  <div className="w-11 h-11 rounded-full bg-indigo-50 text-indigo-900 flex items-center justify-center mb-2">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    Bus Schedule
                  </span>
                </button>

                {/* Card 2: My Bookings */}
                <button
                  id="card-quick-bookings"
                  onClick={() => setActiveTab('bookings')}
                  className="flex flex-col items-center justify-center p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-teal-300 hover:shadow-xs active:scale-[0.98] transition cursor-pointer text-center"
                >
                  <div className="w-11 h-11 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mb-2">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    My Bookings
                  </span>
                </button>

                {/* Card 3: Favourites */}
                <button
                  id="card-quick-favourites"
                  onClick={() => {
                    setActiveTab('routes');
                    showToast('Showing your saved favourites');
                  }}
                  className="flex flex-col items-center justify-center p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-rose-300 hover:shadow-xs active:scale-[0.98] transition cursor-pointer text-center"
                >
                  <div className="w-11 h-11 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    Favourites
                  </span>
                </button>
              </div>

              {/* Wide Card Below: Live Tracking */}
              <button
                id="card-live-tracking"
                onClick={() => setShowLiveTracking(true)}
                className="w-full mt-3 p-4 bg-linear-to-r from-teal-900 to-indigo-950 rounded-xl text-white shadow-md flex items-center justify-between hover:opacity-95 active:scale-[0.99] transition cursor-pointer text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-teal-400/20 border border-teal-300/30 text-teal-300 flex items-center justify-center animate-pulse">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black tracking-wide">
                        Live Tracking
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-teal-400 text-teal-950 font-bold uppercase">
                        Active GPS
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Real-time bus arrival, delays & GPS status
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-teal-300" />
              </button>
            </div>

            {/* Section: Popular Routes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Popular Routes
                </h2>
                <button
                  id="link-popular-view-all"
                  onClick={onNavigateAllSchedules}
                  className="text-xs font-bold text-indigo-900 hover:text-indigo-700 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Popular route cards list */}
              <div className="space-y-2.5">
                {POPULAR_ROUTES.map((route) => {
                  const isFav = favorites.includes(route.id);
                  return (
                    <div
                      key={route.id}
                      id={`route-card-${route.routeNumber}`}
                      onClick={() => onNavigateSchedule(route)}
                      className="p-3.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-indigo-400 hover:shadow-xs transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 rounded-md bg-indigo-900 text-white font-black text-xs">
                            {route.routeNumber}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-slate-900">
                              {route.routeNumber} {route.source} → {route.destination}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                              <span>Dep: {route.departureTime}</span>
                              <span>•</span>
                              <span>{route.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <span className="text-base font-black text-teal-700">
                              ₹{route.fare}
                            </span>
                            <span className="block text-[10px] text-slate-400">
                              {route.seatsLeft} seats left
                            </span>
                          </div>
                          <button
                            onClick={(e) => toggleFavorite(route.id, e)}
                            aria-label="Toggle Favorite"
                            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isFav ? 'fill-rose-500 text-rose-500' : ''
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <div className="p-4 space-y-4 pb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">All Transit Routes</h2>
              <span className="text-xs text-slate-500">{POPULAR_ROUTES.length} active routes</span>
            </div>
            <div className="space-y-3">
              {POPULAR_ROUTES.map((route) => (
                <div
                  key={route.id}
                  onClick={() => onNavigateSchedule(route)}
                  className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-400 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-900 font-bold text-xs">
                      Bus {route.routeNumber}
                    </span>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      {route.busType}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {route.source} → {route.destination}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex justify-between">
                    <span>{route.departureTime} → {route.arrivalTime} ({route.duration})</span>
                    <span className="font-bold text-slate-900">₹{route.fare}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="p-4 space-y-4 pb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">My Bookings</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-900">
                {bookings.length} {bookings.length === 1 ? 'ticket' : 'tickets'}
              </span>
            </div>

            {bookings.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-6">
                <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-700">No active bookings yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Search buses, pick your preferred seat, and secure your ticket instantly!
                </p>
                <button
                  onClick={onNavigateSearch}
                  className="mt-4 px-4 py-2 rounded-xl bg-indigo-900 text-white text-xs font-bold shadow-xs hover:bg-indigo-800 transition cursor-pointer"
                >
                  Book A Bus Now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.bookingId}
                    onClick={() => onSelectBookingDetails(booking)}
                    className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-400 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-900 text-white font-mono font-bold text-xs">
                          {booking.busNumber}
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {booking.bookingId}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Confirmed
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-900">
                      {booking.source} → {booking.destination}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
                      <span>Seats: <strong className="text-slate-800">{booking.selectedSeats.join(', ')}</strong></span>
                      <span>Total: <strong className="text-teal-700 font-bold">₹{booking.fare}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="p-4 space-y-4 pb-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-2xs">
              <div className="w-16 h-16 rounded-full bg-indigo-900 text-white text-xl font-bold flex items-center justify-center mx-auto mb-3 shadow-md">
                {userName.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-base font-bold text-slate-900">{userName}</h2>
              <p className="text-xs text-slate-400 font-mono">satya@example.com • +91 98765 43210</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Passenger
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-2xs text-sm">
              <div className="p-3.5 flex justify-between items-center text-slate-700 hover:bg-slate-50 cursor-pointer">
                <span>Total Trips Completed</span>
                <span className="font-bold text-indigo-900">14</span>
              </div>
              <div className="p-3.5 flex justify-between items-center text-slate-700 hover:bg-slate-50 cursor-pointer">
                <span>Transit Wallet Balance</span>
                <span className="font-bold text-teal-700">₹450.00</span>
              </div>
              <div className="p-3.5 flex justify-between items-center text-slate-700 hover:bg-slate-50 cursor-pointer">
                <span>Saved Payment Methods</span>
                <span className="text-xs text-slate-400">UPI / Card</span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full py-3 rounded-xl border border-rose-200 text-rose-600 bg-rose-50/50 hover:bg-rose-100 text-xs font-bold tracking-wider uppercase transition cursor-pointer"
            >
              LOGOUT
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar: Home, Routes, Bookings, Profile */}
      <div
        id="bottom-navigation-bar"
        className="flex items-center justify-around bg-white border-t border-slate-200/90 py-2.5 px-2 shadow-lg z-10"
      >
        <button
          id="nav-tab-home"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'home'
              ? 'text-indigo-900 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[11px]">Home</span>
        </button>

        <button
          id="nav-tab-routes"
          onClick={() => setActiveTab('routes')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'routes'
              ? 'text-indigo-900 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[11px]">Routes</span>
        </button>

        <button
          id="nav-tab-bookings"
          onClick={() => setActiveTab('bookings')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'bookings'
              ? 'text-indigo-900 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Ticket className="w-5 h-5" />
            {bookings.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full" />
            )}
          </div>
          <span className="text-[11px]">Bookings</span>
        </button>

        <button
          id="nav-tab-profile"
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'profile'
              ? 'text-indigo-900 font-bold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[11px]">Profile</span>
        </button>
      </div>

      {/* Notifications Drawer Modal */}
      {showNotifications && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 max-h-[80%] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-900" />
                <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-3 space-y-2.5 overflow-y-auto">
              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100">
                <span className="text-xs font-bold text-indigo-900 block">
                  Route 101 On Time
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Bus 101 departing Center at 8:30 AM is currently moving on Platform 3.
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">5 mins ago</span>
              </div>
              <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100">
                <span className="text-xs font-bold text-teal-900 block">
                  New Weekend Express
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Airport Direct shuttle frequency increased to every 20 minutes.
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Tracking Modal */}
      {showLiveTracking && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-5 max-h-[85%] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-teal-600 animate-pulse" />
                <h3 className="font-bold text-slate-900 text-sm">Live Bus GPS Tracking</h3>
              </div>
              <button
                onClick={() => setShowLiveTracking(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-teal-300 font-bold block">
                    Bus No. 101 • Center → Railway Station
                  </span>
                  <span className="text-sm font-bold text-white mt-0.5 block">
                    Current Location: Market Yard (Moving)
                  </span>
                  <span className="text-xs text-slate-400">ETA Next Stop: 4 mins (MG Road)</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    38 km/h
                  </span>
                </div>
              </div>

              {/* Graphical mini route tracker */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Center (0 km)</span>
                  <span className="text-teal-700">● Live GPS</span>
                  <span>Station (22 km)</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden relative">
                  <div className="h-full bg-linear-to-r from-indigo-900 to-teal-500 w-[55%]" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                  <span>Departed 8:30 AM</span>
                  <span>Est. Arrival 10:15 AM</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowLiveTracking(false);
                  const r101 = POPULAR_ROUTES[0];
                  onNavigateSchedule(r101);
                }}
                className="w-full py-3 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Book Seats On This Bus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
