import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../utils/AuthContext';

const { width } = Dimensions.get('window');

const FarmProfileScreen = () => {
  const context = useContext(AuthContext);
  const userInfo = context?.userInfo || {
    name: 'John Farmer',
    farm: 'Green Valley Farm',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image 
              source={require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/images/icon.png')} // Relative path
              style={styles.farmImage}
              resizeMode="contain"
            />
            <View style={styles.farmNameContainer}>
              <Text style={styles.farmName}>{userInfo?.farm || 'Green Valley Farm'}</Text>
              <Text style={styles.farmerName}>
                Owner: {userInfo?.name || 'John Farmer'}
              </Text>
            </View>
          </View>
          
          <View style={styles.weatherContainer}>
            <Ionicons name="partly-sunny" size={38} color="#FF9800" />
            <View style={styles.weatherInfo}>
              <Text style={styles.temperature}>72°F</Text>
              <Text style={styles.weatherDescription}>Partly Cloudy</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="analytics-outline" size={24} color="#388E3C" />
            <Text style={styles.statValue}>320</Text>
            <Text style={styles.statLabel}>Acres</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Ionicons name="leaf-outline" size={24} color="#388E3C" />
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Crops</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Ionicons name="calendar-outline" size={24} color="#388E3C" />
            <Text style={styles.statValue}>1982</Text>
            <Text style={styles.statLabel}>Est.</Text>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#388E3C" />
            <Text style={styles.sectionTitle}>Farm Details</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoText}>Heartland County</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Area:</Text>
            <Text style={styles.infoText}>320 acres</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Established:</Text>
            <Text style={styles.infoText}>1982</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Soil Type:</Text>
            <Text style={styles.infoText}>Loam, Clay Loam</Text>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="leaf" size={24} color="#388E3C" />
            <Text style={styles.sectionTitle}>Current Operations</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Primary Crops:</Text>
            <Text style={styles.infoText}>Corn, Soybeans, Wheat</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Livestock:</Text>
            <Text style={styles.infoText}>50 head cattle</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Specialty:</Text>
            <Text style={styles.infoText}>Organic vegetables (15 acres)</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Active Fields:</Text>
            <Text style={styles.infoText}>12 fields currently in use</Text>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="analytics" size={24} color="#388E3C" />
            <Text style={styles.sectionTitle}>Historical Data</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Average Annual Yield:</Text>
            <Text style={styles.infoText}>175 bushels/acre</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Previous Rotations:</Text>
            <Text style={styles.infoText}>3-year standard</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Soil Improvements:</Text>
            <Text style={styles.infoText}>+12% organic matter since 2018</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>5-Year Production:</Text>
            <Text style={styles.infoText}>Growing at 3.5% annually</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Edit Farm Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F8E9',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#66BB6A',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  farmImage: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#66BB6A',
  },
  farmNameContainer: {
    flex: 1,
  },
  farmName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#388E3C',
    marginBottom: 6,
  },
  farmerName: {
    fontSize: 16,
    color: '#666666',
    fontStyle: 'italic',
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  weatherInfo: {
    marginLeft: 10,
  },
  temperature: {
    fontSize: 22,
    fontWeight: '600',
    color: '#455A64',
  },
  weatherDescription: {
    fontSize: 14,
    color: '#757575',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    width: '100%', // Ensure full screen width
    justifyContent: 'space-between', // Distribute items evenly
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  statItem: {
    flex: 1, // Equal distribution of space
    alignItems: 'center',
    paddingHorizontal: 5, // Small padding for breathing room
  },
  statValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#455A64',
    marginTop: 6,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: '85%',
    backgroundColor: '#B0BEC5',
    marginVertical: 'auto', // Center vertically
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#66BB6A',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#388E3C',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  infoLabel: {
    flex: 1.2,
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  infoText: {
    flex: 1.8,
    fontSize: 16,
    color: '#424242',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#388E3C',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default FarmProfileScreen;