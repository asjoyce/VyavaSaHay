import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedPlansScreen = () => {
  const staticPlans = [
    { id: 1, name: 'Spring 2025', crop: 'Wheat', area: '150 acres', date: 'Apr 15, 2025', executed: true },
    { id: 2, name: 'Summer Rotation', crop: 'Corn', area: '200 acres', date: 'Mar 20, 2025', executed: true },
  ];

  const [savedPlans, setSavedPlans] = useState([]);

  useEffect(() => {
    const loadSavedPlans = async () => {
      try {
        const plansFromStorage = await AsyncStorage.getItem('savedPlans');
        const parsedPlans = plansFromStorage ? JSON.parse(plansFromStorage) : [];
        setSavedPlans(parsedPlans);
      } catch (error) {
        console.error('Error loading saved plans:', error);
      }
    };

    loadSavedPlans();
  }, []);

  const allPlans = [...staticPlans, ...savedPlans];

  const styles = StyleSheet.create({
    mockScreen: {
      flex: 1,
      backgroundColor: '#F5F7FA',
      padding: 16,
    },
    debugText: {
      color: 'green',
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    headerTitle: {
      flex: 1,
      fontSize: 22,
      fontWeight: '700',
      color: '#333',
      textAlign: 'center',
    },
    contentContainer: {
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 16,
      color: '#212121',
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
    planStatus: {
      fontSize: 14,
      color: '#FF9800', // Default to "In Progress" color
      fontWeight: '500',
    },
    executedStatus: {
      color: '#4CAF50', // Executed plans in green
    },
  });

  return (
    <View style={styles.mockScreen}>
      <Text style={styles.debugText}>Saved Plans Screen (Outer)</Text>
      <View style={styles.header}>
        <Text style={styles.debugText}>Header</Text>
        <Text style={styles.headerTitle}>Saved Plans</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.debugText}>Content</Text>
        <Text style={styles.sectionTitle}>Your Saved Plans</Text>
        {allPlans.length === 0 ? (
          <Text style={styles.planDetails}>No plans available.</Text>
        ) : (
          allPlans.map((plan) => (
            <View key={plan.id} style={styles.planCard}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planDetails}>Crop: {plan.crop}, Area: {plan.area}</Text>
              <Text style={styles.planDate}>Created: {plan.date}</Text>
              <Text
                style={[
                  styles.planStatus,
                  plan.executed && styles.executedStatus, // Apply green color for executed plans
                ]}
              >
                Status: {plan.executed ? 'Executed' : 'In Progress'}
              </Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default SavedPlansScreen;