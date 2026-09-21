export interface BusRoute {
  id: string;
  routeNumber: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  seatsLeft: number;
  totalSeats: number;
  busType: string;
  rating: number;
  stops: {
    name: string;
    time: string;
    passed?: boolean;
    distance?: string;
  }[];
}

export interface BookingRecord {
  bookingId: string;
  busNumber: string;
  source: string;
  destination: string;
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  selectedSeats: number[];
  fare: number;
  passengerName: string;
  bookingTime: string;
}

export const POPULAR_ROUTES: BusRoute[] = [
  {
    id: 'route-101',
    routeNumber: '101',
    source: 'Center',
    destination: 'Railway Station',
    departureTime: '8:30 AM',
    arrivalTime: '10:15 AM',
    duration: '1h 45m',
    fare: 35,
    seatsLeft: 45,
    totalSeats: 50,
    busType: 'AC Express Superfast',
    rating: 4.8,
    stops: [
      { name: 'Center Bus Terminal', time: '8:30 AM', passed: true, distance: '0 km' },
      { name: 'Market Yard', time: '9:00 AM', passed: true, distance: '6 km' },
      { name: 'MG Road Junction', time: '9:40 AM', passed: false, distance: '14 km' },
      { name: 'Railway Station', time: '10:15 AM', passed: false, distance: '22 km' },
    ],
  },
  {
    id: 'route-105',
    routeNumber: '105',
    source: 'Center',
    destination: 'Airport',
    departureTime: '9:15 AM',
    arrivalTime: '11:00 AM',
    duration: '1h 45m',
    fare: 60,
    seatsLeft: 38,
    totalSeats: 50,
    busType: 'Vayu Vajra AC Shuttle',
    rating: 4.9,
    stops: [
      { name: 'Center Bus Terminal', time: '9:15 AM', passed: true, distance: '0 km' },
      { name: 'Hebbal Flyover', time: '9:50 AM', passed: false, distance: '11 km' },
      { name: 'Yelahanka Circle', time: '10:25 AM', passed: false, distance: '20 km' },
      { name: 'International Airport T1', time: '11:00 AM', passed: false, distance: '34 km' },
    ],
  },
  {
    id: 'route-112',
    routeNumber: '112',
    source: 'Center',
    destination: 'Tech Park',
    departureTime: '10:00 AM',
    arrivalTime: '11:30 AM',
    duration: '1h 30m',
    fare: 40,
    seatsLeft: 42,
    totalSeats: 50,
    busType: 'Comfort Deluxe Non-AC',
    rating: 4.6,
    stops: [
      { name: 'Center Bus Terminal', time: '10:00 AM', passed: false, distance: '0 km' },
      { name: 'Ring Road Circle', time: '10:35 AM', passed: false, distance: '8 km' },
      { name: 'Cyber City Hub', time: '11:05 AM', passed: false, distance: '16 km' },
      { name: 'Global Tech Park', time: '11:30 AM', passed: false, distance: '24 km' },
    ],
  },
  {
    id: 'route-204',
    routeNumber: '204',
    source: 'Railway Station',
    destination: 'University Campus',
    departureTime: '11:30 AM',
    arrivalTime: '12:45 PM',
    duration: '1h 15m',
    fare: 30,
    seatsLeft: 29,
    totalSeats: 50,
    busType: 'Metro Feeder Green',
    rating: 4.7,
    stops: [
      { name: 'Railway Station', time: '11:30 AM', passed: false, distance: '0 km' },
      { name: 'City Hospital', time: '11:55 AM', passed: false, distance: '5 km' },
      { name: 'Botanical Garden', time: '12:20 PM', passed: false, distance: '11 km' },
      { name: 'University Main Gate', time: '12:45 PM', passed: false, distance: '17 km' },
    ],
  },
  {
    id: 'route-308',
    routeNumber: '308',
    source: 'Airport',
    destination: 'Center',
    departureTime: '1:15 PM',
    arrivalTime: '3:00 PM',
    duration: '1h 45m',
    fare: 60,
    seatsLeft: 34,
    totalSeats: 50,
    busType: 'Airport Express AC',
    rating: 4.8,
    stops: [
      { name: 'Airport Terminal 2', time: '1:15 PM', passed: false, distance: '0 km' },
      { name: 'Trumpet Interchange', time: '1:45 PM', passed: false, distance: '12 km' },
      { name: 'Palace Grounds', time: '2:25 PM', passed: false, distance: '25 km' },
      { name: 'Center Bus Terminal', time: '3:00 PM', passed: false, distance: '34 km' },
    ],
  },
];

export const INITIAL_RECENT_SEARCHES = [
  { source: 'Center', destination: 'Railway Station', date: '05 July 2026' },
  { source: 'Airport', destination: 'Center', date: '06 July 2026' },
  { source: 'Center', destination: 'Tech Park', date: '07 July 2026' },
];

export const AVAILABLE_CITIES = [
  'Center',
  'Railway Station',
  'Airport',
  'Tech Park',
  'University Campus',
  'Market Yard',
  'MG Road',
  'North Boulevard',
  'South Bay',
];
