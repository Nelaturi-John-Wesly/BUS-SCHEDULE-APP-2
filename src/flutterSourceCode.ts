export const FLUTTER_MAIN_DART = `import 'package:flutter/material.dart';

void main() {
  runApp(const BusScheduleApp());
}

/// Global Application with Material Design 3 Theme
class BusScheduleApp extends StatelessWidget {
  const BusScheduleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bus Schedule App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF3F51B5), // Indigo primary
          primary: const Color(0xFF3F51B5),
          secondary: const Color(0xFF009688), // Teal accent
          surface: const Color(0xFFF8FAFC),
        ),
        cardTheme: CardTheme(
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Color(0xFF3F51B5), width: 2),
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            elevation: 2,
            padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            backgroundColor: const Color(0xFF3F51B5),
            foregroundColor: Colors.white,
            textStyle: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              letterSpacing: 0.5,
            ),
          ),
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const LandingScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/home': (context) => const HomeScreen(),
        '/search': (context) => const SearchBusScreen(),
        '/schedule': (context) => const BusScheduleScreen(),
        '/details': (context) => const BusDetailsScreen(),
        '/seats': (context) => const SelectSeatsScreen(),
        '/confirmation': (context) => const BookingConfirmationScreen(),
      },
    );
  }
}

// ==========================================
// MODELS & DATA REPOSITORY
// ==========================================

class BusInfo {
  final String busNo;
  final String departureTime;
  final String arrivalTime;
  final String from;
  final String to;
  final int fare;
  final String totalTime;
  final int seatsLeft;
  final List<String> stops;

  const BusInfo({
    required this.busNo,
    required this.departureTime,
    required this.arrivalTime,
    required this.from,
    required this.to,
    required this.fare,
    required this.totalTime,
    required this.seatsLeft,
    required this.stops,
  });
}

class AppState {
  static final AppState instance = AppState._();
  AppState._();

  String userName = "Satya";
  String searchSource = "Center";
  String searchDestination = "Railway Station";
  String journeyDate = "05-07-2026";

  List<String> recentSearches = [
    "Center -> Railway Station",
    "Airport -> Center",
    "Center -> Tech Park",
  ];

  final List<BusInfo> sampleBuses = [
    const BusInfo(
      busNo: "101",
      departureTime: "8:30 A.M.",
      arrivalTime: "10:15 A.M.",
      from: "Center",
      to: "Railway Station",
      fare: 35,
      totalTime: "1h 45m",
      seatsLeft: 45,
      stops: ["Center", "Market", "MG Road", "Railway Station"],
    ),
    const BusInfo(
      busNo: "105",
      departureTime: "9:15 A.M.",
      arrivalTime: "11:00 A.M.",
      from: "Center",
      to: "Airport",
      fare: 40,
      totalTime: "1h 45m",
      seatsLeft: 38,
      stops: ["Center", "Indira Circle", "Bypass Ring", "Airport"],
    ),
    const BusInfo(
      busNo: "112",
      departureTime: "10:45 A.M.",
      arrivalTime: "12:30 P.M.",
      from: "Center",
      to: "Tech Park",
      fare: 35,
      totalTime: "1h 45m",
      seatsLeft: 29,
      stops: ["Center", "Old Town", "Cyber Hub", "Tech Park"],
    ),
    const BusInfo(
      busNo: "124",
      departureTime: "01:15 P.M.",
      arrivalTime: "03:00 P.M.",
      from: "Center",
      to: "Railway Station",
      fare: 35,
      totalTime: "1h 45m",
      seatsLeft: 42,
      stops: ["Center", "Market", "MG Road", "Railway Station"],
    ),
  ];

  BusInfo selectedBus = const BusInfo(
    busNo: "101",
    departureTime: "8:30 A.M.",
    arrivalTime: "10:15 A.M.",
    from: "Center",
    to: "Railway Station",
    fare: 35,
    totalTime: "1h 45m",
    seatsLeft: 45,
    stops: ["Center", "Market", "MG Road", "Railway Station"],
  );

  List<int> selectedSeats = [7, 20];
  String lastBookingId = "BK10124052401";
}

// 1. LandingScreen, 2. LoginScreen, 3. RegisterScreen,
// 4. HomeScreen, 5. SearchBusScreen, 6. BusScheduleScreen,
// 7. BusDetailsScreen, 8. SelectSeatsScreen, 9. BookingConfirmationScreen
// [Full compilable code in /lib/main.dart]
`;

export const PUBSPEC_YAML = `name: bus_schedule_app
description: "A complete Material Design 3 Bus Scheduling and Booking App in Flutter."
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  intl: ^0.19.0
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`;
