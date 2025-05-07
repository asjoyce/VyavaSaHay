import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  TextInput,
  Switch,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import AnimatedBackground from '../utils/AnimatedBackground';
import CropOptimization from './crop-planning';
import ClimateInfoComponent from './climate-info';
import SoilWaterComponent from './soil-water';
import TransportationComponent from './transportation';
import OptimizationModelsComponent from './optimization-models';
import NearbyFacilitiesComponent from './nearby-facilities';
import SeasonPlannerComponent from './season-planner';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
// Sub-components for new screens
const NewPlanComponent = () => {
  const [planName, setPlanName] = useState('');
  const [cropType, setCropType] = useState('');
  const [area, setArea] = useState('');

  const handleSavePlan = () => {
    if (planName && cropType && area) {
      Alert.alert('Success', `Plan Saved: ${planName} - ${cropType}, ${area} acres`);
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>New Plan</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Create New Farm Plan</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Plan Name"
            value={planName}
            onChangeText={setPlanName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Crop Type"
            value={cropType}
            onChangeText={setCropType}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Area (acres)"
            value={area}
            onChangeText={setArea}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSavePlan}>
          <Text style={styles.buttonText}>Save Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const AlertsComponent = () => {
  const alerts = [
    { id: 1, type: 'Weather', message: 'Heavy rain expected tomorrow', date: 'Apr 28, 2025' },
    { id: 2, type: 'Market', message: 'Wheat prices up by 5%', date: 'Apr 27, 2025' },
    { id: 3, type: 'Crop', message: 'Pest warning for corn fields', date: 'Apr 26, 2025' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Alerts</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Farm Alerts</Text>
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertType}>{alert.type}</Text>
              <Text style={styles.alertDate}>{alert.date}</Text>
            </View>
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const SavedPlansComponent = () => {
  const plans = [
    { id: 1, name: 'Spring 2025', crop: 'Wheat', area: '150 acres', date: 'Apr 15, 2025' },
    { id: 2, name: 'Summer Rotation', crop: 'Corn', area: '200 acres', date: 'Mar 20, 2025' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Saved Plans</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Your Saved Plans</Text>
        {plans.map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planDetails}>Crop: {plan.crop}, Area: {plan.area}</Text>
            <Text style={styles.planDate}>Created: {plan.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const HelpComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Help</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>FarmAssist Help Center</Text>
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>FAQs</Text>
          <Text style={styles.helpText}>Check our frequently asked questions for quick answers.</Text>
        </View>
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Contact Support</Text>
          <Text style={styles.helpText}>Email: support@farmassist.com</Text>
          <Text style={styles.helpText}>Phone: +1-800-555-1234</Text>
        </View>
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Tutorials</Text>
          <Text style={styles.helpText}>Watch our video guides on YouTube: [Link]</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const NotificationsComponent = () => {
  const notifications = [
    { id: 1, message: 'New weather alert received', date: 'Apr 28, 2025' },
    { id: 2, message: 'Plan updated successfully', date: 'Apr 27, 2025' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Your Notifications</Text>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.alertCard}>
            <Text style={styles.alertMessage}>{notification.message} - {notification.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Farm Stack for MainTabs
const FarmStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FarmHome" component={FarmProfileScreen} />
    </Stack.Navigator>
  );
};

// Bottom tab navigator for main app screens
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Farm') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Crops') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Finances') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Resources') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#757575',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { paddingBottom: 5, height: 60 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Farm" component={FarmStack} options={{ title: 'My Farm' }} />
      <Tab.Screen name="Crops" component={CropManagementScreen} options={{ title: 'Crops' }} />
      <Tab.Screen name="Finances" component={FinancialRecordsScreen} options={{ title: 'Finances' }} />
      <Tab.Screen name="Resources" component={ResourceInventoryScreen} options={{ title: 'Resources' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="MainApp" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

// Mock screens for navigation
const CropPlanningScreen = () => (
  <View style={styles.mockScreen}>
    <CropOptimization style={{ flex: 1, width: '100%' }} />
  </View>
);

const ClimateInfoScreen = () => (
  <View style={styles.mockScreen}>
    <ClimateInfoComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const SoilWaterScreen = () => (
  <View style={styles.mockScreen}>
    <SoilWaterComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const TransportationScreen = () => (
  <View style={styles.mockScreen}>
    <TransportationComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const OptimizationModelsScreen = () => (
  <View style={styles.mockScreen}>
    <OptimizationModelsComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const NearbyFacilitiesScreen = () => (
  <View style={styles.mockScreen}>
    <NearbyFacilitiesComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const SeasonPlannerScreen = () => (
  <View style={styles.mockScreen}>
    <SeasonPlannerComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const NewPlanScreen = () => (
  <View style={styles.mockScreen}>
    <NewPlanComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const AlertsScreen = () => (
  <View style={styles.mockScreen}>
    <AlertsComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const SavedPlansScreen = () => (
  <View style={styles.mockScreen}>
    <SavedPlansComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const HelpScreen = () => (
  <View style={styles.mockScreen}>
    <HelpComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.mockScreen}>
    <NotificationsComponent style={{ flex: 1, width: '100%' }} />
  </View>
);

const DASHBOARD_ITEMS = [
  {
    id: 'crop-planning',
    title: 'Crop Planning',
    icon: 'sprout',
    color: '#4CAF50',
    screen: 'CropPlanning',
    description: 'Plan optimal crops for your land',
  },
  {
    id: 'climate-info',
    title: 'Climate Info',
    icon: 'weather-partly-cloudy',
    color: '#03A9F4',
    screen: 'ClimateInfo',
    description: 'Weather forecasts and climate data',
  },
  {
    id: 'soil-water',
    title: 'Soil & Water',
    icon: 'water-percent',
    color: '#795548',
    screen: 'SoilWater',
    description: 'Soil analysis and water management',
  },
  {
    id: 'transportation',
    title: 'Transportation',
    icon: 'truck',
    color: '#FF9800',
    screen: 'Transportation',
    description: 'Optimize routes to market',
  },
  {
    id: 'optimization',
    title: 'Optimization Models',
    icon: 'chart-line',
    color: '#9C27B0',
    screen: 'OptimizationModels',
    description: 'Advanced planning algorithms',
  },
  {
    id: 'nearby',
    title: 'Nearby Facilities',
    icon: 'map-marker-radius',
    color: '#E91E63',
    screen: 'NearbyFacilities',
    description: 'Find storage and supply centers',
  },
  {
    id: 'season',
    title: 'Season Planner',
    icon: 'calendar-clock',
    color: '#3F51B5',
    screen: 'SeasonPlanner',
    description: 'Multi-season crop planning',
  },
  {
    id: 'profile',
    title: 'Farm Profile',
    icon: 'account',
    color: '#607D8B',
    screen: 'Profile',
    description: 'Your farm details and history',
  },
];

const Header = ({ userName, location, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.greeting}>VyavaSahAy, {userName}</Text>
        <View style={styles.locationContainer}>
          <MaterialCommunityIcons name="map-marker" size={16} color="#4CAF50" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <MaterialCommunityIcons name="account-circle" size={40} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

const WeatherWidget = ({ temperature, condition, rainfall, navigation }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ClimateInfo')}
    >
      <LinearGradient
        colors={['#48c2e9', '#3f85ed']}
        style={styles.weatherContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.weatherLeft}>
          <Text style={styles.temperature}>{temperature}°C</Text>
          <Text style={styles.weatherCondition}>{condition}</Text>
        </View>
        <View style={styles.weatherRight}>
          <View style={styles.weatherDetail}>
            <MaterialCommunityIcons name="water" size={18} color="#fff" />
            <Text style={styles.weatherDetailText}>{rainfall} mm</Text>
          </View>
          <View style={styles.weatherDetail}>
            <MaterialCommunityIcons name="calendar-today" size={18} color="#fff" />
            <Text style={styles.weatherDetailText}>Today</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const DashboardCard = ({ item, navigation }) => {
  return (
    <Animatable.View 
      animation="fadeInUp" 
      delay={parseInt(item.id.split('-')[1] || 0) * 100 || 0}
      duration={600}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        style={[styles.card, { borderLeftColor: item.color }]}
        onPress={() => navigation.navigate(item.screen)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </Animatable.View>
  );
};

const QuickActionsBar = ({ navigation }) => {
  const actions = [
    { name: 'New Plan', icon: 'plus-circle-outline', screen: 'NewPlan' },
    { name: 'Alerts', icon: 'bell-outline', screen: 'Alerts' },
    { name: 'Saved', icon: 'bookmark-outline', screen: 'SavedPlans' },
    { name: 'Help', icon: 'help-circle-outline', screen: 'Help' },
  ];

  return (
    <View style={styles.quickActionsContainer}>
      {actions.map((action, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate(action.screen)}
        >
          <MaterialCommunityIcons name={action.icon} size={24} color="#4CAF50" />
          <Text style={styles.quickActionText}>{action.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CropTipsCarousel = () => {
  const tips = [
    {
      id: 1,
      title: 'Climate-Smart Farming',
      description: 'Implement crop rotation to improve soil health and reduce pest pressure',
      icon: 'refresh',
    },
    {
      id: 2,
      title: 'Water Conservation',
      description: 'Consider drip irrigation to save water and improve crop yield',
      icon: 'water-outline',
    },
    {
      id: 3,
      title: 'Market Trends',
      description: 'Millet demand increasing - consider including in your crop plan',
      icon: 'trending-up',
    },
  ];

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.carouselTitle}>Farming Tips</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tipsScrollContainer}
      >
        {tips.map((tip) => (
          <TouchableOpacity key={tip.id} style={styles.tipCard} activeOpacity={0.8}>
            <View style={styles.tipIconContainer}>
              <MaterialCommunityIcons name={tip.icon} size={24} color="#4CAF50" />
            </View>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Dashboard = ({ navigation }) => {
  const [userName, setUserName] = useState('Farmer');
  const [location, setLocation] = useState('Pune, Maharashtra');
  const [weatherData, setWeatherData] = useState({
    temperature: 32,
    condition: 'Partly Cloudy',
    rainfall: 2.5,
  });

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedBackground /> {/* Add the background component */}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header 
          userName={userName} 
          location={location} 
          navigation={navigation}
        />
        <WeatherWidget 
          {...weatherData} 
          navigation={navigation}
        />
        <QuickActionsBar navigation={navigation} />
        <CropTipsCarousel />
        
        <Text style={styles.sectionTitle}>Planning Tools</Text>
        <View style={styles.dashboardGrid}>
          {DASHBOARD_ITEMS.map((item) => (
            <DashboardCard 
              key={item.id} 
              item={item} 
              navigation={navigation} 
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Stack navigator for each tab to enable navigation to detail screens
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DashboardHome" component={Dashboard} />
      <Stack.Screen name="CropPlanning" component={CropPlanningScreen} />
      <Stack.Screen name="ClimateInfo" component={ClimateInfoScreen} />
      <Stack.Screen name="SoilWater" component={SoilWaterScreen} />
      <Stack.Screen name="Transportation" component={TransportationScreen} />
      <Stack.Screen name="OptimizationModels" component={OptimizationModelsScreen} />
      <Stack.Screen name="NearbyFacilities" component={NearbyFacilitiesScreen} />
      <Stack.Screen name="SeasonPlanner" component={SeasonPlannerScreen} />
      <Stack.Screen name="NewPlan" component={NewPlanScreen} />
      <Stack.Screen name="Alerts" component={AlertsScreen} />
      <Stack.Screen name="SavedPlans" component={SavedPlansScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
};

// Planning Stack
const PlanningStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlanningHome" component={CropPlanningScreen} />
    </Stack.Navigator>
  );
};

// Weather Stack
const WeatherStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WeatherHome" component={ClimateInfoScreen} />
    </Stack.Navigator>
  );
};

// Notifications Stack
const NotificationsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotificationsHome" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

// Profile Stack
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={FarmProfileScreen} />
    </Stack.Navigator>
  );
};

// Tab Layout Component - This will be used in the app.js file
const TabLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Planning') {
            iconName = focused ? 'sprout' : 'sprout-outline';
          } else if (route.name === 'Weather') {
            iconName = focused ? 'weather-partly-cloudy' : 'weather-partly-cloudy';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'bell' : 'bell-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Planning" component={PlanningStack} />
      <Tab.Screen name="Weather" component={WeatherStack} />
      <Tab.Screen name="Notifications" component={NotificationsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const FarmProfileScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [language, setLanguage] = useState('en');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');

  const [farmData, setFarmData] = useState({
    farmName: '',
    ownerName: '',
    location: '',
    county: '',
    totalArea: '',
    established: '',
    soilType: '',
    primaryCrops: '',
    livestock: '',
    specialty: '',
    activeFields: '',
    averageYield: '',
    previousRotations: '',
    soilImprovements: '',
    profileImage: null,
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    weatherAlerts: true,
    marketPrices: true,
    cropTips: true,
    systemUpdates: true,
  });

  const translations = {
    en: {
      appTitle: 'FarmAssist',
      appTagline: 'Smart farming solutions',
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      mobileNumber: 'Mobile Number',
      address: 'Address',
      farmInfo: 'Farm Information',
      farmName: 'Farm Name',
      ownerName: 'Owner Name',
      locationCounty: 'Location/County',
      createAccount: 'Create Account',
      forgotPassword: 'Forgot Password?',
      profile: 'Farm Profile',
      logout: 'Logout',
      editProfile: 'Edit Farm Profile',
      basicInfo: 'Basic Information',
      farmOperations: 'Farm Operations',
      historicalData: 'Historical Data',
      totalArea: 'Total Area (acres)',
      establishedYear: 'Established Year',
      soilType: 'Soil Type',
      primaryCrops: 'Primary Crops',
      livestock: 'Livestock',
      specialty: 'Specialty',
      activeFields: 'Active Fields',
      averageYield: 'Average Yield',
      previousRotations: 'Previous Rotations',
      soilImprovements: 'Soil Improvements',
      cancel: 'Cancel',
      saveChanges: 'Save Changes',
      weatherAlerts: 'Weather Alerts',
      marketPrices: 'Market Prices',
      cropTips: 'Crop Tips',
      systemUpdates: 'System Updates',
    },
    es: {
      appTitle: 'FarmAssist',
      appTagline: 'Soluciones agrícolas inteligentes',
      login: 'Iniciar Sesión',
      signup: 'Registrarse',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      mobileNumber: 'Número de Teléfono',
      address: 'Dirección',
      farmInfo: 'Información de la Granja',
      farmName: 'Nombre de la Granja',
      ownerName: 'Nombre del Propietario',
      locationCounty: 'Ubicación/Condado',
      createAccount: 'Crear Cuenta',
      forgotPassword: '¿Olvidaste tu contraseña?',
      profile: 'Perfil de la Granja',
      logout: 'Cerrar Sesión',
      editProfile: 'Editar Perfil de la Granja',
      basicInfo: 'Información Básica',
      farmOperations: 'Operaciones de la Granja',
      historicalData: 'Datos Históricos',
      totalArea: 'Área Total (acres)',
      establishedYear: 'Año de Establecimiento',
      soilType: 'Tipo de Suelo',
      primaryCrops: 'Cultivos Principales',
      livestock: 'Ganado',
      specialty: 'Especialidad',
      activeFields: 'Campos Activos',
      averageYield: 'Rendimiento Promedio',
      previousRotations: 'Rotaciones Previas',
      soilImprovements: 'Mejoras del Suelo',
      cancel: 'Cancelar',
      saveChanges: 'Guardar Cambios',
      weatherAlerts: 'Alertas Meteorológicas',
      marketPrices: 'Precios del Mercado',
      cropTips: 'Consejos de Cultivos',
      systemUpdates: 'Actualizaciones del Sistema',
    },
    hi: {
      appTitle: 'FarmAssist',
      appTagline: 'स्मार्ट खेती समाधान',
      login: 'लॉगिन',
      signup: 'साइन अप करें',
      email: 'ईमेल',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      mobileNumber: 'मोबाइल नंबर',
      address: 'पता',
      farmInfo: 'फार्म की जानकारी',
      farmName: 'फार्म का नाम',
      ownerName: 'मालिक का नाम',
      locationCounty: 'स्थान/काउंटी',
      createAccount: 'खाता बनाएं',
      forgotPassword: 'पासवर्ड भूल गए?',
      profile: 'फार्म प्रोफाइल',
      logout: 'लॉग आउट',
      editProfile: 'फार्म प्रोफाइल संपादित करें',
      basicInfo: 'मूल जानकारी',
      farmOperations: 'फार्म संचालन',
      historicalData: 'ऐतिहासिक डेटा',
      totalArea: 'कुल क्षेत्र (एकड़ में)',
      establishedYear: 'स्थापना का वर्ष',
      soilType: 'मिट्टी का प्रकार',
      primaryCrops: 'प्रमुख फसलें',
      livestock: 'पशुधन',
      specialty: 'विशेषता',
      activeFields: 'सक्रिय खेत',
      averageYield: 'औसत उपज',
      previousRotations: 'पिछली फसलों की बारी',
      soilImprovements: 'मिट्टी में सुधार',
      cancel: 'रद्द करें',
      saveChanges: 'परिवर्तन सहेजें',
      weatherAlerts: 'मौसम की चेतावनी',
      marketPrices: 'बाजार की कीमतें',
      cropTips: 'फसल टिप्स',
      systemUpdates: 'सिस्टम अपडेट',
    },
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setFarmData(parsedData);
        setEmail(parsedData.email || '');
        setMobileNumber(parsedData.mobileNumber || '');
        setAddress(parsedData.address || '');
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', translations[language].error || 'Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const mockUserData = {
        farmName: 'Green Valley Farm',
        ownerName: 'John Farmer',
        location: 'Heartland County',
        county: 'Heartland County',
        totalArea: '320',
        established: '1982',
        soilType: 'Loam, Clay Loam',
        primaryCrops: 'Corn, Soybeans, Wheat',
        livestock: '50 head cattle',
        specialty: 'Organic vegetables (15 acres)',
        activeFields: '12 fields currently in use',
        averageYield: '175 bushels/acre',
        previousRotations: '3-year standard',
        soilImprovements: '+12% organic matter since 2018',
        profileImage: null,
        email: email,
        mobileNumber: '123-456-7890',
        address: '123 Farm Road',
      };
      
      await AsyncStorage.setItem('userData', JSON.stringify(mockUserData));
      setFarmData(mockUserData);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', translations[language].loginFailed || 'Unable to login. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !farmData.ownerName || !mobileNumber || !address) {
      Alert.alert('Error', translations[language].error || 'Please fill all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', translations[language].passwordMismatch || 'Passwords do not match');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const newUserData = {
        ...farmData,
        email,
        mobileNumber,
        address,
      };
      
      await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
      setIsLoggedIn(true);
      setIsLoading(false);
      Alert.alert('Success', translations[language].success || 'Account created successfully!');
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup Failed', translations[language].signupFailed || 'Unable to create account. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setIsLoggedIn(false);
      setFarmData({
        farmName: '',
        ownerName: '',
        location: '',
        county: '',
        totalArea: '',
        established: '',
        soilType: '',
        primaryCrops: '',
        livestock: '',
        specialty: '',
        activeFields: '',
        averageYield: '',
        previousRotations: '',
        soilImprovements: '',
        profileImage: null,
      });
      setEmail('');
      setPassword('');
      setMobileNumber('');
      setAddress('');
      Alert.alert('Success', translations[language].logoutSuccess || 'Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', translations[language].logoutError || 'Failed to logout. Please try again.');
    }
  };

  const saveProfileChanges = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(farmData));
      setIsEditing(false);
      Alert.alert('Success', translations[language].profileUpdated || 'Profile updated successfully!');
    } catch (error) {
      console.error('Save profile error:', error);
      Alert.alert('Error', translations[language].saveError || 'Failed to save profile. Please try again.');
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission Denied', translations[language].permissionDenied || 'Permission to access the media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled) {
        setFarmData({
          ...farmData,
          profileImage: result.assets[0].uri,
        });
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', translations[language].imageError || 'Failed to select image. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialCommunityIcons name="loading" size={40} color="#4CAF50" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.languageSelector}>
              <Text style={styles.languageLabel}>{translations[language].language || 'Language'}</Text>
              <Picker
                selectedValue={language}
                style={styles.picker}
                onValueChange={(itemValue) => setLanguage(itemValue)}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Español" value="es" />
                <Picker.Item label="हिन्दी" value="hi" />
              </Picker>
            </View>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <MaterialCommunityIcons name="leaf" size={60} color="#4CAF50" />
              </View>
              <Text style={styles.appTitle}>{translations[language].appTitle}</Text>
              <Text style={styles.appTagline}>{translations[language].appTagline}</Text>
            </View>
            
            <View style={styles.authContainer}>
              <View style={styles.tabContainer}>
                <TouchableOpacity 
                  style={[styles.tabButton, !isEditing ? styles.tabButtonActive : null]} 
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={[styles.tabButtonText, !isEditing ? styles.tabButtonTextActive : null]}>{translations[language].login}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.tabButton, isEditing ? styles.tabButtonActive : null]} 
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={[styles.tabButtonText, isEditing ? styles.tabButtonTextActive : null]}>{translations[language].signup}</Text>
                </TouchableOpacity>
              </View>
              
              {!isEditing ? (
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].email}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].password}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
                  
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>{translations[language].forgotPassword}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>{translations[language].login}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].email}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].password}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="lock-check-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].confirmPassword}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="phone-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].mobileNumber}
                      value={mobileNumber}
                      onChangeText={setMobileNumber}
                      keyboardType="phone-pad"
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="map-marker-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].address}
                      value={address}
                      onChangeText={setAddress}
                      multiline
                    />
                  </View>
                  
                  <View style={styles.divider}>
                    <Text style={styles.dividerText}>{translations[language].farmInfo}</Text>
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="home-variant-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].farmName}
                      value={farmData.farmName}
                      onChangeText={(text) => setFarmData({...farmData, farmName: text})}
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="account-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].ownerName}
                      value={farmData.ownerName}
                      onChangeText={(text) => setFarmData({...farmData, ownerName: text})}
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="map-marker-outline" size={20} color="#757575" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={translations[language].locationCounty}
                      value={farmData.location}
                      onChangeText={(text) => setFarmData({...farmData, location: text, county: text})}
                    />
                  </View>
                  
                  <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
                    <Text style={styles.buttonText}>{translations[language].createAccount}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{translations[language].profile}</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <MaterialCommunityIcons name="logout" size={24} color="#FF5722" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={isEditing ? pickImage : null}>
            {farmData.profileImage ? (
              <Image source={{ uri: farmData.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <MaterialCommunityIcons name="barn" size={50} color="#4CAF50" />
              </View>
            )}
            {isEditing && (
              <View style={styles.editImageBadge}>
                <MaterialCommunityIcons name="camera" size={16} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.farmName}>{farmData.farmName}</Text>
          <Text style={styles.ownerName}>Owner: {farmData.ownerName}</Text>
          
          <View style={styles.weatherCard}>
            <MaterialCommunityIcons name="weather-partly-cloudy" size={32} color="#FF9800" />
            <View style={styles.weatherInfo}>
              <Text style={styles.temperature}>72°F</Text>
              <Text style={styles.weatherCondition}>Partly Cloudy</Text>
            </View>
          </View>
          
          <View style={styles.farmStats}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="chart-line" size={22} color="#4CAF50" />
              <Text style={styles.statValue}>{farmData.totalArea}</Text>
              <Text style={styles.statLabel}>ACRES</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="leaf" size={22} color="#4CAF50" />
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>CROPS</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="calendar" size={22} color="#4CAF50" />
              <Text style={styles.statValue}>{farmData.established}</Text>
              <Text style={styles.statLabel}>EST.</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          {!isEditing ? (
            <>
              <View style={styles.infoCard}>
                <View style={styles.infoHeader}>
                  <MaterialCommunityIcons name="information" size={24} color="#4CAF50" />
                  <Text style={styles.infoTitle}>{translations[language].basicInfo}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].ownerName}:</Text>
                  <Text style={styles.infoValue}>{farmData.ownerName}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].mobileNumber}:</Text>
                  <Text style={styles.infoValue}>{mobileNumber}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].address}:</Text>
                  <Text style={styles.infoValue}>{address}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].locationCounty}:</Text>
                  <Text style={styles.infoValue}>{farmData.county}</Text>
                </View>
              </View>
              
              <View style={styles.infoCard}>
                <View style={styles.infoHeader}>
                  <MaterialCommunityIcons name="leaf" size={24} color="#4CAF50" />
                  <Text style={styles.infoTitle}>{translations[language].farmOperations}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].primaryCrops}:</Text>
                  <Text style={styles.infoValue}>{farmData.primaryCrops}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].livestock}:</Text>
                  <Text style={styles.infoValue}>{farmData.livestock}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].specialty}:</Text>
                  <Text style={styles.infoValue}>{farmData.specialty}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].activeFields}:</Text>
                  <Text style={styles.infoValue}>{farmData.activeFields}</Text>
                </View>
              </View>
              
              <View style={styles.infoCard}>
                <View style={styles.infoHeader}>
                  <MaterialCommunityIcons name="chart-line" size={24} color="#4CAF50" />
                  <Text style={styles.infoTitle}>{translations[language].historicalData}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].averageYield}:</Text>
                  <Text style={styles.infoValue}>{farmData.averageYield}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].previousRotations}:</Text>
                  <Text style={styles.infoValue}>{farmData.previousRotations}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{translations[language].soilImprovements}:</Text>
                  <Text style={styles.infoValue}>{farmData.soilImprovements}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>5-Year Production:</Text>
                  <Text style={styles.infoValue}>Growing at 3.5% annually</Text>
                </View>
              </View>
              
              <View style={styles.infoCard}>
                <View style={styles.infoHeader}>
                  <MaterialCommunityIcons name="bell-outline" size={24} color="#4CAF50" />
                  <Text style={styles.infoTitle}>{translations[language].notificationPrefs}</Text>
                </View>
                
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>{translations[language].weatherAlerts}</Text>
                    <Text style={styles.settingDescription}>Severe weather warnings and forecasts</Text>
                  </View>
                  <Switch
                    value={notificationPrefs.weatherAlerts}
                    onValueChange={(value) => 
                      setNotificationPrefs({...notificationPrefs, weatherAlerts: value})
                    }
                    trackColor={{ false: '#D1D1D1', true: '#AED581' }}
                    thumbColor={notificationPrefs.weatherAlerts ? '#4CAF50' : '#f4f3f4'}
                  />
                </View>
                
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>{translations[language].marketPrices}</Text>
                    <Text style={styles.settingDescription}>Daily updates on crop market prices</Text>
                  </View>
                  <Switch
                    value={notificationPrefs.marketPrices}
                    onValueChange={(value) => 
                      setNotificationPrefs({...notificationPrefs, marketPrices: value})
                    }
                    trackColor={{ false: '#D1D1D1', true: '#AED581' }}
                    thumbColor={notificationPrefs.marketPrices ? '#4CAF50' : '#f4f3f4'}
                  />
                </View>
                
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>{translations[language].cropTips}</Text>
                    <Text style={styles.settingDescription}>Weekly farming advice and tips</Text>
                  </View>
                  <Switch
                    value={notificationPrefs.cropTips}
                    onValueChange={(value) => 
                      setNotificationPrefs({...notificationPrefs, cropTips: value})
                    }
                    trackColor={{ false: '#D1D1D1', true: '#AED581' }}
                    thumbColor={notificationPrefs.cropTips ? '#4CAF50' : '#f4f3f4'}
                  />
                </View>
                
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>{translations[language].systemUpdates}</Text>
                    <Text style={styles.settingDescription}>App updates and new features</Text>
                  </View>
                  <Switch
                    value={notificationPrefs.systemUpdates}
                    onValueChange={(value) => 
                      setNotificationPrefs({...notificationPrefs, systemUpdates: value})
                    }
                    trackColor={{ false: '#D1D1D1', true: '#AED581' }}
                    thumbColor={notificationPrefs.systemUpdates ? '#4CAF50' : '#f4f3f4'}
                  />
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.editProfileButton} 
                onPress={() => setIsEditing(true)}
              >
                <MaterialCommunityIcons name="pencil" size={18} color="#fff" />
                <Text style={styles.editProfileButtonText}>{translations[language].editProfile}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.editCard}>
                <Text style={styles.editSectionTitle}>{translations[language].basicInfo}</Text>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].ownerName}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.ownerName}
                    onChangeText={(text) => setFarmData({...farmData, ownerName: text})}
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].mobileNumber}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    keyboardType="phone-pad"
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].address}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={address}
                    onChangeText={setAddress}
                    multiline
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].locationCounty}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.location}
                    onChangeText={(text) => setFarmData({...farmData, location: text})}
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].county}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.county}
                    onChangeText={(text) => setFarmData({...farmData, county: text})}
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].totalArea}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.totalArea}
                    onChangeText={(text) => setFarmData({...farmData, totalArea: text})}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].establishedYear}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.established}
                    onChangeText={(text) => setFarmData({...farmData, established: text})}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].soilType}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.soilType}
                    onChangeText={(text) => setFarmData({...farmData, soilType: text})}
                  />
                </View>
              </View>
              
              <View style={styles.editCard}>
                <Text style={styles.editSectionTitle}>{translations[language].farmOperations}</Text>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].primaryCrops}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.primaryCrops}
                    onChangeText={(text) => setFarmData({...farmData, primaryCrops: text})}
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].livestock}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.livestock}
                    onChangeText={(text) => setFarmData({...farmData, livestock: text})}
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].specialty}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.specialty}
                    onChangeText={(text) => setFarmData({...farmData, specialty: text})}
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].activeFields}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.activeFields}
                    onChangeText={(text) => setFarmData({...farmData, activeFields: text})}
                  />
                </View>
              </View>
              
              <View style={styles.editCard}>
                <Text style={styles.editSectionTitle}>{translations[language].historicalData}</Text>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].averageYield}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.averageYield}
                    onChangeText={(text) => setFarmData({...farmData, averageYield: text})}
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].previousRotations}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.previousRotations}
                    onChangeText={(text) => setFarmData({...farmData, previousRotations: text})}
                  />
                </View>
                
                <View style={styles.editRow}>
                  <Text style={styles.editLabel}>{translations[language].soilImprovements}</Text>
                  <TextInput
                    style={styles.editInput}
                    value={farmData.soilImprovements}
                    onChangeText={(text) => setFarmData({...farmData, soilImprovements: text})}
                  />
                </View>
              </View>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.cancelButtonText}>{translations[language].cancel}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={saveProfileChanges}
                >
                  <Text style={styles.saveButtonText}>{translations[language].saveChanges}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212121',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 4,
  },
  profileButton: {
    padding: 4,
  },
  weatherContainer: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherLeft: {
    justifyContent: 'center',
  },
  temperature: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
  },
  weatherCondition: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  weatherRight: {
    justifyContent: 'center',
  },
  weatherDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  weatherDetailText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: 12,
    color: '#616161',
    marginTop: 4,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#212121',
  },
  tipsScrollContainer: {
    paddingRight: 16,
  },
  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: width * 0.7,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tipIconContainer: {
    backgroundColor: '#E8F5E9',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#212121',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '100%',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#757575',
  },
  mockScreen: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  mockScreenText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 18,
    color: '#4CAF50',
  },
  languageSelector: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  languageLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: 150,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 5,
  },
  appTagline: {
    fontSize: 16,
    color: '#757575',
  },
  authContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#4CAF50',
  },
  tabButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#757575',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  divider: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#757575',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  logoutButton: {
    padding: 10,
  },
  profileImageContainer: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  editImageBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  farmName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 12,
  },
  ownerName: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 15,
  },
  weatherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  weatherInfo: {
    marginLeft: 12,
  },
  farmStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 15,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#D1D1D1',
    height: '60%',
    alignSelf: 'center',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#757575',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  editProfileButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  editCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  editRow: {
    marginBottom: 15,
  },
  editLabel: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF5722',
        borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF5722',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  alertType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  alertDate: {
    fontSize: 14,
    color: '#757575',
  },
  alertMessage: {
    fontSize: 16,
    color: '#333',
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  planDetails: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 5,
  },
  planDate: {
    fontSize: 14,
    color: '#B0BEC5',
  },
  helpSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 22,
  },
});

export default TabLayout;