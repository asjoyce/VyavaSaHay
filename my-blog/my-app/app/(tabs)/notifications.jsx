import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  const notifications = [
    { id: 1, message: 'New weather alert received', date: 'Apr 28, 2025' },
    { id: 2, message: 'Plan updated successfully', date: 'Apr 27, 2025' },
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
    notificationCard: {
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
    notificationText: {
      fontSize: 16,
      color: '#333',
    },
  });

  return (
    <View style={styles.mockScreen}>
      <Text style={styles.debugText}>Notifications Screen (Outer)</Text>
      <View style={styles.header}>
        <Text style={styles.debugText}>Header</Text>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.debugText}>Content</Text>
        <Text style={styles.sectionTitle}>Your Notifications</Text>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <Text style={styles.notificationText}>{notification.message} - {notification.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default NotificationsScreen;