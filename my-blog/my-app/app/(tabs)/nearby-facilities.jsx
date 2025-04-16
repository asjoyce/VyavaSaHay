import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const NearbyFacilitiesScreen = () => {
  const [expandedStates, setExpandedStates] = useState({
    andhraPradesh: false,
    bihar: false,
    gujarat: false,
    haryana: false,
    karnataka: false,
    kerala: false,
    madhyaPradesh: false,
    maharashtra: false,
    punjab: false,
    rajasthan: false,
    tamilNadu: false,
    uttarPradesh: false,
    westBengal: false,
    otherStates: false,
  });

  const toggleState = (state) => {
    setExpandedStates((prev) => ({
      ...prev,
      [state]: !prev[state],
    }));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2ecc71', '#27ae60']}
        style={styles.header}
      >
        <Text style={styles.title}>Nearby Facilities</Text>
        <Text style={styles.subtitle}>Discover storage and supply centers across India</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Andhra Pradesh */}
        <Pressable onPress={() => toggleState('andhraPradesh')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Andhra Pradesh</Text>
            </View>
            <MaterialIcons
              name={expandedStates.andhraPradesh ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.andhraPradesh && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~20 miles</Text>
              <Text style={styles.infoText}>Warehousing (TCI): ~25 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~18 miles</Text>
              <Text style={styles.infoText}>Fertilizer Depot: ~22 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Bihar */}
        <Pressable onPress={() => toggleState('bihar')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Bihar</Text>
            </View>
            <MaterialIcons
              name={expandedStates.bihar ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.bihar && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~15 miles</Text>
              <Text style={styles.infoText}>Grain Storage (FCI): ~20 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Agricultural Co-op: ~12 miles</Text>
              <Text style={styles.infoText}>Fertilizer Depot: ~18 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Gujarat */}
        <Pressable onPress={() => toggleState('gujarat')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Gujarat</Text>
            </View>
            <MaterialIcons
              name={expandedStates.gujarat ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.gujarat && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~18 miles</Text>
              <Text style={styles.infoText}>Warehousing (Snowman): ~25 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~15 miles</Text>
              <Text style={styles.infoText}>Fertilizer Depot: ~20 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Haryana */}
        <Pressable onPress={() => toggleState('haryana')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Haryana</Text>
            </View>
            <MaterialIcons
              name={expandedStates.haryana ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.haryana && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~10 miles</Text>
              <Text style={styles.infoText}>Warehousing (HWC): ~15 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~12 miles</Text>
              <Text style={styles.infoText}>Agricultural Co-op: ~14 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Karnataka */}
        <Pressable onPress={() => toggleState('karnataka')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Karnataka</Text>
            </View>
            <MaterialIcons
              name={expandedStates.karnataka ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.karnataka && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~20 miles</Text>
              <Text style={styles.infoText}>Warehousing (Amazon FC): ~25 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~18 miles</Text>
              <Text style={styles.infoText}>Fertilizer Depot: ~22 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Kerala */}
        <Pressable onPress={() => toggleState('kerala')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Kerala</Text>
            </View>
            <MaterialIcons
              name={expandedStates.kerala ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.kerala && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~15 miles</Text>
              <Text style={styles.infoText}>Warehousing (Kerwacor): ~20 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~12 miles</Text>
              <Text style={styles.infoText}>Agricultural Co-op: ~18 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Madhya Pradesh */}
        <Pressable onPress={() => toggleState('madhyaPradesh')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Madhya Pradesh</Text>
            </View>
            <MaterialIcons
              name={expandedStates.madhyaPradesh ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.madhyaPradesh && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~20 miles</Text>
              <Text style={styles.infoText}>Warehousing (MPWLC): ~25 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~18 miles</Text>
              <Text style={styles.infoText}>Fertilizer Depot: ~22 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Maharashtra */}
        <Pressable onPress={() => toggleState('maharashtra')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Maharashtra</Text>
            </View>
            <MaterialIcons
              name={expandedStates.maharashtra ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.maharashtra && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~15 miles</Text>
              <Text style={styles.infoText}>Warehousing (TCI): ~20 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~12 miles</Text>
              <Text style={styles.infoText}>Fertilizer Depot: ~18 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Punjab */}
        <Pressable onPress={() => toggleState('punjab')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Punjab</Text>
            </View>
            <MaterialIcons
              name={expandedStates.punjab ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.punjab && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~10 miles</Text>
              <Text style={styles.infoText}>Grain Storage (FCI): ~15 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~12 miles</Text>
              <Text style={styles.infoText}>Agricultural Co-op: ~14 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Rajasthan */}
        <Pressable onPress={() => toggleState('rajasthan')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Rajasthan</Text>
            </View>
            <MaterialIcons
              name={expandedStates.rajasthan ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.rajasthan && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~20 miles</Text>
              <Text style={styles.infoText}>Warehousing (RSWC): ~25 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~18 miles</Text>
              <Text style={styles.infoText}>Fertilizer Depot: ~22 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Tamil Nadu */}
        <Pressable onPress={() => toggleState('tamilNadu')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Tamil Nadu</Text>
            </View>
            <MaterialIcons
              name={expandedStates.tamilNadu ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.tamilNadu && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~15 miles</Text>
              <Text style={styles.infoText}>Warehousing (Amazon FC): ~20 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~12 miles</Text>
              <Text style={styles.infoText}>Fertilizer Depot: ~18 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Uttar Pradesh */}
        <Pressable onPress={() => toggleState('uttarPradesh')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Uttar Pradesh</Text>
            </View>
            <MaterialIcons
              name={expandedStates.uttarPradesh ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.uttarPradesh && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~10 miles</Text>
              <Text style={styles.infoText}>Grain Storage (FCI): ~15 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~12 miles</Text>
              <Text style={styles.infoText}>Agricultural Co-op: ~14 miles</Text>
            </View>
          )}
        </Pressable>

        {/* West Bengal */}
        <Pressable onPress={() => toggleState('westBengal')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>West Bengal</Text>
            </View>
            <MaterialIcons
              name={expandedStates.westBengal ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.westBengal && (
            <View style={styles.cardBody}>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="warehouse" size={16} color="#27ae60" /> Storage Facilities
              </Text>
              <Text style={styles.infoText}>Cold Storage Facility: ~15 miles</Text>
              <Text style={styles.infoText}>Warehousing (Amazon FC): ~20 miles</Text>
              <Text style={styles.infoTitle}>
                <FontAwesome5 name="seedling" size={16} color="#27ae60" /> Supply Centers
              </Text>
              <Text style={styles.infoText}>Seed Supplier: ~12 miles</Text>
              <Text style={styles.infoText}>Fertilizer Depot: ~18 miles</Text>
            </View>
          )}
        </Pressable>

        {/* Other States */}
        <Pressable onPress={() => toggleState('otherStates')} style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}>
          <View style={styles.cardHeader}>
            <View style={styles.stateIconContainer}>
              <MaterialIcons name="location-on" size={20} color="#2c3e50" />
              <Text style={styles.cardTitle}>Other States</Text>
            </View>
            <MaterialIcons
              name={expandedStates.otherStates ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedStates.otherStates && (
            <View style={styles.cardBody}>
              <Text style={styles.infoText}>Cold Storage and Supply Centers vary by region. Contact local agricultural boards for details.</Text>
            </View>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfd',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#e0f7f9',
    textAlign: 'center',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#2ecc71',
  },
  cardPressed: {
    backgroundColor: '#f1faf5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#e8f4f0',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  stateIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 8,
  },
  cardBody: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#27ae60',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 6,
    lineHeight: 20,
  },
});
export default NearbyFacilitiesScreen;