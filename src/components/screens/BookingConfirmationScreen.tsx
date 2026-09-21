import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  Check,
  QrCode,
  Printer,
  Bus,
  Calendar,
  Clock,
  MapPin,
  Share2,
} from 'lucide-react';
import { BusRoute } from '../../data/busData';

interface BookingConfirmationScreenProps {
  route: BusRoute;
  selectedSeats: number[];
  totalFare: number;
  journeyDate: string;
  bookingId: string;
  onDone: () => void;
}

export const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({
  route,
  selectedSeats,
  totalFare,
  journeyDate,
  bookingId,
  onDone,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadTicket = () => {
    // Generate text/html printable ticket or save
    const ticketContent = `
========================================
BUS SCHEDULE APP - PASSENGER E-TICKET
========================================
Booking ID    : ${bookingId}
Bus Number    : Bus No. ${route.routeNumber}
Bus Type      : ${route.busType}
Route         : ${route.source} -> ${route.destination}
Journey Date  : ${journeyDate}
Departure     : ${route.departureTime}
Arrival       : ${route.arrivalTime}
Seats Booked  : ${selectedSeats.join(', ')}
Total Fare    : ₹${totalFare}
Status        : CONFIRMED
Platform      : Bay 04
========================================
Have a pleasant journey!
    `.trim();

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ticket_${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div id="booking-confirmation-screen" className="flex flex-col h-full bg-slate-50 select-none">
      {/* Top App Bar */}
      <div className="flex items-center justify-center px-4 py-3.5 bg-indigo-900 text-white shadow-md">
        <h2 className="text-base font-bold tracking-wide">
          Booking Confirmation
        </h2>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col items-center pb-8">
        {/* Large Success Checkmark Badge */}
        <div className="my-3 flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center ring-8 ring-emerald-50">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 stroke-[2.2]" />
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-900 mt-4 tracking-tight">
            Booking Confirmed!
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs font-medium">
            Your ticket has been booked successfully.
          </p>
        </div>

        {/* Summary Ticket Card */}
        <div
          id="summary-ticket-card"
          className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden relative mt-3"
        >
          {/* Ticket Header Ribbon */}
          <div className="px-5 py-3.5 bg-linear-to-r from-indigo-900 to-indigo-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-teal-300" />
              <span className="font-black text-sm tracking-wide">
                Bus No. {route.routeNumber}
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded-sm">
              {bookingId}
            </span>
          </div>

          {/* Ticket Content */}
          <div className="p-5 space-y-4">
            {/* Route */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Route
              </span>
              <div className="text-base font-black text-slate-900 mt-0.5">
                {route.source} → {route.destination}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Date
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {journeyDate}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Departure Time
                </span>
                <span className="text-xs font-bold text-indigo-900">
                  {route.departureTime}
                </span>
              </div>
            </div>

            {/* Seats Booked & Total Fare */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Seats Booked
                </span>
                <span className="text-sm font-black text-slate-900">
                  {selectedSeats.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Total Fare
                </span>
                <span className="text-base font-black text-teal-700">
                  ₹{totalFare}
                </span>
              </div>
            </div>

            {/* Barcode & Booking ID Section */}
            <div className="pt-3 border-t border-dashed border-slate-300 flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-2 font-mono">
                <span>GATE 04 • PLATFORM 3 • SEATS CONFIRMED</span>
              </div>
              <div className="flex items-center justify-center gap-1 h-9 w-48 bg-slate-100 px-3 py-1 rounded">
                <div className="w-1 h-7 bg-slate-800 mr-0.5" />
                <div className="w-2 h-7 bg-slate-800 mr-1" />
                <div className="w-0.5 h-7 bg-slate-800 mr-0.5" />
                <div className="w-3 h-7 bg-slate-800 mr-0.5" />
                <div className="w-1 h-7 bg-slate-800 mr-1" />
                <div className="w-2 h-7 bg-slate-800 mr-0.5" />
                <div className="w-1 h-7 bg-slate-800 mr-1" />
                <div className="w-3 h-7 bg-slate-800 mr-0.5" />
                <div className="w-1 h-7 bg-slate-800 mr-0.5" />
                <div className="w-2 h-7 bg-slate-800 mr-1" />
                <div className="w-0.5 h-7 bg-slate-800 mr-0.5" />
                <div className="w-2 h-7 bg-slate-800" />
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-bold mt-1">
                {bookingId}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm mt-6 space-y-3">
          {/* DOWNLOAD TICKET Outline Button */}
          <button
            id="btn-download-ticket"
            onClick={handleDownloadTicket}
            className="w-full py-3.5 px-4 rounded-xl border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-50 font-bold text-xs tracking-wider uppercase active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Ticket Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>DOWNLOAD TICKET</span>
              </>
            )}
          </button>

          {/* DONE Primary Button */}
          <button
            id="btn-booking-done"
            onClick={onDone}
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-indigo-950/20 active:scale-[0.99] transition cursor-pointer"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};
