export const FLUTTER_DART_CODE = `import 'package:flutter/material.dart';

void main() {
  runApp(const BusScheduleApp());
}

/// Root Application Widget with Material Design 3 Theme
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
          seedColor: const Color(0xFF1E3A8A), // Indigo
          primary: const Color(0xFF1E3A8A),
          secondary: const Color(0xFF0D9488), // Teal
          surface: Colors.white,
          background: const Color(0xFFF8FAFC),
        ),
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0,
          backgroundColor: Color(0xFF1E3A8A),
          foregroundColor: Colors.white,
          titleTextStyle: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
          ),
        ),
        cardTheme: CardTheme(
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          color: Colors.white,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            elevation: 2,
            backgroundColor: const Color(0xFF1E3A8A),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            textStyle: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.bold,
              letterSpacing: 0.8,
            ),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: const BorderSide(color: Color(0xFFCBD5E1)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: const BorderSide(color: Color(0xFF1E3A8A), width: 2),
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
      },
    );
  }
}

// ==========================================
// MODELS
// ==========================================

class BusStop {
  final String name;
  final String time;
  final bool passed;

  const BusStop({
    required this.name,
    required this.time,
    this.passed = false,
  });
}

class BusRouteModel {
  final String busNumber;
  final String source;
  final String destination;
  final String departureTime;
  final String arrivalTime;
  final String duration;
  final double fare;
  final int seatsLeft;
  final List<BusStop> stops;

  const BusRouteModel({
    required this.busNumber,
    required this.source,
    required this.destination,
    required this.departureTime,
    required this.arrivalTime,
    required this.duration,
    required this.fare,
    required this.seatsLeft,
    required this.stops,
  });
}

final List<BusRouteModel> sampleRoutes = [
  BusRouteModel(
    busNumber: '101',
    source: 'Center',
    destination: 'Railway Station',
    departureTime: '8:30 A.M.',
    arrivalTime: '10:15 A.M.',
    duration: '1h 45m',
    fare: 35.0,
    seatsLeft: 45,
    stops: const [
      BusStop(name: 'Center', time: '8:30 A.M.', passed: true),
      BusStop(name: 'Market', time: '9:00 A.M.', passed: true),
      BusStop(name: 'MG Road', time: '9:40 A.M.', passed: false),
      BusStop(name: 'Railway Station', time: '10:15 A.M.', passed: false),
    ],
  ),
  BusRouteModel(
    busNumber: '105',
    source: 'Center',
    destination: 'Airport',
    departureTime: '9:15 A.M.',
    arrivalTime: '11:00 A.M.',
    duration: '1h 45m',
    fare: 60.0,
    seatsLeft: 38,
    stops: const [
      BusStop(name: 'Center', time: '9:15 A.M.', passed: true),
      BusStop(name: 'Hebbal', time: '9:50 A.M.', passed: false),
      BusStop(name: 'Airport', time: '11:00 A.M.', passed: false),
    ],
  ),
  BusRouteModel(
    busNumber: '112',
    source: 'Center',
    destination: 'Tech Park',
    departureTime: '10:00 A.M.',
    arrivalTime: '11:30 A.M.',
    duration: '1h 30m',
    fare: 40.0,
    seatsLeft: 42,
    stops: const [
      BusStop(name: 'Center', time: '10:00 A.M.', passed: false),
      BusStop(name: 'Ring Road', time: '10:35 A.M.', passed: false),
      BusStop(name: 'Tech Park', time: '11:30 A.M.', passed: false),
    ],
  ),
];

// ==========================================
// 1. LANDING / WELCOME SCREEN
// ==========================================
class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 36.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              Column(
                children: [
                  Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      color: Theme.of(context).primaryColor.withOpacity(0.1),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      Icons.directions_bus_rounded,
                      size: 56,
                      color: Theme.of(context).primaryColor,
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'Bus Schedule App',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF1E293B),
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Your Journey, Our Priority',
                    style: TextStyle(
                      fontSize: 16,
                      color: Color(0xFF64748B),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
              Column(
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/login');
                      },
                      child: const Text('LOGIN'),
                    ),
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        side: BorderSide(color: Theme.of(context).primaryColor, width: 1.5),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      onPressed: () {
                        Navigator.pushNamed(context, '/register');
                      },
                      child: Text(
                        'REGISTER',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Theme.of(context).primaryColor,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 2. LOGIN SCREEN
// ==========================================
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController(text: 'satya@example.com');
  final _passwordController = TextEditingController(text: 'password123');
  bool _obscurePassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Welcome Back!',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
              ),
              const SizedBox(height: 6),
              const Text(
                'Login to Continue',
                style: TextStyle(fontSize: 15, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 32),
              TextField(
                controller: _emailController,
                decoration: const InputDecoration(
                  labelText: 'Email or Mobile Number',
                  prefixIcon: Icon(Icons.person_outline),
                ),
              ),
              const SizedBox(height: 18),
              TextField(
                controller: _passwordController,
                obscureText: _obscurePassword,
                decoration: InputDecoration(
                  labelText: 'Password',
                  prefixIcon: const Icon(Icons.lock_outline),
                  suffixIcon: IconButton(
                    icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                  ),
                ),
              ),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {},
                  child: const Text('Forgot Password?'),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pushReplacementNamed(context, '/home');
                  },
                  child: const Text('LOGIN'),
                ),
              ),
              const SizedBox(height: 28),
              Row(
                children: const [
                  Expanded(child: Divider()),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 12.0),
                    child: Text('or login with', style: TextStyle(color: Color(0xFF64748B))),
                  ),
                  Expanded(child: Divider()),
                ],
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _socialButton('G', Colors.red, () => Navigator.pushReplacementNamed(context, '/home')),
                  const SizedBox(width: 24),
                  _socialButton('F', const Color(0xFF1877F2), () => Navigator.pushReplacementNamed(context, '/home')),
                ],
              ),
              const SizedBox(height: 36),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Don't have account? "),
                  GestureDetector(
                    onTap: () => Navigator.pushReplacementNamed(context, '/register'),
                    child: Text(
                      'Register',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).primaryColor,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _socialButton(String label, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(25),
      child: Container(
        width: 50,
        height: 50,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: BorderSide(color: Colors.grey.shade300),
          color: Colors.white,
        ),
        child: Center(
          child: Text(
            label,
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: color),
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 3. REGISTER SCREEN
// ==========================================
class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  bool _obscurePassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Create Account',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
              ),
              const SizedBox(height: 6),
              const Text(
                'Register to get Started',
                style: TextStyle(fontSize: 15, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 28),
              const TextField(
                decoration: InputDecoration(
                  labelText: 'Full Name',
                  prefixIcon: Icon(Icons.badge_outlined),
                ),
              ),
              const SizedBox(height: 16),
              const TextField(
                decoration: InputDecoration(
                  labelText: 'Email',
                  prefixIcon: Icon(Icons.email_outlined),
                ),
              ),
              const SizedBox(height: 16),
              const TextField(
                keyboardType: TextInputType.phone,
                decoration: InputDecoration(
                  labelText: 'Mobile Number',
                  prefixIcon: Icon(Icons.phone_outlined),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                obscureText: _obscurePassword,
                decoration: InputDecoration(
                  labelText: 'Password',
                  prefixIcon: const Icon(Icons.lock_outline),
                  suffixIcon: IconButton(
                    icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                    onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                  ),
                ),
              ),
              const SizedBox(height: 28),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Registration successful! Please login.')),
                    );
                    Navigator.pushReplacementNamed(context, '/login');
                  },
                  child: const Text('REGISTER'),
                ),
              ),
              const SizedBox(height: 28),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Already have account? "),
                  GestureDetector(
                    onTap: () => Navigator.pushReplacementNamed(context, '/login'),
                    child: Text(
                      'Login',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).primaryColor,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 4. HOME SCREEN
// ==========================================
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: const [
            Icon(Icons.directions_bus, color: Colors.white, size: 24),
            SizedBox(width: 8),
            Text('Bus Schedule App'),
          ],
        ),
        actions: [
          IconButton(
            icon: const Badge(
              label: Text('2'),
              child: Icon(Icons.notifications_none),
            ),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Route 101 departure updated to Platform 3.')),
              );
            },
          ),
        ],
      ),
      body: _buildBody(),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        selectedItemColor: Theme.of(context).primaryColor,
        unselectedItemColor: const Color(0xFF64748B),
        type: BottomNavigationBarType.fixed,
        onTap: (index) => setState(() => _currentIndex = index),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined), activeIcon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.route_outlined), activeIcon: Icon(Icons.alt_route), label: 'Routes'),
          BottomNavigationBarItem(icon: Icon(Icons.confirmation_number_outlined), activeIcon: Icon(Icons.confirmation_number), label: 'Bookings'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), activeIcon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }

  Widget _buildBody() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Personalized Greeting
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Hello, Satya 👋',
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                  ),
                  Text(
                    'Where are you travelling today?',
                    style: TextStyle(fontSize: 14, color: Color(0xFF64748B)),
                  ),
                ],
              ),
              const CircleAvatar(
                radius: 20,
                backgroundColor: Color(0xFF1E3A8A),
                child: Text('S', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 20),

          // Search Bar
          GestureDetector(
            onTap: () => Navigator.pushNamed(context, '/search'),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFE2E8F0)),
                boxShadow: [
                  BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2)),
                ],
              ),
              child: Row(
                children: const [
                  Icon(Icons.search, color: Color(0xFF64748B)),
                  SizedBox(width: 12),
                  Text('Search Bus', style: TextStyle(fontSize: 15, color: Color(0xFF94A3B8))),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // 3-Column Category Quick Cards
          Row(
            children: [
              Expanded(
                child: _quickCard(
                  title: 'Bus Schedule',
                  icon: Icons.calendar_month_outlined,
                  color: const Color(0xFF1E3A8A),
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => BusScheduleScreen(
                        searchRoute: 'Center -> Railway Station',
                        searchDate: '05 July 2026',
                        routes: sampleRoutes,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _quickCard(
                  title: 'My Bookings',
                  icon: Icons.confirmation_number_outlined,
                  color: const Color(0xFF0D9488),
                  onTap: () => setState(() => _currentIndex = 2),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _quickCard(
                  title: 'Favourites',
                  icon: Icons.favorite_border,
                  color: const Color(0xFFE11D48),
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Favourites routes updated.')),
                    );
                  },
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Wide Card: Live Tracking
          Card(
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Tracking Bus #101 live GPS location (Near MG Road).')),
                );
              },
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: const Color(0xFF0D9488).withOpacity(0.12),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.location_on, color: Color(0xFF0D9488), size: 28),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Live Tracking', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                          SizedBox(height: 4),
                          Text('Real-time bus arrival & delay status', style: TextStyle(fontSize: 13, color: Color(0xFF64748B))),
                        ],
                      ),
                    ),
                    const Icon(Icons.chevron_right, color: Color(0xFF94A3B8)),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Section: Popular Routes
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Popular Routes', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              TextButton(
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => BusScheduleScreen(
                      searchRoute: 'Center -> Railway Station',
                      searchDate: '05 July 2026',
                      routes: sampleRoutes,
                    ),
                  ),
                ),
                child: const Text('View All'),
              ),
            ],
          ),
          const SizedBox(height: 8),

          // List of Popular Routes
          ...sampleRoutes.map((route) => Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  leading: CircleAvatar(
                    backgroundColor: const Color(0xFF1E3A8A).withOpacity(0.1),
                    child: Text(
                      route.busNumber,
                      style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1E3A8A)),
                    ),
                  ),
                  title: Text(
                    '\${route.busNumber} \${route.source} -> \${route.destination}',
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                  ),
                  subtitle: Text('\${route.departureTime} • \${route.duration} • ₹\${route.fare.toInt()}'),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 16, color: Color(0xFF94A3B8)),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => BusScheduleScreen(
                          searchRoute: '\${route.source} -> \${route.destination}',
                          searchDate: '05 July 2026',
                          routes: [route, ...sampleRoutes.where((r) => r.busNumber != route.busNumber)],
                        ),
                      ),
                    );
                  },
                ),
              )),
        ],
      ),
    );
  }

  Widget _quickCard({
    required String title,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: color, size: 24),
              ),
              const SizedBox(height: 8),
              Text(
                title,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF334155)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 5. SEARCH BUS SCREEN
// ==========================================
class SearchBusScreen extends StatefulWidget {
  const SearchBusScreen({super.key});

  @override
  State<SearchBusScreen> createState() => _SearchBusScreenState();
}

class _SearchBusScreenState extends State<SearchBusScreen> {
  final _sourceController = TextEditingController(text: 'Center');
  final _destController = TextEditingController(text: 'Railway Station');
  String _journeyDate = '05-07-2026';

  final List<Map<String, String>> _recentSearches = [
    {'source': 'Center', 'dest': 'Railway Station'},
    {'source': 'Airport', 'dest': 'Center'},
    {'source': 'Center', 'dest': 'Tech Park'},
  ];

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime(2026, 7, 5),
      firstDate: DateTime(2026, 1, 1),
      lastDate: DateTime(2027, 12, 31),
    );
    if (picked != null) {
      setState(() {
        _journeyDate = '\${picked.day.toString().padLeft(2, '0')}-\${picked.month.toString().padLeft(2, '0')}-\${picked.year}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SEARCH BUS'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      TextField(
                        controller: _sourceController,
                        decoration: const InputDecoration(
                          labelText: 'From (Source)',
                          prefixIcon: Icon(Icons.location_on, color: Color(0xFF1E3A8A)),
                        ),
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: _destController,
                        decoration: const InputDecoration(
                          labelText: 'To (Destination)',
                          prefixIcon: Icon(Icons.location_on, color: Color(0xFF0D9488)),
                        ),
                      ),
                      const SizedBox(height: 12),
                      InkWell(
                        onTap: () => _selectDate(context),
                        child: InputDecorator(
                          decoration: const InputDecoration(
                            labelText: 'Journey Date',
                            prefixIcon: Icon(Icons.calendar_today, color: Color(0xFF1E3A8A)),
                          ),
                          child: Text(_journeyDate, style: const TextStyle(fontSize: 15)),
                        ),
                      ),
                      const SizedBox(height: 20),
                      SizedBox(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => BusScheduleScreen(
                                  searchRoute: '\${_sourceController.text} -> \${_destController.text}',
                                  searchDate: _journeyDate,
                                  routes: sampleRoutes,
                                ),
                              ),
                            );
                          },
                          child: const Text('Search Buses'),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 28),
              const Text(
                'Recent Searches',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
              ),
              const SizedBox(height: 12),
              ..._recentSearches.map((item) => Card(
                    margin: const EdgeInsets.only(bottom: 8),
                    child: ListTile(
                      leading: const Icon(Icons.history, color: Color(0xFF64748B)),
                      title: Text('\${item['source']} -> \${item['dest']}'),
                      trailing: const Icon(Icons.arrow_forward_ios, size: 14),
                      onTap: () {
                        setState(() {
                          _sourceController.text = item['source']!;
                          _destController.text = item['dest']!;
                        });
                      },
                    ),
                  )),
            ],
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 6. BUS SCHEDULE SCREEN
// ==========================================
class BusScheduleScreen extends StatelessWidget {
  final String searchRoute;
  final String searchDate;
  final List<BusRouteModel> routes;

  const BusScheduleScreen({
    super.key,
    required this.searchRoute,
    required this.searchDate,
    required this.routes,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BUS SCHEDULE'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: const Color(0xFF1E3A8A).withOpacity(0.08),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      searchRoute,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Color(0xFF1E3A8A)),
                    ),
                    const SizedBox(height: 2),
                    Text(searchDate, style: const TextStyle(fontSize: 13, color: Color(0xFF64748B))),
                  ],
                ),
                Text(
                  '\${routes.length} buses found',
                  style: const TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF0D9488)),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: routes.length,
              itemBuilder: (context, index) {
                final route = routes[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 14),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(12),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => BusDetailsScreen(
                            route: route,
                            searchDate: searchDate,
                          ),
                        ),
                      );
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: const Color(0xFF1E3A8A),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  'Bus No. \${route.busNumber}',
                                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                                ),
                              ),
                              Text(
                                '₹\${route.fare.toInt()}',
                                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF0D9488)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 14),
                          Row(
                            children: [
                              Expanded(
                                child: Text(
                                  '\${route.departureTime} \${route.source}',
                                  style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                                ),
                              ),
                              const Padding(
                                padding: EdgeInsets.symmetric(horizontal: 8.0),
                                child: Icon(Icons.arrow_forward, size: 16, color: Color(0xFF64748B)),
                              ),
                              Expanded(
                                child: Text(
                                  '\${route.arrivalTime} \${route.destination}',
                                  textAlign: TextAlign.right,
                                  style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          const Divider(),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text('\${route.duration} duration', style: const TextStyle(fontSize: 12, color: Color(0xFF64748B))),
                              Text('\${route.seatsLeft} seats left', style: const TextStyle(fontSize: 12, color: Colors.green, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// ==========================================
// 7. BUS DETAILS SCREEN
// ==========================================
class BusDetailsScreen extends StatelessWidget {
  final BusRouteModel route;
  final String searchDate;

  const BusDetailsScreen({
    super.key,
    required this.route,
    required this.searchDate,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bus Details'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Details Header
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Bus No. \${route.busNumber}',
                                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF1E3A8A)),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: Colors.green.shade50,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: const Text('On Time', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold, fontSize: 12)),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '\${route.source} -> \${route.destination}',
                            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Departure: \${route.departureTime}  •  Arrival: \${route.arrivalTime}',
                            style: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Metrics Bar
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 14.0, horizontal: 8.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _metricItem('Total Time', route.duration),
                          Container(height: 36, width: 1, color: Colors.grey.shade300),
                          _metricItem('Fare', '₹\${route.fare.toInt()}'),
                          Container(height: 36, width: 1, color: Colors.grey.shade300),
                          _metricItem('Seats left', '\${route.seatsLeft}'),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Routes & Stops Timeline
                  const Text('Routes & Stops', style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 12),
                  ...List.generate(route.stops.length, (index) {
                    final stop = route.stops[index];
                    final isLast = index == route.stops.length - 1;
                    return Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Column(
                          children: [
                            Container(
                              width: 18,
                              height: 18,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: stop.passed ? const Color(0xFF1E3A8A) : Colors.white,
                                border: Border.all(color: const Color(0xFF1E3A8A), width: 2),
                              ),
                              child: stop.passed
                                  ? const Icon(Icons.check, size: 12, color: Colors.white)
                                  : null,
                            ),
                            if (!isLast)
                              Container(
                                width: 2,
                                height: 44,
                                color: const Color(0xFFCBD5E1),
                              ),
                          ],
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(stop.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                              Text(stop.time, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                              if (!isLast) const SizedBox(height: 24),
                            ],
                          ),
                        ),
                      ],
                    );
                  }),
                ],
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 10, offset: const Offset(0, -2)),
              ],
            ),
            child: SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => SelectSeatsScreen(
                        route: route,
                        searchDate: searchDate,
                      ),
                    ),
                  );
                },
                child: const Text('Book Now'),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _metricItem(String title, String value) {
    return Column(
      children: [
        Text(value, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF1E3A8A))),
        const SizedBox(height: 4),
        Text(title, style: const TextStyle(fontSize: 12, color: Color(0xFF64748B))),
      ],
    );
  }
}

// ==========================================
// 8. SELECT SEATS SCREEN
// ==========================================
class SelectSeatsScreen extends StatefulWidget {
  final BusRouteModel route;
  final String searchDate;

  const SelectSeatsScreen({
    super.key,
    required this.route,
    required this.searchDate,
  });

  @override
  State<SelectSeatsScreen> createState() => _SelectSeatsScreenState();
}

class _SelectSeatsScreenState extends State<SelectSeatsScreen> {
  final Set<int> _selectedSeats = {7, 20};
  final Set<int> _bookedSeats = {3, 4, 11, 12, 18};

  void _toggleSeat(int seatNumber) {
    if (_bookedSeats.contains(seatNumber)) return;
    setState(() {
      if (_selectedSeats.contains(seatNumber)) {
        _selectedSeats.remove(seatNumber);
      } else {
        _selectedSeats.add(seatNumber);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final double totalFare = _selectedSeats.length * widget.route.fare;
    final String selectedSeatsStr = _selectedSeats.isEmpty
        ? 'None'
        : (_selectedSeats.toList()..sort()).join(', ');

    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Seats'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          // Sub-header
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            color: const Color(0xFF1E3A8A).withOpacity(0.08),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Bus No. \${widget.route.busNumber}', style: const TextStyle(fontWeight: FontWeight.bold)),
                Text('\${widget.route.departureTime} -> \${widget.route.arrivalTime}', style: const TextStyle(color: Color(0xFF64748B))),
              ],
            ),
          ),

          // Legend Row
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 14.0, horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _legendItem('Available', Colors.white, Colors.grey.shade600, false),
                _legendItem('Booked', Colors.grey.shade400, Colors.grey.shade400, false),
                _legendItem('Selected', const Color(0xFF0D9488), const Color(0xFF0D9488), true),
              ],
            ),
          ),
          const Divider(),

          // 5-Column Grid Seat Layout (1 to 25)
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              child: Column(
                children: [
                  // Driver wheel icon
                  Align(
                    alignment: Alignment.centerRight,
                    child: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.grey.shade200,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.airline_seat_recline_extra, size: 22, color: Colors.grey),
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Seats Grid 5 columns
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 5,
                      mainAxisSpacing: 10,
                      crossAxisSpacing: 10,
                      childAspectRatio: 1.0,
                    ),
                    itemCount: 25,
                    itemBuilder: (context, index) {
                      final int seatNo = index + 1;
                      final bool isBooked = _bookedSeats.contains(seatNo);
                      final bool isSelected = _selectedSeats.contains(seatNo);

                      Color bgColor = Colors.white;
                      Color borderColor = Colors.grey.shade400;
                      Color textColor = Colors.black87;

                      if (isBooked) {
                        bgColor = Colors.grey.shade400;
                        borderColor = Colors.grey.shade400;
                        textColor = Colors.white;
                      } else if (isSelected) {
                        bgColor = const Color(0xFF0D9488);
                        borderColor = const Color(0xFF0D9488);
                        textColor = Colors.white;
                      }

                      return InkWell(
                        onTap: () => _toggleSeat(seatNo),
                        borderRadius: BorderRadius.circular(8),
                        child: Container(
                          decoration: BoxDecoration(
                            color: bgColor,
                            border: Border.all(color: borderColor, width: 1.5),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Center(
                            child: Text(
                              '\$seatNo',
                              style: TextStyle(fontWeight: FontWeight.bold, color: textColor),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),

          // Summary Footer
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 8, offset: const Offset(0, -2)),
              ],
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Selected Seats: \$selectedSeatsStr',
                      style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                    ),
                    Text(
                      'Fare: ₹\${totalFare.toInt()}',
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF1E3A8A)),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    onPressed: _selectedSeats.isEmpty
                        ? null
                        : () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => BookingConfirmationScreen(
                                  route: widget.route,
                                  selectedSeats: _selectedSeats.toList()..sort(),
                                  totalFare: totalFare,
                                  date: widget.searchDate,
                                ),
                              ),
                            );
                          },
                    child: const Text('Proceed to Pay'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _legendItem(String label, Color fill, Color border, bool isSelected) {
    return Row(
      children: [
        Container(
          width: 20,
          height: 20,
          decoration: BoxDecoration(
            color: fill,
            border: Border.all(color: border, width: 1.5),
            borderRadius: BorderRadius.circular(4),
          ),
          child: isSelected ? const Icon(Icons.check, size: 14, color: Colors.white) : null,
        ),
        const SizedBox(width: 6),
        Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
      ],
    );
  }
}

// ==========================================
// 9. BOOKING CONFIRMATION SCREEN
// ==========================================
class BookingConfirmationScreen extends StatelessWidget {
  final BusRouteModel route;
  final List<int> selectedSeats;
  final double totalFare;
  final String date;

  const BookingConfirmationScreen({
    super.key,
    required this.route,
    required this.selectedSeats,
    required this.totalFare,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    const String bookingId = 'BK10124052401';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Booking Confirmation'),
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 10),
              // Success Badge
              Container(
                width: 72,
                height: 72,
                decoration: const BoxDecoration(
                  color: Color(0xFFDCFCE7),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.check_circle, color: Color(0xFF16A34A), size: 48),
              ),
              const SizedBox(height: 16),
              const Text(
                'Booking Confirmed!',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
              ),
              const SizedBox(height: 6),
              const Text(
                'Your ticket has been booked successfully.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 14, color: Color(0xFF64748B)),
              ),
              const SizedBox(height: 24),

              // Summary Ticket Card
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Bus No. \${route.busNumber}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: const Color(0xFF1E3A8A).withOpacity(0.1),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              bookingId,
                              style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1E3A8A), fontSize: 12),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      const Divider(),
                      const SizedBox(height: 8),
                      _ticketRow('Route', '\${route.source} -> \${route.destination}'),
                      const SizedBox(height: 8),
                      _ticketRow('Date & Time', '\$date, \${route.departureTime}'),
                      const SizedBox(height: 8),
                      _ticketRow('Seats Booked', selectedSeats.join(', ')),
                      const SizedBox(height: 8),
                      _ticketRow('Total Fare', '₹\${totalFare.toInt()}', isBold: true),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 32),

              // Action Buttons
              SizedBox(
                width: double.infinity,
                height: 50,
                child: OutlinedButton.icon(
                  icon: const Icon(Icons.download),
                  label: const Text('DOWNLOAD TICKET'),
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: Color(0xFF1E3A8A)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Ticket saved to downloads! (Booking: BK10124052401)')),
                    );
                  },
                ),
              ),
              const SizedBox(height: 14),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
                  },
                  child: const Text('DONE'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _ticketRow(String label, String value, {bool isBold = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: Color(0xFF64748B), fontSize: 14)),
        Text(
          value,
          style: TextStyle(
            fontWeight: isBold ? FontWeight.bold : FontWeight.w600,
            fontSize: isBold ? 16 : 14,
            color: isBold ? const Color(0xFF1E3A8A) : const Color(0xFF0F172A),
          ),
        ),
      ],
    );
  }
}
`;
