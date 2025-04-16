import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Modal,
  ScrollView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Sample data for Indian states and their agricultural regions
// In a production app, this would come from an API
const INDIAN_STATES = [
  { label: 'Punjab', value: 'punjab' },
  { label: 'Haryana', value: 'haryana' },
  { label: 'Uttar Pradesh', value: 'uttar_pradesh' },
  { label: 'West Bengal', value: 'west_bengal' },
  { label: 'Tamil Nadu', value: 'tamil_nadu' },
  { label: 'Karnataka', value: 'karnataka' },
  { label: 'Gujarat', value: 'gujarat' },
  { label: 'Maharashtra', value: 'maharashtra' },
  { label: 'Madhya Pradesh', value: 'madhya_pradesh' },
  { label: 'Bihar', value: 'bihar' },
  { label: 'Andhra Pradesh', value: 'andhra_pradesh' },
  { label: 'Telangana', value: 'telangana' },
  { label: 'Rajasthan', value: 'rajasthan' }
];

// Agricultural data by state
const STATE_DATA = {
  punjab: {
    name: 'Punjab',
    majorCrops: ['Wheat', 'Rice', 'Cotton', 'Maize'],
    transportHubs: [
      {
        id: 1,
        name: 'Ludhiana Market',
        type: 'Major Market',
        distance: 0,
        routes: [
          { destination: 'Amritsar Food Processing Hub', distance: 135, time: 150, cost: 4500 },
          { destination: 'Delhi NCR Distribution Center', distance: 310, time: 330, cost: 9800 },
          { destination: 'Chandigarh Regional Hub', distance: 100, time: 120, cost: 3200 }
        ]
      },
      {
        id: 2,
        name: 'Amritsar',
        type: 'Processing Hub',
        distance: 135,
        routes: [
          { destination: 'Ludhiana Market', distance: 135, time: 150, cost: 4500 },
          { destination: 'Jammu Distribution', distance: 115, time: 140, cost: 3800 },
          { destination: 'Pathankot Market', distance: 110, time: 130, cost: 3500 }
        ]
      },
      {
        id: 3,
        name: 'Jalandhar',
        type: 'Distribution Center',
        distance: 60,
        routes: [
          { destination: 'Ludhiana Market', distance: 60, time: 70, cost: 2000 },
          { destination: 'Amritsar Processing Hub', distance: 80, time: 100, cost: 2800 },
          { destination: 'Chandigarh Regional Hub', distance: 140, time: 160, cost: 4200 }
        ]
      }
    ],
    farmingRegions: [
      { name: 'Malwa', crops: ['Wheat', 'Cotton'], area: '1.2M hectares' },
      { name: 'Doaba', crops: ['Rice', 'Sugarcane'], area: '0.8M hectares' },
      { name: 'Majha', crops: ['Wheat', 'Rice'], area: '0.9M hectares' }
    ],
    transportModes: [
      { type: 'Trucks', availability: 'High', cost: '₹20/km' },
      { type: 'Rail Freight', availability: 'Medium', cost: '₹15/km' },
      { type: 'Cold Storage Vans', availability: 'Medium', cost: '₹25/km' }
    ]
  },
  haryana: {
    name: 'Haryana',
    majorCrops: ['Wheat', 'Rice', 'Sugarcane', 'Mustard'],
    transportHubs: [
      {
        id: 1,
        name: 'Karnal',
        type: 'Major Market',
        distance: 0,
        routes: [
          { destination: 'Delhi NCR Distribution', distance: 130, time: 150, cost: 4000 },
          { destination: 'Ambala Regional Hub', distance: 85, time: 100, cost: 2800 },
          { destination: 'Chandigarh Market', distance: 110, time: 130, cost: 3500 }
        ]
      },
      {
        id: 2,
        name: 'Panipat',
        type: 'Processing Hub',
        distance: 35,
        routes: [
          { destination: 'Karnal Market', distance: 35, time: 45, cost: 1200 },
          { destination: 'Delhi NCR Distribution', distance: 90, time: 110, cost: 3000 },
          { destination: 'Sonipat Market', distance: 45, time: 55, cost: 1500 }
        ]
      },
      {
        id: 3,
        name: 'Kurukshetra',
        type: 'Distribution Center',
        distance: 40,
        routes: [
          { destination: 'Karnal Market', distance: 40, time: 50, cost: 1300 },
          { destination: 'Ambala Regional Hub', distance: 45, time: 55, cost: 1500 },
          { destination: 'Yamunanagar Processing', distance: 40, time: 50, cost: 1300 }
        ]
      }
    ],
    farmingRegions: [
      { name: 'Khadar', crops: ['Rice', 'Vegetables'], area: '0.7M hectares' },
      { name: 'Bagar', crops: ['Wheat', 'Mustard'], area: '0.9M hectares' },
      { name: 'Nardak', crops: ['Sugarcane', 'Rice'], area: '0.6M hectares' }
    ],
    transportModes: [
      { type: 'Trucks', availability: 'High', cost: '₹18/km' },
      { type: 'Rail Freight', availability: 'High', cost: '₹14/km' },
      { type: 'Cold Storage Vans', availability: 'Medium', cost: '₹24/km' }
    ]
  },
  uttar_pradesh: {
    name: 'Uttar Pradesh',
    majorCrops: ['Wheat', 'Rice', 'Sugarcane', 'Potato'],
    transportHubs: [
      {
        id: 1,
        name: 'Lucknow',
        type: 'Major Market',
        distance: 0,
        routes: [
          { destination: 'Kanpur Distribution Center', distance: 80, time: 100, cost: 2600 },
          { destination: 'Varanasi Market', distance: 320, time: 360, cost: 9500 },
          { destination: 'Delhi NCR Hub', distance: 500, time: 540, cost: 15000 }
        ]
      },
      {
        id: 2,
        name: 'Kanpur',
        type: 'Processing Hub',
        distance: 80,
        routes: [
          { destination: 'Lucknow Market', distance: 80, time: 100, cost: 2600 },
          { destination: 'Agra Distribution', distance: 285, time: 320, cost: 8500 },
          { destination: 'Allahabad Market', distance: 200, time: 230, cost: 6000 }
        ]
      },
      {
        id: 3,
        name: 'Meerut',
        type: 'Distribution Center',
        distance: 450,
        routes: [
          { destination: 'Delhi NCR Hub', distance: 70, time: 90, cost: 2300 },
          { destination: 'Lucknow Market', distance: 450, time: 490, cost: 13500 },
          { destination: 'Moradabad Processing', distance: 100, time: 120, cost: 3000 }
        ]
      }
    ],
    farmingRegions: [
      { name: 'Western UP', crops: ['Sugarcane', 'Wheat'], area: '3.2M hectares' },
      { name: 'Central UP', crops: ['Wheat', 'Rice'], area: '2.8M hectares' },
      { name: 'Eastern UP', crops: ['Rice', 'Potato'], area: '2.5M hectares' }
    ],
    transportModes: [
      { type: 'Trucks', availability: 'Very High', cost: '₹19/km' },
      { type: 'Rail Freight', availability: 'High', cost: '₹13/km' },
      { type: 'Cold Storage Vans', availability: 'Medium', cost: '₹26/km' }
    ]
  },
  west_bengal: {
    name: 'West Bengal',
    majorCrops: ['Rice', 'Jute', 'Tea', 'Potato'],
    transportHubs: [
      {
        id: 1,
        name: 'Kolkata',
        type: 'Major Market',
        distance: 0,
        routes: [
          { destination: 'Siliguri Distribution', distance: 570, time: 630, cost: 17000 },
          { destination: 'Asansol Market', distance: 215, time: 240, cost: 6500 },
          { destination: 'Haldia Port', distance: 120, time: 150, cost: 3800 }
        ]
      },
      {
        id: 2,
        name: 'Siliguri',
        type: 'Processing Hub',
        distance: 570,
        routes: [
          { destination: 'Kolkata Market', distance: 570, time: 630, cost: 17000 },
          { destination: 'Jalpaiguri Tea Hub', distance: 40, time: 60, cost: 1300 },
          { destination: 'Guwahati Distribution', distance: 450, time: 540, cost: 13500 }
        ]
      },
      {
        id: 3,
        name: 'Bardhaman',
        type: 'Distribution Center',
        distance: 100,
        routes: [
          { destination: 'Kolkata Market', distance: 100, time: 120, cost: 3000 },
          { destination: 'Asansol Market', distance: 95, time: 110, cost: 2800 },
          { destination: 'Durgapur Processing', distance: 65, time: 80, cost: 2000 }
        ]
      }
    ],
    farmingRegions: [
      { name: 'Gangetic Plains', crops: ['Rice', 'Jute'], area: '2.1M hectares' },
      { name: 'Darjeeling', crops: ['Tea', 'Maize'], area: '0.5M hectares' },
      { name: 'Sundarbans', crops: ['Rice', 'Vegetables'], area: '0.8M hectares' }
    ],
    transportModes: [
      { type: 'Trucks', availability: 'High', cost: '₹20/km' },
      { type: 'Rail Freight', availability: 'High', cost: '₹14/km' },
      { type: 'Waterways', availability: 'Medium', cost: '₹12/km' }
    ]
  },
  tamil_nadu: {
    name: 'Tamil Nadu',
    majorCrops: ['Rice', 'Sugarcane', 'Cotton', 'Coconut'],
    transportHubs: [
      {
        id: 1,
        name: 'Chennai',
        type: 'Major Market',
        distance: 0,
        routes: [
          { destination: 'Coimbatore Distribution', distance: 500, time: 540, cost: 15000 },
          { destination: 'Madurai Market', distance: 450, time: 500, cost: 13500 },
          { destination: 'Salem Processing Hub', distance: 350, time: 400, cost: 10500 }
        ]
      },
      {
        id: 2,
        name: 'Coimbatore',
        type: 'Processing Hub',
        distance: 500,
        routes: [
          { destination: 'Chennai Market', distance: 500, time: 540, cost: 15000 },
          { destination: 'Madurai Market', distance: 170, time: 210, cost: 5100 },
          { destination: 'Palakkad Distribution', distance: 55, time: 75, cost: 1700 }
        ]
      },
      {
        id: 3,
        name: 'Madurai',
        type: 'Distribution Center',
        distance: 450,
        routes: [
          { destination: 'Chennai Market', distance: 450, time: 500, cost: 13500 },
          { destination: 'Coimbatore Processing', distance: 170, time: 210, cost: 5100 },
          { destination: 'Tirunelveli Market', distance: 150, time: 180, cost: 4500 }
        ]
      }
    ],
    farmingRegions: [
      { name: 'Cauvery Delta', crops: ['Rice', 'Sugarcane'], area: '1.2M hectares' },
      { name: 'Western TN', crops: ['Cotton', 'Maize'], area: '0.9M hectares' },
      { name: 'Coastal TN', crops: ['Coconut', 'Rice'], area: '0.8M hectares' }
    ],
    transportModes: [
      { type: 'Trucks', availability: 'Very High', cost: '₹21/km' },
      { type: 'Rail Freight', availability: 'High', cost: '₹15/km' },
      { type: 'Cold Storage Vans', availability: 'High', cost: '₹25/km' }
    ]
  },
  // Other states follow the same pattern...
  madhya_pradesh: {
    name: 'Madhya Pradesh',
    majorCrops: ['Wheat', 'Soybean', 'Maize', 'Pulses'],
    transportHubs: [
      {
        id: 1,
        name: 'Indore',
        type: 'Major Market',
        distance: 0,
        routes: [
          { destination: 'Bhopal Distribution', distance: 190, time: 230, cost: 5700 },
          { destination: 'Mumbai Market', distance: 580, time: 680, cost: 17400 },
          { destination: 'Ujjain Processing Hub', distance: 55, time: 70, cost: 1650 }
        ]
      },
      {
        id: 2,
        name: 'Bhopal',
        type: 'Processing Hub',
        distance: 190,
        routes: [
          { destination: 'Indore Market', distance: 190, time: 230, cost: 5700 },
          { destination: 'Jabalpur Distribution', distance: 295, time: 350, cost: 8850 },
          { destination: 'Nagpur Market', distance: 350, time: 430, cost: 10500 }
        ]
      },
      {
        id: 3,
        name: 'Jabalpur',
        type: 'Distribution Center',
        distance: 390,
        routes: [
          { destination: 'Bhopal Processing', distance: 295, time: 350, cost: 8850 },
          { destination: 'Indore Market', distance: 390, time: 450, cost: 11700 },
          { destination: 'Raipur Market', distance: 340, time: 410, cost: 10200 }
        ]
      }
    ],
    farmingRegions: [
      { name: 'Malwa Plateau', crops: ['Soybean', 'Wheat'], area: '2.4M hectares' },
      { name: 'Nimar Plains', crops: ['Cotton', 'Pulses'], area: '1.8M hectares' },
      { name: 'Vindhya Hills', crops: ['Wheat', 'Maize'], area: '1.5M hectares' }
    ],
    transportModes: [
      { type: 'Trucks', availability: 'High', cost: '₹19/km' },
      { type: 'Rail Freight', availability: 'Medium', cost: '₹15/km' },
      { type: 'Cold Storage Vans', availability: 'Low', cost: '₹27/km' }
    ]
  }
};

// In a real app, you would fetch this data from an API
const fetchStateData = (state) => {
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      resolve(STATE_DATA[state] || null);
    }, 1000);
  });
};

const TransportationScreen = () => {
  const [selectedState, setSelectedState] = useState('punjab');
  const [stateData, setStateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHub, setSelectedHub] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadStateData(selectedState);
  }, [selectedState]);

  const loadStateData = async (state) => {
    setIsLoading(true);
    const data = await fetchStateData(state);
    setStateData(data);
    setIsLoading(false);
  };

  const renderTransportHub = ({ item }) => (
    <TouchableOpacity 
      style={styles.hubCard}
      onPress={() => {
        setSelectedHub(item);
        setModalVisible(true);
      }}
    >
      <LinearGradient
        colors={['#ffffff', '#f4f9ff']}
        style={styles.hubCardGradient}
      >
        <View style={styles.hubCardHeader}>
          <View>
            <Text style={styles.hubName}>{item.name}</Text>
            <Text style={styles.hubType}>{item.type}</Text>
          </View>
          <View style={styles.distanceBadge}>
            <FontAwesome5 name="route" size={14} color="#3867d6" />
            <Text style={styles.distanceText}>{item.distance} km</Text>
          </View>
        </View>

        <View style={styles.routesPreview}>
          <Text style={styles.routesTitle}>Top Routes:</Text>
          {item.routes.slice(0, 2).map((route, idx) => (
            <View key={idx} style={styles.routePreviewItem}>
              <MaterialIcons name="arrow-forward" size={16} color="#7f8c8d" />
              <Text style={styles.routePreviewText}>{route.destination}</Text>
              <Text style={styles.routeDistance}>{route.distance} km</Text>
            </View>
          ))}
          <Text style={styles.viewMore}>+ {item.routes.length - 2} more routes</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedHub?.name}</Text>
            <Text style={styles.modalSubtitle}>{selectedHub?.type}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="#2c3e50" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>All Available Routes</Text>
              {selectedHub?.routes.map((route, idx) => (
                <View key={idx} style={styles.routeDetailCard}>
                  <Text style={styles.routeDestination}>{route.destination}</Text>
                  <View style={styles.routeDetailsRow}>
                    <View style={styles.routeDetail}>
                      <FontAwesome5 name="route" size={14} color="#3867d6" />
                      <Text style={styles.routeDetailText}>{route.distance} km</Text>
                    </View>
                    <View style={styles.routeDetail}>
                      <FontAwesome5 name="clock" size={14} color="#e67e22" />
                      <Text style={styles.routeDetailText}>{Math.floor(route.time / 60)}h {route.time % 60}m</Text>
                    </View>
                    <View style={styles.routeDetail}>
                      <FontAwesome5 name="rupee-sign" size={14} color="#27ae60" />
                      <Text style={styles.routeDetailText}>₹{route.cost}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Transportation Options</Text>
              {stateData?.transportModes.map((mode, idx) => (
                <View key={idx} style={styles.transportModeCard}>
                  <View style={styles.transportModeIcon}>
                    <FontAwesome5 
                      name={mode.type.includes('Truck') ? 'truck' : 
                           mode.type.includes('Rail') ? 'train' : 
                           mode.type.includes('Cold') ? 'temperature-low' : 'ship'} 
                      size={18} 
                      color="#3867d6" 
                    />
                  </View>
                  <View style={styles.transportModeDetails}>
                    <Text style={styles.transportModeType}>{mode.type}</Text>
                    <Text style={styles.transportModeInfo}>
                      Cost: {mode.cost} | Availability: {mode.availability}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Seasonal Considerations</Text>
              <View style={styles.seasonalCard}>
                <Text style={styles.seasonalText}>
                  • Monsoon (June-Sept): Expect delays on some routes due to flooding
                </Text>
                <Text style={styles.seasonalText}>
                  • Winter (Nov-Feb): Ideal time for transport with minimal disruptions
                </Text>
                <Text style={styles.seasonalText}>
                  • Summer (Mar-May): Higher refrigeration costs for perishables
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3867d6" />
        <Text style={styles.loadingText}>Loading transportation data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3867d6', '#5181e0']}
        style={styles.header}
      >
        <Text style={styles.title}>Agricultural Transportation</Text>
        <Text style={styles.subtitle}>Optimize routes to market</Text>
        
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: 'Select a state...', value: null }}
            value={selectedState}
            onValueChange={(value) => setSelectedState(value)}
            items={INDIAN_STATES}
            style={{
              inputIOS: styles.picker,
              inputAndroid: styles.picker,
              iconContainer: { top: 10, right: 12 },
            }}
            Icon={() => (
              <MaterialIcons name="arrow-drop-down" size={24} color="#2c3e50" />
            )}
          />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.stateInfoContainer}>
          <View style={styles.stateNameContainer}>
            <Text style={styles.stateName}>{stateData?.name}</Text>
            <View style={styles.cropBadges}>
              {stateData?.majorCrops.map((crop, index) => (
                <View key={index} style={styles.cropBadge}>
                  <Text style={styles.cropBadgeText}>{crop}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.farmingRegionsContainer}>
            <Text style={styles.regionTitle}>Major Farming Regions</Text>
            <FlatList
              data={stateData?.farmingRegions}
              keyExtractor={(item, index) => `region-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.regionCard}>
                  <Text style={styles.regionName}>{item.name}</Text>
                  <Text style={styles.regionCrops}>{item.crops.join(', ')}</Text>
                  <Text style={styles.regionArea}>{item.area}</Text>
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.transportHubsContainer}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>Transportation Hubs</Text>
            <Text style={styles.sectionSubheader}>Tap for route details</Text>
          </View>
          
          <FlatList
            data={stateData?.transportHubs}
            keyExtractor={(item) => `hub-${item.id}`}
            renderItem={renderTransportHub}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>

      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfe',
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3867d6',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 0,
    borderRadius: 10,
    color: '#2c3e50',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  stateInfoContainer: {
    marginBottom: 20,
  },
  stateNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  stateName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cropBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropBadge: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 5,
  },
  cropBadgeText: {
    fontSize: 12,
    color: '#3867d6',
    fontWeight: '500',
  },
  farmingRegionsContainer: {
    marginBottom: 10,
  },
  regionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  regionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  regionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  regionCrops: {
    fontSize: 13,
    color: '#34495e',
    marginBottom: 3,
  },
  regionArea: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  transportHubsContainer: {
    flex: 1,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  sectionSubheader: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  hubCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  hubCardGradient: {
    padding: 15,
    borderRadius: 12,
  },
  hubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  hubDetails: {
    fontSize: 13,
    color: '#34495e',
  },
});
export default TransportationScreen;