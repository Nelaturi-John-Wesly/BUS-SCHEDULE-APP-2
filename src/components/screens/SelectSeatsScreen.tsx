import React, { useState } from 'react';
import {
  ArrowLeft,
  Info,
  Check,
  ChevronRight,
  Armchair,
} from 'lucide-react';
import { BusRoute } from '../../data/busData';

interface SelectSeatsScreenProps {
  route: BusRoute;
  journeyDate: string;
  onBack: () => void;
  onProceedToPay: (selectedSeats: number[], totalFare: number) => void;
}

export const SelectSeatsScreen: React.FC<SelectSeatsScreenProps> = ({
  route,
  journeyDate,
  onBack,
  onProceedToPay,
}) => {
  // Pre-selected seats 7, 20 as specified in prompt wireframe, booked seats 3, 4, 11, 12, 18
  const [selectedSeats, setSelectedSeats] = useState<number[]>([7, 20]);
  const bookedSeats = [3, 4, 11, 12, 18];

  const totalSeats = 25; // 5 columns x 5 rows as specified

  const toggleSeat = (seatNo: number) => {
    if (bookedSeats.includes(seatNo)) return;
    if (selectedSeats.includes(seatNo)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNo));
    } else {
      setSelectedSeats([...selectedSeats, seatNo].sort((a, b) => a - b));
    }
  };

  const totalFare = selectedSeats.length * route.fare;
  const selectedSeatsStr =
    selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';

  return (
    <div id="select-seats-screen" className="flex flex-col h-full bg-slate-50 select-none">
      {/* Top App Bar */}
      <div className="flex items-center px-4 py-3.5 bg-indigo-900 text-white shadow-md">
        <button
          id="btn-seats-back"
          onClick={onBack}
          aria-label="Back"
          className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-3 text-base font-bold tracking-wide">Select Seats</h2>
      </div>

      {/* Sub-header: Bus number and timing details */}
      <div className="px-5 py-3 bg-indigo-950 text-white border-b border-indigo-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-teal-300 block">
            Bus No. {route.routeNumber}
          </span>
          <span className="text-xs text-slate-200 mt-0.5 block">
            {route.source} → {route.destination}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-white font-bold block">
            {route.departureTime}
          </span>
          <span className="text-[11px] text-slate-400">{journeyDate}</span>
        </div>
      </div>

      {/* Legend Row */}
      <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-around text-xs font-semibold text-slate-700">
        {/* Available: Border square */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm border-2 border-slate-400 bg-white" />
          <span>Available</span>
        </div>

        {/* Booked: Filled square */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-slate-400 border border-slate-400" />
          <span>Booked</span>
        </div>

        {/* Selected: Hatched/Highlighted square */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-teal-600 border-2 border-teal-700 flex items-center justify-center text-white">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>Selected</span>
        </div>
      </div>

      {/* Interactive Grid: 5-column grid layout representing seats 1 to 25 */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
        {/* Bus Cabin Outline */}
        <div className="w-full max-w-xs bg-white rounded-3xl border-2 border-slate-300 p-4 shadow-sm relative">
          {/* Driver Cockpit Indicator */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-200 px-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Front / Entrance
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
              <span>Driver</span>
              <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[9px] font-bold">
                ✇
              </div>
            </div>
          </div>

          {/* 5-Column Grid */}
          <div className="grid grid-cols-5 gap-2.5">
            {Array.from({ length: totalSeats }, (_, i) => {
              const seatNumber = i + 1;
              const isBooked = bookedSeats.includes(seatNumber);
              const isSelected = selectedSeats.includes(seatNumber);

              let buttonClasses =
                'aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-bold transition cursor-pointer active:scale-95';

              if (isBooked) {
                buttonClasses +=
                  ' bg-slate-300 text-slate-500 border border-slate-300 cursor-not-allowed';
              } else if (isSelected) {
                buttonClasses +=
                  ' bg-teal-600 text-white border-2 border-teal-700 shadow-xs ring-2 ring-teal-200';
              } else {
                buttonClasses +=
                  ' bg-white text-slate-800 border-2 border-slate-300 hover:border-indigo-900 hover:bg-indigo-50/50';
              }

              return (
                <button
                  key={seatNumber}
                  id={`seat-button-${seatNumber}`}
                  onClick={() => toggleSeat(seatNumber)}
                  disabled={isBooked}
                  aria-label={`Seat ${seatNumber} ${
                    isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'
                  }`}
                  className={buttonClasses}
                >
                  <span>{seatNumber}</span>
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3] mt-0.5" />}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400">
            Rear / Back Row
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 text-center">
          Tap on any available seat to select or unselect. Max 6 seats per booking.
        </p>
      </div>

      {/* Summary Footer */}
      <div className="p-4 bg-white border-t border-slate-200 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 block">
              Selected Seats: <strong className="text-slate-900">{selectedSeatsStr}</strong>
            </span>
            <span className="text-[11px] text-slate-400">
              {selectedSeats.length} seat(s) × ₹{route.fare}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-slate-500 block">Fare</span>
            <span className="text-xl font-black text-indigo-900">
              ₹{totalFare}
            </span>
          </div>
        </div>

        <button
          id="btn-proceed-to-pay"
          onClick={() => onProceedToPay(selectedSeats, totalFare)}
          disabled={selectedSeats.length === 0}
          className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-2 ${
            selectedSeats.length > 0
              ? 'bg-indigo-900 hover:bg-indigo-800 text-white shadow-md shadow-indigo-950/20 active:scale-[0.99]'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Proceed to Pay</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
