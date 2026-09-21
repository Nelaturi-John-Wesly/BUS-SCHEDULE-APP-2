import 'package:flutter/material.dart';

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
          seedColor: const Color(0xFF3F51B5), // Indigo
          primary: const Color(0xFF3F51B5),
          secondary: const Color(0xFF009688), // Teal accent
          surface: const Color(0xFFF8FAFC),
        ),
        cardTheme: CardThemeData(
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

class BookingRecord {
  final String bookingId;
  final BusInfo bus;
  final List<int> seats;
  final int totalFare;
  final String journeyDate;
  final DateTime bookedAt;

  BookingRecord({
    required this.bookingId,
    required this.bus,
    required this.seats,
    required this.totalFare,
    required this.journeyDate,
    required this.bookedAt,
  });
}

// ==========================================
// USER PROFILE & BACKEND AUTH SERVICE
// ==========================================

class UserProfile {
  final String id;
  String username;
  final String email;
  final String phone;
  final String password;
  final DateTime memberSince;

  UserProfile({
    required this.id,
    required this.username,
    required this.email,
    required this.phone,
    required this.password,
    required this.memberSince,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'username': username,
    'email': email,
    'phone': phone,
    'memberSince': memberSince.toIso8601String(),
  };
}

class AuthBackendService {
  static final AuthBackendService instance = AuthBackendService._();
  AuthBackendService._();

  // Simulated backend database records
  final List<UserProfile> _users = [
    UserProfile(
      id: 'USR-8921',
      username: 'Satya',
      email: 'satya@example.com',
      phone: '+91 98765 43210',
      password: 'password123',
      memberSince: DateTime(2025, 2, 10),
    ),
    UserProfile(
      id: 'USR-8922',
      username: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 91234 56789',
      password: 'password123',
      memberSince: DateTime(2025, 4, 1),
    ),
  ];

  UserProfile? _currentUser;
  bool _isSignedIn = false;

  UserProfile? get currentUser => _currentUser;
  bool get isSignedIn => _isSignedIn;
  List<UserProfile> get registeredUsers => List.unmodifiable(_users);

  // Backend session check: checks whether client has an active recognized authenticated session
  Future<Map<String, dynamic>> checkSessionStatus() async {
    await Future.delayed(const Duration(milliseconds: 300));
    if (_isSignedIn && _currentUser != null) {
      return {
        'status': 'authenticated',
        'isSignedIn': true,
        'user': _currentUser,
        'message': 'Active session recognized on backend server for ${_currentUser!.username}',
      };
    }
    return {
      'status': 'unauthenticated',
      'isSignedIn': false,
      'user': null,
      'message': 'Backend server ready • No active session detected',
    };
  }

  // Backend login verification
  Future<Map<String, dynamic>> login(String emailOrMobile, String password) async {
    await Future.delayed(const Duration(milliseconds: 400));
    final query = emailOrMobile.trim().toLowerCase();

    final matchIndex = _users.indexWhere(
      (u) => (u.email.toLowerCase() == query || u.phone.toLowerCase() == query) && u.password == password,
    );

    if (matchIndex == -1) {
      return {
        'success': false,
        'message': 'Invalid credentials. Please verify your email/mobile and password.',
      };
    }

    _currentUser = _users[matchIndex];
    _isSignedIn = true;
    AppState.instance.userName = _currentUser!.username;

    return {
      'success': true,
      'user': _currentUser,
      'message': 'Successfully signed in as ${_currentUser!.username}!',
    };
  }

  // Backend registration
  Future<Map<String, dynamic>> register({
    required String fullName,
    required String email,
    required String phone,
    required String password,
  }) async {
    await Future.delayed(const Duration(milliseconds: 400));
    final trimmedEmail = email.trim().toLowerCase();

    final exists = _users.any((u) => u.email.toLowerCase() == trimmedEmail);
    if (exists) {
      return {
        'success': false,
        'message': 'An account with this email already exists on the backend server.',
      };
    }

    final newUser = UserProfile(
      id: 'USR-${9000 + _users.length + 1}',
      username: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password,
      memberSince: DateTime.now(),
    );

    _users.add(newUser);
    _currentUser = newUser;
    _isSignedIn = true;
    AppState.instance.userName = newUser.username;

    return {
      'success': true,
      'user': newUser,
      'message': 'Account registered and recognized on backend server!',
    };
  }

  // Backend update profile username
  Future<Map<String, dynamic>> updateUsername(String newUsername) async {
    await Future.delayed(const Duration(milliseconds: 300));
    final trimmed = newUsername.trim();
    if (trimmed.isEmpty) {
      return {
        'success': false,
        'message': 'Username cannot be empty.',
      };
    }
    if (trimmed.length < 2) {
      return {
        'success': false,
        'message': 'Username must be at least 2 characters long.',
      };
    }

    if (_currentUser != null) {
      _currentUser!.username = trimmed;
    }
    AppState.instance.userName = trimmed;

    return {
      'success': true,
      'username': trimmed,
      'message': 'Username updated successfully to "$trimmed" on backend server!',
    };
  }

  // Backend sign out
  Future<void> signOut() async {
    await Future.delayed(const Duration(milliseconds: 200));
    _isSignedIn = false;
    _currentUser = null;
  }
}

// Global App State simulation
class AppState {
  static final AppState instance = AppState._();
  AppState._();

  String _rawUserName = "Satya";

  String get userName {
    if (AuthBackendService.instance.currentUser != null) {
      return AuthBackendService.instance.currentUser!.username;
    }
    return _rawUserName;
  }

  set userName(String value) {
    _rawUserName = value;
    if (AuthBackendService.instance.currentUser != null) {
      AuthBackendService.instance.currentUser!.username = value;
    }
  }

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

  final List<BookingRecord> bookings = [];
}

// ==========================================
// 1. LANDING / WELCOME SCREEN
// ==========================================

class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(),
              // App Icon / Graphic
              Center(
                child: Container(
                  width: 110,
                  height: 110,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary.withOpacity(0.12),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.directions_bus_rounded,
                    size: 64,
                    color: theme.colorScheme.primary,
                  ),
                ),
              ),
              const SizedBox(height: 32),
              // App Title
              Text(
                'Bus Schedule App',
                textAlign: TextAlign.center,
                style: theme.textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF1E293B),
                ),
              ),
              const SizedBox(height: 12),
              // Tagline
              Text(
                'Your Journey, Our Priority',
                textAlign: TextAlign.center,
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: const Color(0xFF64748B),
                  letterSpacing: 0.3,
                ),
              ),
              const Spacer(),
              // Login Button
              ElevatedButton(
                onPressed: () => Navigator.pushNamed(context, '/login'),
                child: const Text('LOGIN'),
              ),
              const SizedBox(height: 16),
              // Register Button (Outlined)
              OutlinedButton(
                onPressed: () => Navigator.pushNamed(context, '/register'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  side: BorderSide(color: theme.colorScheme.primary, width: 2),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: Text(
                  'REGISTER',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: theme.colorScheme.primary,
                  ),
                ),
              ),
              const SizedBox(height: 16),
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
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController(text: 'satya@example.com');
  final _passwordController = TextEditingController(text: 'password123');
  bool _obscurePassword = true;
  bool _isCheckingSession = true;
  bool _isLoggingIn = false;
  UserProfile? _recognizedUser;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _checkActiveBackendSession();
  }

  Future<void> _checkActiveBackendSession() async {
    setState(() {
      _isCheckingSession = true;
      _errorMessage = null;
    });
    final status = await AuthBackendService.instance.checkSessionStatus();
    if (mounted) {
      setState(() {
        _isCheckingSession = false;
        if (status['isSignedIn'] == true && status['user'] is UserProfile) {
          _recognizedUser = status['user'] as UserProfile;
        } else {
          _recognizedUser = null;
        }
      });
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    if (_formKey.currentState?.validate() ?? false) {
      setState(() {
        _isLoggingIn = true;
        _errorMessage = null;
      });

      final result = await AuthBackendService.instance.login(
        _emailController.text,
        _passwordController.text,
      );

      if (!mounted) return;

      setState(() {
        _isLoggingIn = false;
      });

      if (result['success'] == true) {
        final user = result['user'] as UserProfile?;
        final userName = user?.username ?? 'Satya';
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: const Color(0xFF0D9488),
            content: Row(
              children: [
                const Icon(Icons.check_circle, color: Colors.white),
                const SizedBox(width: 8),
                Expanded(
                  child: Text('Welcome, $userName! Session recognized on backend server.'),
                ),
              ],
            ),
          ),
        );
        Navigator.pushReplacementNamed(context, '/home');
      } else {
        setState(() {
          _errorMessage = result['message'] as String? ?? 'Login failed. Please verify credentials.';
        });
      }
    }
  }

  void _quickFillUser(String email, String password) {
    setState(() {
      _emailController.text = email;
      _passwordController.text = password;
      _errorMessage = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1E293B)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 12.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  'Welcome Back!',
                  style: theme.textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFF1E293B),
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Login to access bus bookings and schedules',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF64748B),
                  ),
                ),
                const SizedBox(height: 20),

                // Backend Session Recognition Indicator
                if (_isCheckingSession)
                  Container(
                    margin: const EdgeInsets.only(bottom: 20),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: const Color(0xFFCBD5E1)),
                    ),
                    child: const Row(
                      children: [
                        SizedBox(
                          width: 14,
                          height: 14,
                          child: CircularProgressIndicator(strokeWidth: 2, color: Color(0xFF3F51B5)),
                        ),
                        SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            'Connecting to backend server & checking active session...',
                            style: TextStyle(fontSize: 12, color: Color(0xFF475569)),
                          ),
                        ),
                      ],
                    ),
                  )
                else if (_recognizedUser != null)
                  Container(
                    margin: const EdgeInsets.only(bottom: 22),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF0FDF4),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: const Color(0xFF86EFAC)),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF16A34A).withOpacity(0.08),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: const Color(0xFFDCFCE7),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Icon(
                                Icons.verified_user,
                                color: Color(0xFF16A34A),
                                size: 20,
                              ),
                            ),
                            const SizedBox(width: 10),
                            const Expanded(
                              child: Text(
                                'Active Backend Session Recognized',
                                style: TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF15803D),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'You are recognized as ${_recognizedUser!.username} (${_recognizedUser!.email}).',
                          style: const TextStyle(fontSize: 13, color: Color(0xFF166534)),
                        ),
                        const SizedBox(height: 12),
                        ElevatedButton.icon(
                          onPressed: () {
                            AppState.instance.userName = _recognizedUser!.username;
                            Navigator.pushReplacementNamed(context, '/home');
                          },
                          icon: const Icon(Icons.arrow_forward, size: 18),
                          label: Text('CONTINUE AS ${_recognizedUser!.username.toUpperCase()}'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF16A34A),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                        ),
                        const SizedBox(height: 6),
                        TextButton(
                          onPressed: () {
                            AuthBackendService.instance.signOut();
                            setState(() {
                              _recognizedUser = null;
                            });
                          },
                          style: TextButton.styleFrom(
                            visualDensity: VisualDensity.compact,
                            foregroundColor: const Color(0xFF475569),
                          ),
                          child: const Text(
                            'Switch Account / Log in as another user',
                            style: TextStyle(fontSize: 12, decoration: TextDecoration.underline),
                          ),
                        ),
                      ],
                    ),
                  )
                else
                  Container(
                    margin: const EdgeInsets.only(bottom: 20),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFEFF6FF),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: const Color(0xFFBFDBFE)),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.cloud_done_outlined, color: Color(0xFF2563EB), size: 18),
                        SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            'Backend Server Connected • No active session detected',
                            style: TextStyle(fontSize: 12, color: Color(0xFF1E40AF), fontWeight: FontWeight.w500),
                          ),
                        ),
                      ],
                    ),
                  ),

                // Error message banner
                if (_errorMessage != null)
                  Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFEF2F2),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: const Color(0xFFFECACA)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.error_outline, color: Color(0xFFDC2626), size: 20),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Text(
                            _errorMessage!,
                            style: const TextStyle(color: Color(0xFF991B1B), fontSize: 13),
                          ),
                        ),
                      ],
                    ),
                  ),

                // Email or Mobile field
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    labelText: 'Email or Mobile Number',
                    hintText: 'satya@example.com',
                    prefixIcon: Icon(Icons.person_outline),
                  ),
                  validator: (value) =>
                      (value == null || value.trim().isEmpty) ? 'Please enter email or mobile' : null,
                ),
                const SizedBox(height: 18),

                // Password field
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    prefixIcon: const Icon(Icons.lock_outline),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword ? Icons.visibility_off : Icons.visibility,
                        color: const Color(0xFF64748B),
                      ),
                      onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                    ),
                  ),
                  validator: (value) =>
                      (value == null || value.length < 6) ? 'Password must be at least 6 characters' : null,
                ),
                const SizedBox(height: 8),

                // Quick Demo User Selector Chips
                Row(
                  children: [
                    const Text('Demo credentials: ', style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
                    InkWell(
                      onTap: () => _quickFillUser('satya@example.com', 'password123'),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFFEEF2FF),
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(color: const Color(0xFFC7D2FE)),
                        ),
                        child: const Text('Satya', style: TextStyle(fontSize: 11, color: Color(0xFF3730A3), fontWeight: FontWeight.bold)),
                      ),
                    ),
                    const SizedBox(width: 6),
                    InkWell(
                      onTap: () => _quickFillUser('rahul@example.com', 'password123'),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFFEEF2FF),
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(color: const Color(0xFFC7D2FE)),
                        ),
                        child: const Text('Rahul', style: TextStyle(fontSize: 11, color: Color(0xFF3730A3), fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),

                // Forgot Password link
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Password reset link sent to your email.')),
                      );
                    },
                    child: Text(
                      'Forgot Password?',
                      style: TextStyle(color: theme.colorScheme.primary, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Login Button
                ElevatedButton(
                  onPressed: _isLoggingIn ? null : _handleLogin,
                  child: _isLoggingIn
                      ? const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                            ),
                            SizedBox(width: 12),
                            Text('CONNECTING TO BACKEND...'),
                          ],
                        )
                      : const Text('LOGIN'),
                ),
                const SizedBox(height: 28),

                // Social Divider
                Row(
                  children: [
                    const Expanded(child: Divider(color: Color(0xFFE2E8F0))),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Text(
                        'or login with',
                        style: TextStyle(color: const Color(0xFF94A3B8), fontSize: 13),
                      ),
                    ),
                    const Expanded(child: Divider(color: Color(0xFFE2E8F0))),
                  ],
                ),
                const SizedBox(height: 20),

                // Social Buttons
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _socialButton(
                      label: 'G',
                      color: const Color(0xFFEA4335),
                      onTap: () {
                        AuthBackendService.instance.login('satya@example.com', 'password123');
                        Navigator.pushReplacementNamed(context, '/home');
                      },
                    ),
                    const SizedBox(width: 20),
                    _socialButton(
                      label: 'F',
                      color: const Color(0xFF1877F2),
                      onTap: () {
                        AuthBackendService.instance.login('satya@example.com', 'password123');
                        Navigator.pushReplacementNamed(context, '/home');
                      },
                    ),
                  ],
                ),
                const SizedBox(height: 36),

                // Footer
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      "Don't have account? ",
                      style: TextStyle(color: Color(0xFF64748B)),
                    ),
                    GestureDetector(
                      onTap: () => Navigator.pushReplacementNamed(context, '/register'),
                      child: Text(
                        'Register',
                        style: TextStyle(
                          color: theme.colorScheme.primary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _socialButton({required String label, required Color color, required VoidCallback onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        width: 52,
        height: 52,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFFE2E8F0)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 6,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        alignment: Alignment.center,
        child: Text(
          label,
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color),
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
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _mobileController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _mobileController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  bool _isRegistering = false;

  Future<void> _handleRegister() async {
    if (_formKey.currentState?.validate() ?? false) {
      setState(() => _isRegistering = true);
      final res = await AuthBackendService.instance.register(
        fullName: _nameController.text.trim(),
        email: _emailController.text.trim(),
        phone: _mobileController.text.trim(),
        password: _passwordController.text,
      );
      if (!mounted) return;
      setState(() => _isRegistering = false);

      if (res['success'] == true) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: const Color(0xFF0D9488),
            content: Row(
              children: [
                const Icon(Icons.check_circle, color: Colors.white),
                const SizedBox(width: 8),
                Expanded(child: Text(res['message'] as String? ?? 'Account created and recognized!')),
              ],
            ),
          ),
        );
        Navigator.pushReplacementNamed(context, '/home');
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: const Color(0xFFDC2626),
            content: Text(res['message'] as String? ?? 'Registration failed'),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1E293B)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 12.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  'Create Account',
                  style: theme.textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFF1E293B),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Register to get Started',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF64748B),
                  ),
                ),
                const SizedBox(height: 28),
                // Full Name
                TextFormField(
                  controller: _nameController,
                  decoration: const InputDecoration(
                    labelText: 'Full Name',
                    prefixIcon: Icon(Icons.badge_outlined),
                  ),
                  validator: (val) =>
                      (val == null || val.trim().isEmpty) ? 'Please enter your full name' : null,
                ),
                const SizedBox(height: 16),
                // Email
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    labelText: 'Email',
                    prefixIcon: Icon(Icons.email_outlined),
                  ),
                  validator: (val) =>
                      (val == null || !val.contains('@')) ? 'Please enter a valid email' : null,
                ),
                const SizedBox(height: 16),
                // Mobile Number
                TextFormField(
                  controller: _mobileController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    labelText: 'Mobile Number',
                    prefixIcon: Icon(Icons.phone_iphone_outlined),
                  ),
                  validator: (val) =>
                      (val == null || val.length < 10) ? 'Enter a 10-digit mobile number' : null,
                ),
                const SizedBox(height: 16),
                // Password
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    labelText: 'Password',
                    prefixIcon: const Icon(Icons.lock_outline),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword ? Icons.visibility_off : Icons.visibility,
                        color: const Color(0xFF64748B),
                      ),
                      onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                    ),
                  ),
                  validator: (val) =>
                      (val == null || val.length < 6) ? 'Password must be at least 6 characters' : null,
                ),
                const SizedBox(height: 28),
                // Primary Register Button
                ElevatedButton(
                  onPressed: _isRegistering ? null : _handleRegister,
                  child: _isRegistering
                      ? const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                            ),
                            SizedBox(width: 12),
                            Text('CREATING ACCOUNT...'),
                          ],
                        )
                      : const Text('REGISTER'),
                ),
                const SizedBox(height: 28),
                // Footer
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Already have account? ',
                      style: TextStyle(color: Color(0xFF64748B)),
                    ),
                    GestureDetector(
                      onTap: () => Navigator.pushReplacementNamed(context, '/login'),
                      child: Text(
                        'Login',
                        style: TextStyle(
                          color: theme.colorScheme.primary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
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
  int _currentNavIndex = 0;

  void _showEditUsernameDialog() {
    final currentName = AppState.instance.userName;
    final controller = TextEditingController(text: currentName);
    final formKey = GlobalKey<FormState>();
    bool isSaving = false;

    showDialog(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: const Color(0xFFEEF2FF),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(Icons.edit, color: Color(0xFF3F51B5), size: 20),
              ),
              const SizedBox(width: 12),
              const Text('Edit Username', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ],
          ),
          content: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Your profile username is recognized by the backend server and displayed across your bookings.',
                  style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: controller,
                  autofocus: true,
                  decoration: InputDecoration(
                    labelText: 'Username',
                    hintText: 'Enter new username',
                    prefixIcon: const Icon(Icons.person_outline),
                    filled: true,
                    fillColor: const Color(0xFFF8FAFC),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  validator: (value) {
                    if (value == null || value.trim().isEmpty) {
                      return 'Username cannot be empty';
                    }
                    if (value.trim().length < 2) {
                      return 'Must be at least 2 characters';
                    }
                    return null;
                  },
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: isSaving ? null : () => Navigator.pop(dialogContext),
              child: const Text('CANCEL', style: TextStyle(color: Color(0xFF64748B))),
            ),
            ElevatedButton(
              onPressed: isSaving
                  ? null
                  : () async {
                      if (formKey.currentState?.validate() ?? false) {
                        setDialogState(() => isSaving = true);
                        final newName = controller.text.trim();
                        final res = await AuthBackendService.instance.updateUsername(newName);
                        if (mounted) {
                          setState(() {});
                          Navigator.pop(dialogContext);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              backgroundColor: const Color(0xFF0D9488),
                              content: Row(
                                children: [
                                  const Icon(Icons.check_circle, color: Colors.white),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(res['message'] as String? ?? 'Username updated!'),
                                  ),
                                ],
                              ),
                            ),
                          );
                        }
                      }
                    },
              child: isSaving
                  ? const SizedBox(
                      width: 16,
                      height: 16,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                    )
                  : const Text('SAVE CHANGES'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = AppState.instance;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        automaticallyImplyLeading: false,
        title: Row(
          children: [
            InkWell(
              onTap: _showEditUsernameDialog,
              borderRadius: BorderRadius.circular(20),
              child: Stack(
                children: [
                  CircleAvatar(
                    radius: 20,
                    backgroundColor: theme.colorScheme.primary.withOpacity(0.15),
                    child: Icon(Icons.person, color: theme.colorScheme.primary),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      decoration: const BoxDecoration(
                        color: Color(0xFF3F51B5),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.edit, size: 10, color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  InkWell(
                    onTap: _showEditUsernameDialog,
                    borderRadius: BorderRadius.circular(6),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Flexible(
                          child: Text(
                            'Hello, ${appState.userName}',
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF1E293B),
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        const SizedBox(width: 6),
                        Container(
                          padding: const EdgeInsets.all(3),
                          decoration: BoxDecoration(
                            color: const Color(0xFFEEF2FF),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: const Icon(Icons.edit_outlined, size: 13, color: Color(0xFF3F51B5)),
                        ),
                      ],
                    ),
                  ),
                  const Text(
                    'Where are you traveling today?',
                    style: TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none, color: Color(0xFF1E293B)),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('No new notifications right now.')),
              );
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: _currentNavIndex == 3
          ? _buildProfileView(context)
          : SingleChildScrollView(
              padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search Bus input box
            InkWell(
              onTap: () => Navigator.pushNamed(context, '/search'),
              borderRadius: BorderRadius.circular(12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.04),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: const Row(
                  children: [
                    Icon(Icons.search, color: Color(0xFF3F51B5)),
                    SizedBox(width: 12),
                    Text(
                      'Search Bus (Source, Destination)...',
                      style: TextStyle(color: Color(0xFF94A3B8), fontSize: 15),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Grid/Category Quick Cards (3-column grid)
            Row(
              children: [
                Expanded(
                  child: _categoryCard(
                    title: 'Bus Schedule',
                    icon: Icons.calendar_month_outlined,
                    color: const Color(0xFF3F51B5),
                    onTap: () => Navigator.pushNamed(context, '/schedule'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _categoryCard(
                    title: 'My Bookings',
                    icon: Icons.confirmation_number_outlined,
                    color: const Color(0xFF009688),
                    onTap: () {
                      setState(() => _currentNavIndex = 2);
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _categoryCard(
                    title: 'Favourites',
                    icon: Icons.favorite_border_rounded,
                    color: const Color(0xFFF59E0B),
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Favourites saved for quick access!')),
                      );
                    },
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Wide card for "Live Tracking" with location icon
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              color: Colors.white,
              child: InkWell(
                onTap: () => _showLiveTrackingSheet(context),
                borderRadius: BorderRadius.circular(12),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF009688).withOpacity(0.12),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.my_location_rounded,
                          color: Color(0xFF009688),
                          size: 28,
                        ),
                      ),
                      const SizedBox(width: 16),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Live Tracking',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF1E293B),
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              'Track real-time bus location & estimated arrival',
                              style: TextStyle(fontSize: 13, color: Color(0xFF64748B)),
                            ),
                          ],
                        ),
                      ),
                      const Icon(Icons.arrow_forward_ios, size: 16, color: Color(0xFF94A3B8)),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 28),

            // Section: Popular Routes
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Popular Routes',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF1E293B),
                  ),
                ),
                TextButton(
                  onPressed: () => Navigator.pushNamed(context, '/schedule'),
                  child: const Text('View All'),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Popular Route Cards
            _routeCard(
              busNo: '101',
              title: '101 Center -> Railway Station',
              timing: '8:30 AM • 45 Seats Available',
              fare: '₹35',
              onTap: () {
                appState.selectedBus = appState.sampleBuses[0];
                Navigator.pushNamed(context, '/schedule');
              },
            ),
            const SizedBox(height: 12),
            _routeCard(
              busNo: '105',
              title: '105 Center -> Airport',
              timing: '9:15 AM • 38 Seats Available',
              fare: '₹40',
              onTap: () {
                appState.selectedBus = appState.sampleBuses[1];
                Navigator.pushNamed(context, '/schedule');
              },
            ),
            const SizedBox(height: 12),
            _routeCard(
              busNo: '112',
              title: '112 Center -> Tech Park',
              timing: '10:45 AM • 29 Seats Available',
              fare: '₹35',
              onTap: () {
                appState.selectedBus = appState.sampleBuses[2];
                Navigator.pushNamed(context, '/schedule');
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentNavIndex,
        onDestinationSelected: (index) {
          if (index == 1) {
            Navigator.pushNamed(context, '/search');
          } else if (index == 2) {
            _showBookingsSheet(context);
          } else {
            setState(() => _currentNavIndex = index);
          }
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.alt_route_outlined),
            selectedIcon: Icon(Icons.alt_route),
            label: 'Routes',
          ),
          NavigationDestination(
            icon: Icon(Icons.confirmation_number_outlined),
            selectedIcon: Icon(Icons.confirmation_number),
            label: 'Bookings',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }

  Widget _buildProfileView(BuildContext context) {
    final appState = AppState.instance;
    final currentUser = AuthBackendService.instance.currentUser;
    final email = currentUser?.email ?? 'satya@example.com';
    final phone = currentUser?.phone ?? '+91 98765 43210';
    final userId = currentUser?.id ?? 'USR-8921';

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Profile Header Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFE2E8F0)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.04),
                  blurRadius: 10,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Column(
              children: [
                Stack(
                  children: [
                    CircleAvatar(
                      radius: 38,
                      backgroundColor: const Color(0xFFEEF2FF),
                      child: Text(
                        appState.userName.isNotEmpty ? appState.userName[0].toUpperCase() : 'U',
                        style: const TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF3F51B5),
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: InkWell(
                        onTap: _showEditUsernameDialog,
                        child: Container(
                          padding: const EdgeInsets.all(6),
                          decoration: const BoxDecoration(
                            color: Color(0xFF3F51B5),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.edit, size: 14, color: Colors.white),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Flexible(
                      child: Text(
                        appState.userName,
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1E293B),
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton(
                      icon: const Icon(Icons.edit, size: 18, color: Color(0xFF3F51B5)),
                      onPressed: _showEditUsernameDialog,
                      tooltip: 'Edit Username',
                      visualDensity: VisualDensity.compact,
                    ),
                  ],
                ),
                Text(
                  email,
                  style: const TextStyle(fontSize: 14, color: Color(0xFF64748B)),
                ),
                const SizedBox(height: 4),
                Text(
                  phone,
                  style: const TextStyle(fontSize: 13, color: Color(0xFF94A3B8)),
                ),
                const SizedBox(height: 14),
                // Edit Username Action Button
                OutlinedButton.icon(
                  onPressed: _showEditUsernameDialog,
                  icon: const Icon(Icons.badge_outlined, size: 18),
                  label: const Text('EDIT USERNAME'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: const Color(0xFF3F51B5),
                    side: const BorderSide(color: Color(0xFF3F51B5)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Backend Server Status & Session Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFFF0FDF4),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: const Color(0xFF86EFAC)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      width: 10,
                      height: 10,
                      decoration: const BoxDecoration(
                        color: Color(0xFF16A34A),
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Text(
                      'Backend Server: Connected & Authenticated',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF15803D),
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'User ID: $userId • Session: Active & Recognized',
                  style: const TextStyle(fontSize: 12, color: Color(0xFF166534)),
                ),
                const SizedBox(height: 4),
                const Text(
                  'All profile updates and username edits are sent directly to the backend authentication system.',
                  style: TextStyle(fontSize: 11, color: Color(0xFF15803D)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Passenger Statistics
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _profileStatItem('Trips Booked', '${appState.bookings.length + 3}'),
                Container(height: 36, width: 1, color: const Color(0xFFE2E8F0)),
                _profileStatItem('Wallet Balance', '₹450'),
                Container(height: 36, width: 1, color: const Color(0xFFE2E8F0)),
                _profileStatItem('Tier', 'Gold Pass'),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Account Options
          Card(
            elevation: 0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(14),
              side: const BorderSide(color: Color(0xFFE2E8F0)),
            ),
            color: Colors.white,
            child: Column(
              children: [
                ListTile(
                  leading: const Icon(Icons.person_pin_outlined, color: Color(0xFF3F51B5)),
                  title: const Text('Edit Profile Username'),
                  subtitle: Text('Current: ${appState.userName}'),
                  trailing: const Icon(Icons.chevron_right, color: Color(0xFF94A3B8)),
                  onTap: _showEditUsernameDialog,
                ),
                const Divider(height: 1, indent: 56),
                ListTile(
                  leading: const Icon(Icons.confirmation_number_outlined, color: Color(0xFF0D9488)),
                  title: const Text('My Bookings & Tickets'),
                  subtitle: Text('${appState.bookings.length} active ticket(s)'),
                  trailing: const Icon(Icons.chevron_right, color: Color(0xFF94A3B8)),
                  onTap: () => _showBookingsSheet(context),
                ),
                const Divider(height: 1, indent: 56),
                ListTile(
                  leading: const Icon(Icons.notifications_active_outlined, color: Color(0xFFF59E0B)),
                  title: const Text('Trip Notifications'),
                  subtitle: const Text('SMS & In-app alerts enabled'),
                  trailing: const Icon(Icons.chevron_right, color: Color(0xFF94A3B8)),
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Notification settings are up to date.')),
                    );
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Logout / Switch Account Button
          OutlinedButton.icon(
            onPressed: () async {
              await AuthBackendService.instance.signOut();
              if (context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Signed out successfully from backend server.')),
                );
                Navigator.pushReplacementNamed(context, '/login');
              }
            },
            icon: const Icon(Icons.logout, color: Color(0xFFDC2626)),
            label: const Text(
              'LOGOUT / SWITCH ACCOUNT',
              style: TextStyle(color: Color(0xFFDC2626), fontWeight: FontWeight.bold),
            ),
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 14),
              side: const BorderSide(color: Color(0xFFFCA5A5)),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _profileStatItem(String label, String value) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF1E293B)),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: const TextStyle(fontSize: 11, color: Color(0xFF64748B)),
        ),
      ],
    );
  }

  Widget _categoryCard({
    required String title,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: Colors.white,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 8),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.12),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: color, size: 24),
              ),
              const SizedBox(height: 10),
              Text(
                title,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF1E293B),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _routeCard({
    required String busNo,
    required String title,
    required String timing,
    required String fare,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      color: Colors.white,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: const Color(0xFF3F51B5).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                alignment: Alignment.center,
                child: Text(
                  busNo,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF3F51B5),
                    fontSize: 16,
                  ),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF1E293B),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      timing,
                      style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    fare,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF009688),
                    ),
                  ),
                  const SizedBox(height: 2),
                  const Text(
                    'Per Seat',
                    style: TextStyle(fontSize: 11, color: Color(0xFF94A3B8)),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showLiveTrackingSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Live Tracking - Bus 101',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.green.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Text('ON TIME', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const SizedBox(height: 16),
            const Text('Current Location: Approaching Market Stop (2 mins away)'),
            const SizedBox(height: 8),
            const LinearProgressIndicator(value: 0.65, color: Color(0xFF009688)),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('CLOSE'),
            ),
          ],
        ),
      ),
    );
  }

  void _showBookingsSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('Your Bookings', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            ListTile(
              leading: const Icon(Icons.confirmation_number, color: Color(0xFF3F51B5)),
              title: const Text('Booking ID: BK10124052401'),
              subtitle: const Text('Bus 101 • Center -> Railway Station'),
              trailing: const Text('₹70', style: TextStyle(fontWeight: FontWeight.bold)),
              onTap: () {
                Navigator.pop(ctx);
                Navigator.pushNamed(context, '/confirmation');
              },
            ),
          ],
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
  String _selectedDate = '05-07-2026';

  @override
  void dispose() {
    _sourceController.dispose();
    _destController.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime(2026, 7, 5),
      firstDate: DateTime(2026, 1, 1),
      lastDate: DateTime(2028, 12, 31),
    );
    if (picked != null) {
      final day = picked.day.toString().padLeft(2, '0');
      final month = picked.month.toString().padLeft(2, '0');
      setState(() {
        _selectedDate = '$day-$month-${picked.year}';
      });
    }
  }

  void _onSearch() {
    final appState = AppState.instance;
    appState.searchSource = _sourceController.text.trim();
    appState.searchDestination = _destController.text.trim();
    appState.journeyDate = _selectedDate;
    Navigator.pushNamed(context, '/schedule');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = AppState.instance;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1E293B)),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'SEARCH BUS',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
            color: Color(0xFF1E293B),
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // From (Source)
            TextFormField(
              controller: _sourceController,
              decoration: const InputDecoration(
                labelText: 'From (Source)',
                prefixIcon: Icon(Icons.location_on_outlined, color: Color(0xFF3F51B5)),
              ),
            ),
            const SizedBox(height: 16),
            // To (Destination)
            TextFormField(
              controller: _destController,
              decoration: const InputDecoration(
                labelText: 'To (Destination)',
                prefixIcon: Icon(Icons.location_on, color: Color(0xFF009688)),
              ),
            ),
            const SizedBox(height: 16),
            // Journey Date Picker
            InkWell(
              onTap: _pickDate,
              borderRadius: BorderRadius.circular(12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: const Color(0xFFCBD5E1)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.calendar_today_outlined, color: Color(0xFF64748B)),
                    const SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Journey Date',
                          style: TextStyle(fontSize: 11, color: Color(0xFF64748B)),
                        ),
                        Text(
                          _selectedDate,
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                    const Spacer(),
                    const Icon(Icons.keyboard_arrow_down, color: Color(0xFF64748B)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            // Search Buses Button
            ElevatedButton(
              onPressed: _onSearch,
              child: const Text('Search Buses'),
            ),
            const SizedBox(height: 32),
            // Section: Recent Searches
            const Row(
              children: [
                Icon(Icons.history, color: Color(0xFF64748B), size: 20),
                SizedBox(width: 8),
                Text(
                  'Recent Searches',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF1E293B),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Card(
              elevation: 1,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              color: Colors.white,
              child: ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: appState.recentSearches.length,
                separatorBuilder: (_, __) => const Divider(height: 1, color: Color(0xFFF1F5F9)),
                itemBuilder: (context, index) {
                  final search = appState.recentSearches[index];
                  return ListTile(
                    leading: const Icon(Icons.access_time, color: Color(0xFF94A3B8), size: 20),
                    title: Text(
                      search,
                      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
                    ),
                    trailing: const Icon(Icons.arrow_forward_ios, size: 14, color: Color(0xFF94A3B8)),
                    onTap: () {
                      final parts = search.split(' -> ');
                      if (parts.length == 2) {
                        _sourceController.text = parts[0];
                        _destController.text = parts[1];
                      }
                      _onSearch();
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ==========================================
// 6. BUS SCHEDULE SCREEN
// ==========================================

class BusScheduleScreen extends StatelessWidget {
  const BusScheduleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = AppState.instance;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1E293B)),
          onPressed: () => Navigator.pop(context),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'BUS SCHEDULE',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                letterSpacing: 0.5,
                color: Color(0xFF1E293B),
              ),
            ),
            Text(
              '${appState.searchSource} -> ${appState.searchDestination} • ${appState.journeyDate}',
              style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
            ),
          ],
        ),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: appState.sampleBuses.length,
        itemBuilder: (context, index) {
          final bus = appState.sampleBuses[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            elevation: 2,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            color: Colors.white,
            child: InkWell(
              borderRadius: BorderRadius.circular(12),
              onTap: () {
                appState.selectedBus = bus;
                Navigator.pushNamed(context, '/details');
              },
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: const Color(0xFF3F51B5).withOpacity(0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        'Bus ${bus.busNo}',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF3F51B5),
                          fontSize: 13,
                        ),
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${bus.departureTime} ${bus.from} -> ${bus.arrivalTime} ${bus.to}',
                            style: const TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF1E293B),
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Duration: ${bus.totalTime} • ${bus.seatsLeft} seats left',
                            style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          '₹${bus.fare}',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF009688),
                          ),
                        ),
                        const SizedBox(height: 2),
                        const Icon(Icons.chevron_right, color: Color(0xFF94A3B8), size: 18),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

// ==========================================
// 7. BUS DETAILS SCREEN
// ==========================================

class BusDetailsScreen extends StatelessWidget {
  const BusDetailsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = AppState.instance;
    final bus = appState.selectedBus;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1E293B)),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Bus Details',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Color(0xFF1E293B),
          ),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Details Section Card
                  Card(
                    elevation: 2,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    color: Colors.white,
                    child: Padding(
                      padding: const EdgeInsets.all(18.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Bus No. ${bus.busNo}',
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF3F51B5),
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: Colors.teal.withOpacity(0.12),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: const Text(
                                  'AC Express',
                                  style: TextStyle(color: Color(0xFF009688), fontWeight: FontWeight.bold, fontSize: 12),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            '${bus.from} -> ${bus.to}',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF1E293B),
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            '${bus.departureTime} -> ${bus.arrivalTime}',
                            style: const TextStyle(fontSize: 14, color: Color(0xFF64748B)),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Metrics Bar (3-column stats)
                  Card(
                    elevation: 2,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    color: Colors.white,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 12),
                      child: Row(
                        children: [
                          Expanded(child: _metricStat('Total Time', bus.totalTime, Icons.access_time)),
                          Container(width: 1, height: 36, color: const Color(0xFFE2E8F0)),
                          Expanded(child: _metricStat('Fare', '₹${bus.fare}', Icons.currency_rupee)),
                          Container(width: 1, height: 36, color: const Color(0xFFE2E8F0)),
                          Expanded(child: _metricStat('Seats left', '${bus.seatsLeft}', Icons.event_seat)),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Timeline View ("Routes & Stops")
                  const Text(
                    'Routes & Stops',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF1E293B),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Card(
                    elevation: 2,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    color: Colors.white,
                    child: Padding(
                      padding: const EdgeInsets.all(18.0),
                      child: Column(
                        children: List.generate(bus.stops.length, (index) {
                          final isFirst = index == 0;
                          final isLast = index == bus.stops.length - 1;
                          return Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Column(
                                children: [
                                  Container(
                                    width: 16,
                                    height: 16,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: isFirst
                                          ? const Color(0xFF3F51B5)
                                          : isLast
                                              ? const Color(0xFF009688)
                                              : Colors.white,
                                      border: Border.all(
                                        color: isFirst
                                            ? const Color(0xFF3F51B5)
                                            : isLast
                                                ? const Color(0xFF009688)
                                                : const Color(0xFF94A3B8),
                                        width: 2.5,
                                      ),
                                    ),
                                  ),
                                  if (!isLast)
                                    Container(
                                      width: 2,
                                      height: 36,
                                      color: const Color(0xFFCBD5E1),
                                    ),
                                ],
                              ),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Padding(
                                  padding: const EdgeInsets.only(top: 0),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        bus.stops[index],
                                        style: TextStyle(
                                          fontWeight: (isFirst || isLast) ? FontWeight.bold : FontWeight.w500,
                                          fontSize: 15,
                                          color: const Color(0xFF1E293B),
                                        ),
                                      ),
                                      Text(
                                        isFirst
                                            ? 'Source Terminal'
                                            : isLast
                                                ? 'Final Destination'
                                                : 'Intermediate Stop',
                                        style: const TextStyle(fontSize: 12, color: Color(0xFF94A3B8)),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          );
                        }),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Fixed Bottom Bar with Book Now button
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.06),
                  blurRadius: 10,
                  offset: const Offset(0, -3),
                ),
              ],
            ),
            child: SafeArea(
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.pushNamed(context, '/seats'),
                  child: const Text('Book Now'),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _metricStat(String label, String value, IconData icon) {
    return Column(
      children: [
        Icon(icon, size: 20, color: const Color(0xFF3F51B5)),
        const SizedBox(height: 6),
        Text(
          value,
          style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF1E293B)),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: const TextStyle(fontSize: 11, color: Color(0xFF64748B)),
        ),
      ],
    );
  }
}

// ==========================================
// 8. SELECT SEATS SCREEN
// ==========================================

class SelectSeatsScreen extends StatefulWidget {
  const SelectSeatsScreen({super.key});

  @override
  State<SelectSeatsScreen> createState() => _SelectSeatsScreenState();
}

class _SelectSeatsScreenState extends State<SelectSeatsScreen> {
  // Seats 1 to 25. Let's pre-book a few seats (3, 8, 14, 19, 23)
  final Set<int> _bookedSeats = {3, 8, 14, 19, 23};
  final Set<int> _selectedSeats = {7, 20};

  void _toggleSeat(int seatNum) {
    if (_bookedSeats.contains(seatNum)) return;
    setState(() {
      if (_selectedSeats.contains(seatNum)) {
        _selectedSeats.remove(seatNum);
      } else {
        _selectedSeats.add(seatNum);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final appState = AppState.instance;
    final bus = appState.selectedBus;
    final totalFare = _selectedSeats.length * bus.fare;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF1E293B)),
          onPressed: () => Navigator.pop(context),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Select Seats',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color(0xFF1E293B),
              ),
            ),
            Text(
              'Bus ${bus.busNo} • ${bus.departureTime} Departure',
              style: const TextStyle(fontSize: 12, color: Color(0xFF64748B)),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Legend Row
          Container(
            padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 20),
            color: Colors.white,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _legendItem('Available', Colors.white, borderColor: const Color(0xFF94A3B8)),
                _legendItem('Booked', const Color(0xFF94A3B8)),
                _legendItem('Selected', const Color(0xFF3F51B5)),
              ],
            ),
          ),
          const Divider(height: 1, color: Color(0xFFE2E8F0)),

          // 5-Column Interactive Seat Grid (1 to 25)
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  // Steering wheel graphic for front orientation
                  Align(
                    alignment: Alignment.centerRight,
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 16.0, right: 12.0),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: const [
                          Icon(Icons.airline_seat_recline_normal, color: Color(0xFF94A3B8), size: 18),
                          SizedBox(width: 4),
                          Text('Driver Front', style: TextStyle(fontSize: 12, color: Color(0xFF94A3B8))),
                        ],
                      ),
                    ),
                  ),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: 25,
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 5,
                      mainAxisSpacing: 14,
                      crossAxisSpacing: 14,
                      childAspectRatio: 1.0,
                    ),
                    itemBuilder: (context, index) {
                      final seatNum = index + 1;
                      final isBooked = _bookedSeats.contains(seatNum);
                      final isSelected = _selectedSeats.contains(seatNum);

                      Color bgColor = Colors.white;
                      Color textColor = const Color(0xFF1E293B);
                      Border? border = Border.all(color: const Color(0xFF94A3B8), width: 1.5);

                      if (isBooked) {
                        bgColor = const Color(0xFFCBD5E1);
                        textColor = const Color(0xFF64748B);
                        border = null;
                      } else if (isSelected) {
                        bgColor = const Color(0xFF3F51B5);
                        textColor = Colors.white;
                        border = null;
                      }

                      return InkWell(
                        onTap: isBooked ? null : () => _toggleSeat(seatNum),
                        borderRadius: BorderRadius.circular(8),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 150),
                          decoration: BoxDecoration(
                            color: bgColor,
                            borderRadius: BorderRadius.circular(8),
                            border: border,
                            boxShadow: isSelected
                                ? [
                                    BoxShadow(
                                      color: const Color(0xFF3F51B5).withOpacity(0.35),
                                      blurRadius: 6,
                                      offset: const Offset(0, 2),
                                    )
                                  ]
                                : null,
                          ),
                          alignment: Alignment.center,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.chair_rounded,
                                size: 18,
                                color: textColor,
                              ),
                              const SizedBox(height: 2),
                              Text(
                                '$seatNum',
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  color: textColor,
                                ),
                              ),
                            ],
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
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.06),
                  blurRadius: 10,
                  offset: const Offset(0, -3),
                ),
              ],
            ),
            child: SafeArea(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _selectedSeats.isEmpty
                                ? 'No seats selected'
                                : 'Selected Seats: ${(_selectedSeats.toList()..sort()).join(', ')}',
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF1E293B),
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Fare: ₹$totalFare',
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF009688),
                            ),
                          ),
                        ],
                      ),
                      ElevatedButton(
                        onPressed: _selectedSeats.isEmpty
                            ? null
                            : () {
                                appState.selectedSeats = _selectedSeats.toList()..sort();
                                appState.lastBookingId =
                                    'BK${bus.busNo}${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}';
                                Navigator.pushNamed(context, '/confirmation');
                              },
                        child: const Text('Proceed to Pay'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _legendItem(String title, Color color, {Color? borderColor}) {
    return Row(
      children: [
        Container(
          width: 18,
          height: 18,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(4),
            border: borderColor != null ? Border.all(color: borderColor, width: 1.5) : null,
          ),
        ),
        const SizedBox(width: 6),
        Text(title, style: const TextStyle(fontSize: 12, color: Color(0xFF64748B), fontWeight: FontWeight.w500)),
      ],
    );
  }
}

// ==========================================
// 9. BOOKING CONFIRMATION SCREEN
// ==========================================

class BookingConfirmationScreen extends StatelessWidget {
  const BookingConfirmationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = AppState.instance;
    final bus = appState.selectedBus;
    final seatsString = appState.selectedSeats.join(', ');
    final totalFare = appState.selectedSeats.length * bus.fare;

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        automaticallyImplyLeading: false,
        title: const Text(
          'Booking Confirmation',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Color(0xFF1E293B),
          ),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 12),
              // Success checkmark badge
              Center(
                child: Container(
                  width: 84,
                  height: 84,
                  decoration: BoxDecoration(
                    color: const Color(0xFF009688).withOpacity(0.12),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.check_circle_rounded,
                    color: Color(0xFF009688),
                    size: 64,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              // Confirmation text
              const Text(
                'Booking Confirmed!',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF1E293B),
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Your ticket has been booked successfully.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 14,
                  color: Color(0xFF64748B),
                ),
              ),
              const SizedBox(height: 28),

              // Summary Ticket Card
              Card(
                elevation: 3,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                color: Colors.white,
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Booking ID: ${appState.lastBookingId}',
                            style: const TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF3F51B5),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: Colors.green.withOpacity(0.12),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: const Text(
                              'CONFIRMED',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: Colors.green,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 14),
                      const Divider(color: Color(0xFFE2E8F0)),
                      const SizedBox(height: 14),

                      _ticketRow('Bus No.', 'Bus ${bus.busNo} (AC Express)'),
                      const SizedBox(height: 10),
                      _ticketRow('Route', '${bus.from} -> ${bus.to}'),
                      const SizedBox(height: 10),
                      _ticketRow('Date & Time', '${appState.journeyDate} • ${bus.departureTime}'),
                      const SizedBox(height: 10),
                      _ticketRow('Seats Booked', seatsString.isEmpty ? '7, 20' : seatsString),
                      const SizedBox(height: 14),
                      const Divider(color: Color(0xFFE2E8F0)),
                      const SizedBox(height: 14),

                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Total Fare Paid',
                            style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF1E293B)),
                          ),
                          Text(
                            '₹$totalFare',
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF009688),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 32),

              // Action Buttons
              OutlinedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Ticket downloaded successfully as PDF!')),
                  );
                },
                icon: const Icon(Icons.download_rounded),
                label: const Text('DOWNLOAD TICKET'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  side: BorderSide(color: theme.colorScheme.primary, width: 2),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 14),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushNamedAndRemoveUntil(context, '/home', (route) => false);
                },
                child: const Text('DONE'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _ticketRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: Color(0xFF64748B), fontSize: 13)),
        Text(
          value,
          style: const TextStyle(
            color: Color(0xFF1E293B),
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
