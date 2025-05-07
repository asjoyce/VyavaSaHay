import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedBackground from '../utils/AnimatedBackground';
const NewPlanScreen = ({ navigation }) => {
  const [planName, setPlanName] = useState('');
  const [cropType, setCropType] = useState('');
  const [area, setArea] = useState('');

  const handleSavePlan = () => {
    if (planName && cropType && area) {
      alert(`Plan Saved: ${planName} - ${cropType}, ${area} acres`);
      navigation.goBack();
    } else {
      alert('Please fill all fields');
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5F7FA', // Removed flex: 1 to test layout
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 32,
      minHeight: '100%', // Ensure content has space to render
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
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
    contentContainer: {
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 16,
      color: '#212121',
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
    debugText: {
      color: 'green',
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.debugText}>New Plan Screen (Outer)</Text>
        <View style={styles.header}>
          <Text style={styles.debugText}>Header</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Plan</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.debugText}>Content</Text>
          <Text style={styles.sectionTitle}>Create New Farm Plan</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="text" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Plan Name" value={planName} onChangeText={setPlanName} />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="leaf" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Crop Type" value={cropType} onChangeText={setCropType} />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="map" size={20} color="#757575" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Area (acres)" value={area} onChangeText={setArea} keyboardType="numeric" />
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSavePlan}>
            <Text style={styles.buttonText}>Save Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPlanScreen;