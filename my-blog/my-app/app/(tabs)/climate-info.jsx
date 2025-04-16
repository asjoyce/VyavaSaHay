import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

// Utility function to convert Fahrenheit to Celsius
const fToC = (fahrenheit) => {
  return ((fahrenheit - 32) * 5 / 9).toFixed(1);
};

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission to access location was denied');
    return null;
  }
  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
};

const weatherIcons = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '🌨️',
  80: '🌦️', 81: '🌦️', 82: '🌧️',
  95: '⛈️', 96: '⛈️', 99: '⛈️'
};

// Modified mock historical data (with temperature in Celsius)
const generateMockHistoricalData = () => {
  const startYear = 1979;
  const years = Array.from({ length: 45 }, (_, i) => startYear + i);
  
  // Generate data with a slight warming trend to show climate change
  return years.map((year, index) => {
    const baseTemp = 18; // Starting at around 18°C
    const warming = (index / 44) * 2; // Up to 2°C warming over 45 years
    const variance = (Math.random() * 1.5) - 0.75; // Random variance

    return {
      year,
      avgTemp: (baseTemp + warming + variance).toFixed(1), // Temperature in Celsius
      avgRainfall: (Math.random() * 8 + 35).toFixed(1), // Rainfall in mm (instead of inches)
      growingSeason: Math.floor(Math.random() * 60 + 210), // 210-270 days
    };
  });
};

const ClimateInfoScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setError(null);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&temperature_unit=celsius`
      );
      const data = await response.json();

      const processedData = {
        current: {
          temp: Math.round(data.current_weather.temperature),
          description: getWeatherDescription(data.current_weather.weathercode),
          icon: weatherIcons[data.current_weather.weathercode] || '🌍',
          wind: {
            speed: Math.round(data.current_weather.windspeed),
            direction: getWindDirection(data.current_weather.winddirection),
          },
          humidity: null,
          precipitation: null,
        },
        forecast: data.daily.time.slice(1, 6).map((day, index) => ({
          day: new Date(day).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: `${Math.round(data.daily.temperature_2m_max[index + 1])}° / ${Math.round(data.daily.temperature_2m_min[index + 1])}°`,
          icon: weatherIcons[data.daily.weathercode[index + 1]] || '🌍',
          description: getWeatherDescription(data.daily.weathercode[index + 1]),
        })),
        climate: {
          avgRainfall: '45.2',
          avgTemperature: '19.4',
          growingSeason: '240',
        },
      };

      setWeatherData(processedData);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data.');
    }
  };

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Slight showers',
      81: 'Moderate showers',
      82: 'Violent showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Severe thunderstorm',
    };
    return descriptions[code] || `Code ${code}`;
  };

  const fetchHistoricalData = () => {
    // Simulate API call with mock data
    setTimeout(() => {
      setHistoricalData(generateMockHistoricalData());
    }, 500);
  };

  const getLocationAndFetch = async () => {
    setLoading(true);
    const coords = await getLocation();
    if (coords) {
      await fetchWeatherData(coords.latitude, coords.longitude);
      fetchHistoricalData();
    } else {
      setError('Location access denied.');
    }
    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getLocationAndFetch();
  };

  useEffect(() => {
    getLocationAndFetch();
  }, []);

  // Find min and max values for temperature for scaling in the chart
  const tempMin = historicalData.length ? Math.min(...historicalData.map(d => parseFloat(d.avgTemp))) - 1 : 15;
  const tempMax = historicalData.length ? Math.max(...historicalData.map(d => parseFloat(d.avgTemp))) + 1 : 25;
  const tempRange = tempMax - tempMin;

  if (loading && !weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading climate data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#134e5e', '#71B280']}
      style={styles.gradientContainer}
    >
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ffffff" />}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Climate Insights</Text>
          <Text style={styles.subtitle}>Weather & Climate Data (°C)</Text>
        </View>

        {weatherData && (
          <>
            <View style={styles.currentWeatherCard}>
              <View style={styles.currentWeatherHeader}>
                <Text style={styles.currentTemp}>{weatherData.current.temp}°C</Text>
                <Text style={styles.currentIcon}>{weatherData.current.icon}</Text>
              </View>
              <Text style={styles.currentDescription}>{weatherData.current.description}</Text>
              <View style={styles.currentDetails}>
                <Text style={styles.detailText}>
                  Wind: {weatherData.current.wind.speed} km/h {weatherData.current.wind.direction}
                </Text>
                <Text style={styles.detailText}>Humidity: N/A</Text>
                <Text style={styles.detailText}>Precipitation: N/A</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>5-Day Forecast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastScroll}>
                {weatherData.forecast.map((day, index) => (
                  <View key={index} style={styles.forecastCard}>
                    <Text style={styles.forecastDay}>{day.day}</Text>
                    <Text style={styles.forecastIcon}>{day.icon}</Text>
                    <Text style={styles.forecastTemp}>{day.temp}</Text>
                    <Text style={styles.forecastDescription}>{day.description}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Climate Overview</Text>
              <View style={styles.climateGrid}>
                <View style={styles.climateCard}>
                  <Text style={styles.climateLabel}>Avg Rainfall</Text>
                  <Text style={styles.climateValue}>{weatherData.climate.avgRainfall} mm</Text>
                </View>
                <View style={styles.climateCard}>
                  <Text style={styles.climateLabel}>Avg Temp</Text>
                  <Text style={styles.climateValue}>{weatherData.climate.avgTemperature}°C</Text>
                </View>
                <View style={styles.climateCard}>
                  <Text style={styles.climateLabel}>Growing Season</Text>
                  <Text style={styles.climateValue}>{weatherData.climate.growingSeason} days</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Historical Data (1979-2024)</Text>
              
              {/* Temperature trend visualization */}
              <View style={styles.chartContainer}>
                <View style={styles.chartYAxis}>
                  <Text style={styles.chartAxisLabel}>{tempMax.toFixed(1)}°C</Text>
                  <Text style={styles.chartAxisLabel}>{((tempMax + tempMin) / 2).toFixed(1)}°C</Text>
                  <Text style={styles.chartAxisLabel}>{tempMin.toFixed(1)}°C</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.chart}>
                  <View style={styles.chartInner}>
                    {historicalData.map((item, index) => {
                      const tempPercentage = ((parseFloat(item.avgTemp) - tempMin) / tempRange) * 100;
                      return (
                        <View key={index} style={styles.chartBar}>
                          <TouchableBar 
                            item={item} 
                            tempPercentage={tempPercentage} 
                            onPress={() => setSelectedYear(selectedYear === item.year ? null : item.year)}
                            isSelected={selectedYear === item.year}
                          />
                          {index % 5 === 0 && (
                            <Text style={styles.chartLabel}>{item.year}</Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
                <Text style={styles.chartCaption}>45-Year Temperature Trend (Tap bars for details)</Text>
              </View>
              
              {/* Selected year details */}
              {selectedYear && (
                <View style={styles.selectedYearCard}>
                  <Text style={styles.selectedYearTitle}>Details for {selectedYear}</Text>
                  {historicalData.find(item => item.year === selectedYear) && (
                    <View style={styles.selectedYearDetails}>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Avg Temperature:</Text>
                        <Text style={styles.detailValue}>
                          {historicalData.find(item => item.year === selectedYear).avgTemp}°C
                        </Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Avg Rainfall:</Text>
                        <Text style={styles.detailValue}>
                          {historicalData.find(item => item.year === selectedYear).avgRainfall} mm
                        </Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Growing Season:</Text>
                        <Text style={styles.detailValue}>
                          {historicalData.find(item => item.year === selectedYear).growingSeason} days
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
              
              {/* Data table */}
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}>Year</Text>
                  <Text style={styles.tableHeaderCell}>Temp (°C)</Text>
                  <Text style={styles.tableHeaderCell}>Rain (mm)</Text>
                  <Text style={styles.tableHeaderCell}>Season</Text>
                </View>
                {historicalData.map((item, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.tableRow, 
                      selectedYear === item.year && styles.tableRowSelected,
                      index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                    ]}
                  >
                    <Text style={styles.tableCell}>{item.year}</Text>
                    <Text style={styles.tableCell}>{item.avgTemp}°C</Text>
                    <Text style={styles.tableCell}>{item.avgRainfall} mm</Text>
                    <Text style={styles.tableCell}>{item.growingSeason} d</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

// Touchable bar component for the chart
const TouchableBar = ({ item, tempPercentage, onPress, isSelected }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.barTouchable}>
      <View 
        style={[
          styles.bar, 
          { height: `${tempPercentage}%` },
          isSelected && styles.barSelected
        ]} 
      />
    </TouchableOpacity>
  );
};

// Import TouchableOpacity at the top of the file
import { TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#134e5e',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#134e5e',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ff6b6b',
    textAlign: 'center',
    fontWeight: '600',
  },
  currentWeatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 16,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  currentWeatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentTemp: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#134e5e',
  },
  currentIcon: {
    fontSize: 48,
  },
  currentDescription: {
    fontSize: 18,
    color: '#4b5e87',
    marginBottom: 16,
  },
  currentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e7ff',
    paddingTop: 16,
    flexWrap: 'wrap',
  },
  detailText: {
    fontSize: 14,
    color: '#4b5e87',
    fontWeight: '500',
    marginBottom: 6,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  forecastScroll: {
    paddingBottom: 8,
  },
  forecastCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  forecastDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#134e5e',
  },
  forecastIcon: {
    fontSize: 32,
    marginVertical: 8,
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5e87',
  },
  forecastDescription: {
    fontSize: 12,
    color: '#4b7b8f',
    marginTop: 4,
    textAlign: 'center',
    height: 32,
  },
  climateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  climateCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  climateLabel: {
    fontSize: 14,
    color: '#4b5e87',
    marginBottom: 8,
  },
  climateValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#134e5e',
  },
  
  // Chart styles
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartYAxis: {
    position: 'absolute',
    left: 0,
    top: 16,
    bottom: 40,
    width: 40,
    justifyContent: 'space-between',
    paddingLeft: 6,
  },
  chartAxisLabel: {
    fontSize: 12,
    color: '#4b5e87',
  },
  chart: {
    height: 220,
    marginLeft: 40,
    marginBottom: 8,
  },
  chartInner: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 20,
  },
  chartBar: {
    width: 15,
    marginHorizontal: 2,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    backgroundColor: '#71B280',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  barSelected: {
    backgroundColor: '#FF9800',
  },
  chartLabel: {
    fontSize: 10,
    color: '#4b5e87',
    marginTop: 4,
    textAlign: 'center',
    transform: [{ rotate: '-45deg' }],
    position: 'absolute',
    bottom: -28,
    left: -10,
  },
  chartCaption: {
    textAlign: 'center',
    fontSize: 12,
    color: '#4b5e87',
    fontStyle: 'italic',
    marginTop: 20,
  },
  
  // Selected year details
  selectedYearCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedYearTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#134e5e',
    marginBottom: 12,
  },
  selectedYearDetails: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e7ff',
  },
  detailLabel: {
    fontSize: 16,
    color: '#4b5e87',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#134e5e',
  },
  
  // Table styles
  tableContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#134e5e',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  tableHeaderCell: {
    flex: 1,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e7ff',
  },
  tableRowEven: {
    backgroundColor: 'rgba(113, 178, 128, 0.05)',
  },
  tableRowOdd: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  tableRowSelected: {
    backgroundColor: 'rgba(255, 152, 0, 0.2)',
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
    color: '#4b5e87',
  },
});

export default ClimateInfoScreen;