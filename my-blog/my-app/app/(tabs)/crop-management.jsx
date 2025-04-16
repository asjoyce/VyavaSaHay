// screens/CropManagementScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Modal,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock data for crops
const initialCrops = [
  {
    id: '1',
    name: 'Corn',
    variety: 'Sweet Corn XR-27',
    plantedDate: '2025-03-15',
    harvestDate: '2025-08-20',
    acreage: 120,
    status: 'Growing',
    yield: '-- bushels',
    health: 'Good',
    fertilizer: 'NPK 14-14-14',
    pesticides: 'Organic pest control',
    image: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/corn.png'),
  },
  {
    id: '2',
    name: 'Soybeans',
    variety: 'Round-Ready SR9',
    plantedDate: '2025-04-05',
    harvestDate: '2025-09-15',
    acreage: 95,
    status: 'Growing',
    yield: '-- bushels',
    health: 'Excellent',
    fertilizer: 'NPK 10-20-20',
    pesticides: 'Standard treatment',
    image: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/soybean.png'),
  },
  {
    id: '3',
    name: 'Wheat',
    variety: 'Winter Wheat HRW',
    plantedDate: '2024-10-10',
    harvestDate: '2025-07-01',
    acreage: 85,
    status: 'Growing',
    yield: '-- bushels',
    health: 'Fair',
    fertilizer: 'NPK 20-10-10',
    pesticides: 'Minimal treatment',
    image: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/wheat.png'),
  },
  {
    id: '4',
    name: 'Organic Vegetables',
    variety: 'Mixed varieties',
    plantedDate: '2025-04-10',
    harvestDate: '2025-07-15',
    acreage: 15,
    status: 'Growing',
    yield: '-- tons',
    health: 'Good',
    fertilizer: 'Organic compost',
    pesticides: 'None',
    image: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/vegetables.png'),
  },
];

const CropManagementScreen = () => {
  const [crops, setCrops] = useState(initialCrops);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [addCropModal, setAddCropModal] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    variety: '',
    plantedDate: '',
    harvestDate: '',
    acreage: '',
    fertilizer: '',
    pesticides: '',
  });
  
  const openCropDetails = (crop) => {
    setSelectedCrop(crop);
    setModalVisible(true);
  };
  
  const closeCropDetails = () => {
    setModalVisible(false);
  };
  
  const openAddCropModal = () => {
    setAddCropModal(true);
  };
  
  const closeAddCropModal = () => {
    setAddCropModal(false);
    setNewCrop({
      name: '',
      variety: '',
      plantedDate: '',
      harvestDate: '',
      acreage: '',
      fertilizer: '',
      pesticides: '',
    });
  };
  
  const handleAddCrop = () => {
    // Basic validation
    if (!newCrop.name || !newCrop.variety || !newCrop.acreage) {
      alert('Please fill in the required fields');
      return;
    }
    
    const crop = {
      id: (crops.length + 1).toString(),
      ...newCrop,
      status: 'Planned',
      health: 'Not planted',
      yield: '-- bushels',
      image: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/images/icon.png'), // Default image
    };
    
    setCrops([...crops, crop]);
    closeAddCropModal();
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Growing':
        return '#4CAF50';
      case 'Harvested':
        return '#FF9800';
      case 'Planned':
        return '#2196F3';
      default:
        return '#757575';
    }
  };
  
  const getHealthIcon = (health) => {
    switch (health) {
      case 'Excellent':
        return 'checkmark-circle';
      case 'Good':
        return 'checkmark-circle-outline';
      case 'Fair':
        return 'alert-circle-outline';
      case 'Poor':
        return 'warning-outline';
      default:
        return 'help-circle-outline';
    }
  };
  
  const getHealthColor = (health) => {
    switch (health) {
      case 'Excellent':
        return '#4CAF50';
      case 'Good':
        return '#8BC34A';
      case 'Fair':
        return '#FFC107';
      case 'Poor':
        return '#FF5722';
      default:
        return '#757575';
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crop Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={openAddCropModal}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Crop Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{crops.length}</Text>
              <Text style={styles.statLabel}>Total Crops</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {crops.reduce((acc, crop) => acc + parseInt(crop.acreage || 0), 0)}
              </Text>
              <Text style={styles.statLabel}>Total Acres</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {crops.filter(crop => crop.status === 'Growing').length}
              </Text>
              <Text style={styles.statLabel}>Growing</Text>
            </View>
          </View>
        </View>
        
        {crops.map((crop) => (
          <TouchableOpacity 
            key={crop.id} 
            style={styles.cropCard}
            onPress={() => openCropDetails(crop)}
          >
            <Image source={crop.image} style={styles.cropImage} />
            
            <View style={styles.cropInfo}>
              <Text style={styles.cropName}>{crop.name}</Text>
              
              <View style={styles.cropDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="leaf-outline" size={16} color="#757575" />
                  <Text style={styles.detailText}>{crop.variety}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons name="resize-outline" size={16} color="#757575" />
                  <Text style={styles.detailText}>{crop.acreage} acres</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons 
                    name={getHealthIcon(crop.health)} 
                    size={16} 
                    color={getHealthColor(crop.health)} 
                  />
                  <Text style={[styles.detailText, { color: getHealthColor(crop.health) }]}>
                    {crop.health}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(crop.status) }]}>
                <Text style={styles.statusText}>{crop.status}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#BBBBBB" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Crop Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeCropDetails}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedCrop?.name}</Text>
              <TouchableOpacity onPress={closeCropDetails}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            
            {selectedCrop && (
              <ScrollView style={styles.modalScrollView}>
                <Image source={selectedCrop.image} style={styles.modalImage} />
                
                <View style={styles.modalSection}>
                  <View style={styles.modalSectionHeader}>
                    <Ionicons name="information-circle-outline" size={20} color="#2E7D32" />
                    <Text style={styles.modalSectionTitle}>Basic Information</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Variety:</Text>
                    <Text style={styles.infoValue}>{selectedCrop.variety}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status:</Text>
                    <View style={[styles.statusBadgeSmall, { backgroundColor: getStatusColor(selectedCrop.status) }]}>
                      <Text style={styles.statusTextSmall}>{selectedCrop.status}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Health:</Text>
                    <View style={styles.healthContainer}>
                      <Ionicons 
                        name={getHealthIcon(selectedCrop.health)} 
                        size={16} 
                        color={getHealthColor(selectedCrop.health)} 
                      />
                      <Text style={[styles.healthText, { color: getHealthColor(selectedCrop.health) }]}>
                        {selectedCrop.health}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Acreage:</Text>
                    <Text style={styles.infoValue}>{selectedCrop.acreage} acres</Text>
                  </View>
                </View>
                
                <View style={styles.modalSection}>
                  <View style={styles.modalSectionHeader}>
                    <Ionicons name="calendar-outline" size={20} color="#2E7D32" />
                    <Text style={styles.modalSectionTitle}>Timeline</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Planted:</Text>
                    <Text style={styles.infoValue}>{selectedCrop.plantedDate}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Harvest:</Text>
                    <Text style={styles.infoValue}>{selectedCrop.harvestDate}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Days to Harvest:</Text>
                    <Text style={styles.infoValue}>
                      {selectedCrop.status === 'Harvested' ? 
                        'Completed' : 
                        Math.ceil((new Date(selectedCrop.harvestDate) - new Date()) / (1000 * 60 * 60 * 24)) + ' days'
                      }
                    </Text>
                  </View>
                </View>
                
                <View style={styles.modalSection}>
                  <View style={styles.modalSectionHeader}>
                    <Ionicons name="flask-outline" size={20} color="#2E7D32" />
                    <Text style={styles.modalSectionTitle}>Inputs & Treatments</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Fertilizer:</Text>
                    <Text style={styles.infoValue}>{selectedCrop.fertilizer}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Pesticides:</Text>
                    <Text style={styles.infoValue}>{selectedCrop.pesticides}</Text>
                  </View>
                </View>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="create-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Edit Details</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.actionButton, styles.recordButton]}>
                    <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Record Activity</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Add New Crop Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addCropModal}
        onRequestClose={closeAddCropModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Crop</Text>
              <TouchableOpacity onPress={closeAddCropModal}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Crop Name*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Corn, Wheat, Soybeans"
                  value={newCrop.name}
                  onChangeText={(text) => setNewCrop({...newCrop, name: text})}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Variety/Seed Type*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Sweet Corn XR-27"
                  value={newCrop.variety}
                  onChangeText={(text) => setNewCrop({...newCrop, variety: text})}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Acreage*</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Number of acres"
                  keyboardType="numeric"
                  value={newCrop.acreage}
                  onChangeText={(text) => setNewCrop({...newCrop, acreage: text})}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Planting Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={newCrop.plantedDate}
                  onChangeText={(text) => setNewCrop({...newCrop, plantedDate: text})}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Expected Harvest Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={newCrop.harvestDate}
                  onChangeText={(text) => setNewCrop({...newCrop, harvestDate: text})}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Fertilizer Plan</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., NPK 14-14-14"
                  value={newCrop.fertilizer}
                  onChangeText={(text) => setNewCrop({...newCrop, fertilizer: text})}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Pest Control Plan</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Organic pest control"
                  value={newCrop.pesticides}
                  onChangeText={(text) => setNewCrop({...newCrop, pesticides: text})}
                />
              </View>
              
              <TouchableOpacity 
                style={styles.addCropButton}
                onPress={handleAddCrop}
              >
                <Text style={styles.addCropButtonText}>Add Crop</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 12,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
  },
  cropCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cropImage: {
    width: 90,
    height: 90,
  },
  cropInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 6,
  },
  cropDetails: {
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 6,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#424242',
  },
  modalScrollView: {
    padding: 16,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#757575',
  },
  infoValue: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },
  statusBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusTextSmall: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  healthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  recordButton: {
    backgroundColor: '#FF9800',
    marginRight: 0,
    marginLeft: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  addCropButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  addCropButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CropManagementScreen;