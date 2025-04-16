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
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CropOptimization from './crop-planning'
import ClimateInfoComponent from './climate-info';
import SoilWaterComponent from './soil-water';
import TransportationComponent from './transportation';
import OptimizationModelsComponent from './optimization-models';
import NearbyFacilitiesComponent from './nearby-facilities';
import SeasonPlannerComponent from './season-planner';
import FarmProfileScreen from './farm-profile';
import * as Animatable from 'react-native-animatable';
// Auth Screens
import WelcomeScreen from './welcome';
import LoginScreen from './login';
import SignupScreen from './signup';
import { AuthProvider } from '../utils/AuthContext';
const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      <Tab.Screen name="Farm" component={FarmProfileScreen} options={{ title: 'My Farm' }} />
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
    <CropOptimization style={{flex: 1, width: '100%'}} />
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

const ProfileScreen = () => (
  <View style={styles.mockScreen}>
    <FarmProfileScreen style={{ flex: 1, width: '100%' }} />
  </View>
);


const NewPlanScreen = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockScreenText}>New Plan Screen</Text>
  </View>
);

const AlertsScreen = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockScreenText}>Alerts Screen</Text>
  </View>
);

const SavedPlansScreen = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockScreenText}>Saved Plans Screen</Text>
  </View>
);

const HelpScreen = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockScreenText}>Help Screen</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockScreenText}>Notifications Screen</Text>
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
        <Text style={styles.greeting}>Namaste, {userName}</Text>
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
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  mockScreenText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
  },
});

export default TabLayout;