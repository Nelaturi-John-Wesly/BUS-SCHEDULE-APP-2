import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  Code2,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Bus,
  Layers,
} from 'lucide-react';
import { BusRoute, BookingRecord, POPULAR_ROUTES } from './data/busData';
import { FlutterCodeModal } from './components/FlutterCodeModal';
import { LandingScreen } from './components/screens/LandingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { SearchBusScreen } from './components/screens/SearchBusScreen';
import { BusScheduleScreen } from './components/screens/BusScheduleScreen';
import { BusDetailsScreen } from './components/screens/BusDetailsScreen';
import { SelectSeatsScreen } from './components/screens/SelectSeatsScreen';
import { BookingConfirmationScreen } from './components/screens/BookingConfirmationScreen';

type ScreenId =
  | 'landing'
  | 'login'
  | 'register'
  | 'home'
  | 'search'
  | 'schedule'
  | 'details'
  | 'seats'
  | 'confirmation';

export default function App() {
  // Navigation & Screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [userName, setUserName] = useState<string>('Satya');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Transit state
  const [searchRoute, setSearchRoute] = useState<string>('Center -> Railway Station');
  const [journeyDate, setJourneyDate] = useState<string>('05 July 2026');
  const [availableRoutes, setAvailableRoutes] = useState<BusRoute[]>(POPULAR_ROUTES);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute>(POPULAR_ROUTES[0]);

  // Booking state
  const [selectedSeats, setSelectedSeats] = useState<number[]>([7, 20]);
  const [totalFare, setTotalFare] = useState<number>(70);
  const [bookingId, setBookingId] = useState<string>('BK10124052401');

  // Stored Bookings list
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      bookingId: 'BK10124052401',
      busNumber: '101',
      source: 'Center',
      destination: 'Railway Station',
      journeyDate: '05 July 2026',
      departureTime: '8:30 AM',
      arrivalTime: '10:15 AM',
      selectedSeats: [7, 20],
      fare: 70,
      passengerName: 'Satya',
      bookingTime: 'Just now',
    },
  ]);

  // Navigation handlers
  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setCurrentScreen('home');
  };

  const handleRegisterSuccess = (name: string) => {
    setUserName(name);
    setCurrentScreen('login');
  };

  const handleSearchSubmit = (src: string, dst: string, dt: string) => {
    setSearchRoute(`${src} -> ${dst}`);
    setJourneyDate(dt);

    // Find routes matching or fallback
    const matching = POPULAR_ROUTES.filter(
      (r) =>
        r.source.toLowerCase().includes(src.toLowerCase()) ||
        r.destination.toLowerCase().includes(dst.toLowerCase())
    );
    setAvailableRoutes(matching.length > 0 ? matching : POPULAR_ROUTES);
    setCurrentScreen('schedule');
  };

  const handleSelectRouteFromPopular = (route: BusRoute) => {
    setSelectedRoute(route);
    setSearchRoute(`${route.source} -> ${route.destination}`);
    setAvailableRoutes([route, ...POPULAR_ROUTES.filter((r) => r.id !== route.id)]);
    setCurrentScreen('details');
  };

  const handleViewAllSchedules = () => {
    setSearchRoute('Center -> Railway Station');
    setAvailableRoutes(POPULAR_ROUTES);
    setCurrentScreen('schedule');
  };

  const handleProceedToPay = (seats: number[], fare: number) => {
    const newId = `BK${selectedRoute.routeNumber}${Math.floor(1000000 + Math.random() * 9000000)}`;
    setBookingId(newId);
    setSelectedSeats(seats);
    setTotalFare(fare);

    // Add to bookings list
    const newBooking: BookingRecord = {
      bookingId: newId,
      busNumber: selectedRoute.routeNumber,
      source: selectedRoute.source,
      destination: selectedRoute.destination,
      journeyDate,
      departureTime: selectedRoute.departureTime,
      arrivalTime: selectedRoute.arrivalTime,
      selectedSeats: seats,
      fare,
      passengerName: userName,
      bookingTime: 'Just now',
    };
    setBookings([newBooking, ...bookings]);
    setCurrentScreen('confirmation');
  };

  const handleSelectExistingBooking = (b: BookingRecord) => {
    const matchedRoute =
      POPULAR_ROUTES.find((r) => r.routeNumber === b.busNumber) || selectedRoute;
    setSelectedRoute(matchedRoute);
    setBookingId(b.bookingId);
    setSelectedSeats(b.selectedSeats);
    setTotalFare(b.fare);
    setJourneyDate(b.journeyDate);
    setCurrentScreen('confirmation');
  };

  const screenNames: Record<ScreenId, string> = {
    landing: '1. Landing Screen',
    login: '2. Login Screen',
    register: '3. Register Screen',
    home: '4. Home Screen',
    search: '5. Search Bus Screen',
    schedule: '6. Bus Schedule Screen',
    details: '7. Bus Details Screen',
    seats: '8. Select Seats Screen',
    confirmation: '9. Booking Confirmation',
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Engineering & Demo Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">
                Bus Scheduling & Booking App
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold">
                Flutter Material 3
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Interactive multi-screen preview with full Dart source code export.
            </p>
          </div>
        </div>

        {/* Quick screen switcher & actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Screen Jump Selector */}
          <div className="relative">
            <select
              id="screen-selector-dropdown"
              value={currentScreen}
              onChange={(e) => setCurrentScreen(e.target.value as ScreenId)}
              aria-label="Select screen"
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              {(Object.keys(screenNames) as ScreenId[]).map((key) => (
                <option key={key} value={key}>
                  {screenNames[key]}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle: Phone Frame vs Full */}
          <button
            id="btn-toggle-device-frame"
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              deviceFrameMode
                ? 'bg-slate-800 text-teal-300 border-teal-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle Phone Frame"
          >
            {deviceFrameMode ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{deviceFrameMode ? 'Mobile Frame' : 'Expanded'}</span>
          </button>

          {/* View Flutter / Dart Code */}
          <button
            id="btn-open-dart-code"
            onClick={() => setIsCodeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>View Dart Code</span>
          </button>

          {/* Reset App */}
          <button
            id="btn-reset-app"
            onClick={() => {
              setCurrentScreen('landing');
              setUserName('Satya');
            }}
            title="Reset to Landing Screen"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Workspace Container */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden bg-radial from-slate-900 via-slate-950 to-black">
        {deviceFrameMode ? (
          /* Phone Frame Container */
          <div
            id="mobile-phone-frame"
            className="relative w-full max-w-[400px] h-[820px] max-h-[92vh] bg-black rounded-[44px] shadow-2xl ring-12 ring-slate-800/90 shadow-indigo-950/40 flex flex-col overflow-hidden border-4 border-slate-700"
          >
            {/* Phone Status Bar */}
            <div className="h-7 bg-indigo-950 text-white/90 text-[11px] font-mono font-semibold px-6 flex items-center justify-between shrink-0 select-none z-20">
              <span>9:41</span>
              {/* Dynamic Island / Camera Notch */}
              <div className="w-20 h-4 bg-black rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Active Screen View */}
            <div className="flex-1 overflow-hidden flex flex-col bg-slate-50 relative">
              {currentScreen === 'landing' && (
                <LandingScreen
                  onNavigateLogin={() => setCurrentScreen('login')}
                  onNavigateRegister={() => setCurrentScreen('register')}
                />
              )}

              {currentScreen === 'login' && (
                <LoginScreen
                  onBack={() => setCurrentScreen('landing')}
                  onLoginSuccess={handleLoginSuccess}
                  onNavigateRegister={() => setCurrentScreen('register')}
                />
              )}

              {currentScreen === 'register' && (
                <RegisterScreen
                  onBack={() => setCurrentScreen('login')}
                  onRegisterSuccess={handleRegisterSuccess}
                  onNavigateLogin={() => setCurrentScreen('login')}
                />
              )}

              {currentScreen === 'home' && (
                <HomeScreen
                  userName={userName}
                  bookings={bookings}
                  onNavigateSearch={() => setCurrentScreen('search')}
                  onNavigateSchedule={handleSelectRouteFromPopular}
                  onNavigateAllSchedules={handleViewAllSchedules}
                  onSelectBookingDetails={handleSelectExistingBooking}
                  onLogout={() => setCurrentScreen('landing')}
                />
              )}

              {currentScreen === 'search' && (
                <SearchBusScreen
                  onBack={() => setCurrentScreen('home')}
                  onSearch={handleSearchSubmit}
                />
              )}

              {currentScreen === 'schedule' && (
                <BusScheduleScreen
                  searchRoute={searchRoute}
                  searchDate={journeyDate}
                  routes={availableRoutes}
                  onBack={() => setCurrentScreen('search')}
                  onSelectRoute={(route) => {
                    setSelectedRoute(route);
                    setCurrentScreen('details');
                  }}
                />
              )}

              {currentScreen === 'details' && (
                <BusDetailsScreen
                  route={selectedRoute}
                  journeyDate={journeyDate}
                  onBack={() => setCurrentScreen('schedule')}
                  onBookNow={() => setCurrentScreen('seats')}
                />
              )}

              {currentScreen === 'seats' && (
                <SelectSeatsScreen
                  route={selectedRoute}
                  journeyDate={journeyDate}
                  onBack={() => setCurrentScreen('details')}
                  onProceedToPay={handleProceedToPay}
                />
              )}

              {currentScreen === 'confirmation' && (
                <BookingConfirmationScreen
                  route={selectedRoute}
                  selectedSeats={selectedSeats}
                  totalFare={totalFare}
                  journeyDate={journeyDate}
                  bookingId={bookingId}
                  onDone={() => setCurrentScreen('home')}
                />
              )}
            </div>

            {/* Android / iOS Home Indicator bar */}
            <div className="h-4 bg-white flex items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>
        ) : (
          /* Expanded Full-Window Mode */
          <div
            id="expanded-app-container"
            className="w-full max-w-4xl h-[86vh] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col"
          >
            <div className="flex-1 overflow-hidden flex flex-col">
              {currentScreen === 'landing' && (
                <LandingScreen
                  onNavigateLogin={() => setCurrentScreen('login')}
                  onNavigateRegister={() => setCurrentScreen('register')}
                />
              )}

              {currentScreen === 'login' && (
                <LoginScreen
                  onBack={() => setCurrentScreen('landing')}
                  onLoginSuccess={handleLoginSuccess}
                  onNavigateRegister={() => setCurrentScreen('register')}
                />
              )}

              {currentScreen === 'register' && (
                <RegisterScreen
                  onBack={() => setCurrentScreen('login')}
                  onRegisterSuccess={handleRegisterSuccess}
                  onNavigateLogin={() => setCurrentScreen('login')}
                />
              )}

              {currentScreen === 'home' && (
                <HomeScreen
                  userName={userName}
                  bookings={bookings}
                  onNavigateSearch={() => setCurrentScreen('search')}
                  onNavigateSchedule={handleSelectRouteFromPopular}
                  onNavigateAllSchedules={handleViewAllSchedules}
                  onSelectBookingDetails={handleSelectExistingBooking}
                  onLogout={() => setCurrentScreen('landing')}
                />
              )}

              {currentScreen === 'search' && (
                <SearchBusScreen
                  onBack={() => setCurrentScreen('home')}
                  onSearch={handleSearchSubmit}
                />
              )}

              {currentScreen === 'schedule' && (
                <BusScheduleScreen
                  searchRoute={searchRoute}
                  searchDate={journeyDate}
                  routes={availableRoutes}
                  onBack={() => setCurrentScreen('search')}
                  onSelectRoute={(route) => {
                    setSelectedRoute(route);
                    setCurrentScreen('details');
                  }}
                />
              )}

              {currentScreen === 'details' && (
                <BusDetailsScreen
                  route={selectedRoute}
                  journeyDate={journeyDate}
                  onBack={() => setCurrentScreen('schedule')}
                  onBookNow={() => setCurrentScreen('seats')}
                />
              )}

              {currentScreen === 'seats' && (
                <SelectSeatsScreen
                  route={selectedRoute}
                  journeyDate={journeyDate}
                  onBack={() => setCurrentScreen('details')}
                  onProceedToPay={handleProceedToPay}
                />
              )}

              {currentScreen === 'confirmation' && (
                <BookingConfirmationScreen
                  route={selectedRoute}
                  selectedSeats={selectedSeats}
                  totalFare={totalFare}
                  journeyDate={journeyDate}
                  bookingId={bookingId}
                  onDone={() => setCurrentScreen('home')}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Pure Dart / Flutter Source Code Modal */}
      <FlutterCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
