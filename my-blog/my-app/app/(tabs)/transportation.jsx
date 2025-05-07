import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

// Sample data for Indian states and their agricultural regions
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
  { label: 'Rajasthan', value: 'rajasthan' },
];

// Agricultural data by state
const STATE_DATA = {
  punjab: {
    name: 'Punjab',
    majorCrops: ['Wheat', 'Rice', 'Cotton', 'Maize'],
    transportHubs: [
      { id: 1, name: 'Ludhiana Market', type: 'Major Market', distance: 0, routes: [{ destination: 'Amritsar Food Processing Hub', distance: 135, time: 150, cost: 4500 }, { destination: 'Delhi NCR Distribution Center', distance: 310, time: 330, cost: 9800 }, { destination: 'Chandigarh Regional Hub', distance: 100, time: 120, cost: 3200 }] },
      { id: 2, name: 'Amritsar', type: 'Processing Hub', distance: 135, routes: [{ destination: 'Ludhiana Market', distance: 135, time: 150, cost: 4500 }, { destination: 'Jammu Distribution', distance: 115, time: 140, cost: 3800 }, { destination: 'Pathankot Market', distance: 110, time: 130, cost: 3500 }] },
      { id: 3, name: 'Jalandhar', type: 'Distribution Center', distance: 60, routes: [{ destination: 'Ludhiana Market', distance: 60, time: 70, cost: 2000 }, { destination: 'Amritsar Processing Hub', distance: 80, time: 100, cost: 2800 }, { destination: 'Chandigarh Regional Hub', distance: 140, time: 160, cost: 4200 }] },
    ],
    farmingRegions: [
      { name: 'Malwa', crops: ['Wheat', 'Cotton'], area: '1.2M hectares' },
      { name: 'Doaba', crops: ['Rice', 'Sugarcane'], area: '0.8M hectares' },
      { name: 'Majha', crops: ['Wheat', 'Rice'], area: '0.9M hectares' },
    ],
    transportModes: [
      { type: 'Trucks', availability: 'High', cost: '₹20/km' },
      { type: 'Rail Freight', availability: 'Medium', cost: '₹15/km' },
      { type: 'Cold Storage Vans', availability: 'Medium', cost: '₹25/km' },
    ],
  },
  haryana: {
    name: 'Haryana',
    majorCrops: ['Wheat', 'Rice', 'Sugarcane', 'Mustard'],
    transportHubs: [
      { id: 1, name: 'Karnal', type: 'Major Market', distance: 0, routes: [{ destination: 'Delhi NCR Distribution', distance: 130, time: 150, cost: 4000 }, { destination: 'Ambala Regional Hub', distance: 85, time: 100, cost: 2800 }, { destination: 'Chandigarh Market', distance: 110, time: 130, cost: 3500 }] },
      { id: 2, name: 'Panipat', type: 'Processing Hub', distance: 35, routes: [{ destination: 'Karnal Market', distance: 35, time: 45, cost: 1200 }, { destination: 'Delhi NCR Distribution', distance: 90, time: 110, cost: 3000 }, { destination: 'Sonipat Market', distance: 45, time: 55, cost: 1500 }] },
      { id: 3, name: 'Kurukshetra', type: 'Distribution Center', distance: 40, routes: [{ destination: 'Karnal Market', distance: 40, time: 50, cost: 1300 }, { destination: 'Ambala Regional Hub', distance: 45, time: 55, cost: 1500 }, { destination: 'Yamunanagar Processing', distance: 40, time: 50, cost: 1300 }] },
    ],
    farmingRegions: [
      { name: 'Khadar', crops: ['Rice', 'Vegetables'], area: '0.7M hectares' },
      { name: 'Bagar', crops: ['Wheat', 'Mustard'], area: '0.9M hectares' },
      { name: 'Nardak', crops: ['Sugarcane', 'Rice'], area: '0.6M hectares' },
    ],
    transportModes: [
      { type: 'Trucks', availability: 'High', cost: '₹18/km' },
      { type: 'Rail Freight', availability: 'High', cost: '₹14/km' },
      { type: 'Cold Storage Vans', availability: 'Medium', cost: '₹24/km' },
    ],
  },
  // ... (other states remain the same as in your original code)
};

const fetchStateData = (state) => {
  return new Promise((resolve) => {
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
    <Animatable.View
      animation="fadeInUp"
      duration={600}
      delay={100}
      style={styles.hubCard}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setSelectedHub(item);
          setModalVisible(true);
        }}
      >
        <LinearGradient
          colors={['#4a90e2', '#63b8ff']}
          style={styles.hubCardGradient}
        >
          <View style={styles.hubCardHeader}>
            <View>
              <Text style={styles.hubName}>{item.name}</Text>
              <Text style={styles.hubType}>{item.type}</Text>
            </View>
            <View style={styles.distanceBadge}>
              <FontAwesome5 name="map-marker-alt" size={14} color="#fff" />
              <Text style={styles.distanceText}>{item.distance} km</Text>
            </View>
          </View>

          <View style={styles.routesPreview}>
            <Text style={styles.routesTitle}>Top Routes:</Text>
            {item.routes.slice(0, 2).map((route, idx) => (
              <Animatable.View
                key={idx}
                animation="fadeInLeft"
                duration={400}
                delay={idx * 100}
                style={styles.routePreviewItem}
              >
                <MaterialIcons name="navigation" size={16} color="#7f8c8d" />
                <Text style={styles.routePreviewText}>{route.destination}</Text>
                <Text style={styles.routeDistance}>{route.distance} km</Text>
              </Animatable.View>
            ))}
            <Text style={styles.viewMore}>+ {item.routes.length - 2} more routes</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Animatable.View
        animation="slideInUp"
        duration={400}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['#4a90e2', '#63b8ff']}
            style={styles.modalHeader}
          >
            <View>
              <Text style={styles.modalTitle}>{selectedHub?.name}</Text>
              <Text style={styles.modalSubtitle}>{selectedHub?.type}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>

          <FlatList
            style={styles.modalBody}
            data={[
              { type: 'routes', data: selectedHub?.routes || [] },
              { type: 'transportModes', data: stateData?.transportModes || [] },
              { type: 'seasonal', data: null },
            ]}
            keyExtractor={(item, index) => `modal-section-${index}`}
            renderItem={({ item }) => {
              if (item.type === 'routes') {
                return (
                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>All Available Routes <MaterialIcons name="route" size={18} color="#4a90e2" /></Text>
                    {item.data.map((route, idx) => (
                      <Animatable.View
                        key={idx}
                        animation="fadeInLeft"
                        duration={400}
                        delay={idx * 100}
                        style={styles.routeDetailCard}
                      >
                        <Text style={styles.routeDestination}>{route.destination}</Text>
                        <View style={styles.routeDetailsRow}>
                          <View style={styles.routeDetail}>
                            <FontAwesome5 name="map-marker-alt" size={14} color="#4a90e2" />
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
                      </Animatable.View>
                    ))}
                  </View>
                );
              } else if (item.type === 'transportModes') {
                return (
                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Transportation Options <FontAwesome5 name="truck" size={18} color="#4a90e2" /></Text>
                    {item.data.map((mode, idx) => (
                      <Animatable.View
                        key={idx}
                        animation="fadeInRight"
                        duration={400}
                        delay={idx * 100}
                        style={styles.transportModeCard}
                      >
                        <View style={styles.transportModeIcon}>
                          <FontAwesome5
                            name={mode.type.includes('Truck') ? 'truck' : mode.type.includes('Rail') ? 'train' : mode.type.includes('Cold') ? 'temperature-low' : 'ship'}
                            size={18}
                            color="#4a90e2"
                          />
                        </View>
                        <View style={styles.transportModeDetails}>
                          <Text style={styles.transportModeType}>{mode.type}</Text>
                          <Text style={styles.transportModeInfo}>
                            Cost: {mode.cost} | Availability: {mode.availability}
                          </Text>
                        </View>
                      </Animatable.View>
                    ))}
                  </View>
                );
              } else if (item.type === 'seasonal') {
                return (
                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Seasonal Considerations <MaterialIcons name="wb-sunny" size={18} color="#4a90e2" /></Text>
                    <Animatable.View animation="fadeIn" duration={400} style={styles.seasonalCard}>
                      <Text style={styles.seasonalText}>• Monsoon (June-Sept): Expect delays on some routes due to flooding</Text>
                      <Text style={styles.seasonalText}>• Winter (Nov-Feb): Ideal time for transport with minimal disruptions</Text>
                      <Text style={styles.seasonalText}>• Summer (Mar-May): Higher refrigeration costs for perishables</Text>
                    </Animatable.View>
                  </View>
                );
              }
              return null;
            }}
          />
        </View>
      </Animatable.View>
    </Modal>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Loading transportation data...</Text>
      </View>
    );
  }

  const sections = [
    { type: 'stateInfo', data: stateData },
    { type: 'farmingRegions', data: stateData?.farmingRegions || [] },
    { type: 'transportHubs', data: stateData?.transportHubs || [] },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4a90e2', '#63b8ff']}
        style={styles.header}
      >
        <Text style={styles.title}>Agricultural Transportation <FontAwesome5 name="tractor" size={24} color="#fff" /></Text>
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

      <FlatList
        style={styles.content}
        data={sections}
        keyExtractor={(item, index) => `section-${index}`}
        renderItem={({ item }) => {
          if (item.type === 'stateInfo') {
            return (
              <Animatable.View animation="fadeIn" duration={600} style={styles.stateInfoContainer}>
                <View style={styles.stateNameContainer}>
                  <Text style={styles.stateName}>{stateData?.name}</Text>
                  <View style={styles.cropBadges}>
                    {stateData?.majorCrops.map((crop, index) => (
                      <Animatable.View
                        key={index}
                        animation="bounceIn"
                        duration={400}
                        delay={index * 100}
                        style={styles.cropBadge}
                      >
                        <Text style={styles.cropBadgeText}>{crop}</Text>
                      </Animatable.View>
                    ))}
                  </View>
                </View>
              </Animatable.View>
            );
          } else if (item.type === 'farmingRegions') {
            return (
              <View style={styles.farmingRegionsContainer}>
                <Text style={styles.regionTitle}>Major Farming Regions <FontAwesome5 name="leaf" size={18} color="#4a90e2" /></Text>
                <FlatList
                  data={item.data}
                  keyExtractor={(region, index) => `region-${index}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item: region }) => (
                    <Animatable.View
                      animation="fadeInRight"
                      duration={600}
                      delay={100}
                      style={styles.regionCard}
                    >
                      <Text style={styles.regionName}>{region.name}</Text>
                      <Text style={styles.regionCrops}>{region.crops.join(', ')}</Text>
                      <Text style={styles.regionArea}>{region.area}</Text>
                    </Animatable.View>
                  )}
                />
              </View>
            );
          } else if (item.type === 'transportHubs') {
            return (
              <View style={styles.transportHubsContainer}>
                <View style={styles.sectionHeaderContainer}>
                  <Text style={styles.sectionHeader}>Transportation Hubs <MaterialIcons name="location-on" size={20} color="#4a90e2" /></Text>
                  <Text style={styles.sectionSubheader}>Tap for route details</Text>
                </View>
                <FlatList
                  data={item.data}
                  keyExtractor={(hub) => `hub-${hub.id}`}
                  renderItem={renderTransportHub}
                  scrollEnabled={false} // Disable nested scrolling since parent FlatList handles it
                />
              </View>
            );
          }
          return null;
        }}
      />

      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: '500',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    color: '#2c3e50',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  stateInfoContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stateNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  stateName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
  },
  cropBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  cropBadge: {
    backgroundColor: '#e6f0fa',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginLeft: 8,
    marginBottom: 8,
  },
  cropBadgeText: {
    fontSize: 12,
    color: '#4a90e2',
    fontWeight: '500',
  },
  farmingRegionsContainer: {
    marginBottom: 20,
  },
  regionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  regionCard: {
    backgroundColor: '#f9fbfd',
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  regionCrops: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 4,
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
    fontSize: 20,
    fontWeight: '700',
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  hubCardGradient: {
    padding: 15,
    borderRadius: 12,
  },
  hubCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hubName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  hubType: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  distanceText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  routesPreview: {
    marginTop: 10,
  },
  routesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  routePreviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  routePreviewText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 8,
    flex: 1,
  },
  routeDistance: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  viewMore: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  modalSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  closeButton: {
    padding: 8,
  },
  modalBody: {
    padding: 20,
  },
  modalSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  routeDetailCard: {
    backgroundColor: '#f5f7fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  routeDestination: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  routeDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDetailText: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 6,
  },
  transportModeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transportModeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6f0fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transportModeDetails: {
    marginLeft: 12,
    flex: 1,
  },
  transportModeType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  transportModeInfo: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  seasonalCard: {
    backgroundColor: '#f5f7fa',
    padding: 12,
    borderRadius: 10,
  },
  seasonalText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default TransportationScreen;