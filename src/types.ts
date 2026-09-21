export interface BusInfo {
  busNo: string;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  fare: number;
  totalTime: string;
  seatsLeft: number;
  stops: string[];
}

export interface BookingRecord {
  bookingId: string;
  bus: BusInfo;
  seats: number[];
  totalFare: number;
  journeyDate: string;
  bookedAt: string;
}

export type ScreenId =
  | 'landing'
  | 'login'
  | 'register'
  | 'home'
  | 'search'
  | 'schedule'
  | 'details'
  | 'seats'
  | 'confirmation';
