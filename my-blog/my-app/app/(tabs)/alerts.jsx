import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertsScreen = () => {
  const alerts = [
    { id: 1, type: 'Weather', message: 'Heavy rain expected tomorrow', date: 'Apr 28, 2025' },
    { id: 2, type: 'Market', message: 'Wheat prices up by 5%', date: 'Apr 27, 2025' },
    { id: 3, type: 'Crop', message: 'Pest warning for corn fields', date: 'Apr 26, 2025' },
  ];

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
  });

  return (
    <View style={styles.mockScreen}>
      <Text style={styles.debugText}>Alerts Screen (Outer)</Text>
      <View style={styles.header}>
        <Text style={styles.debugText}>Header</Text>
        <Text style={styles.headerTitle}>Alerts</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.debugText}>Content</Text>
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
      </View>
    </View>
  );
};

export default AlertsScreen;