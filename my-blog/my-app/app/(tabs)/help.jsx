import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpScreen = () => {
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
    helpSection: {
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
    helpTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#4CAF50',
      marginBottom: 8,
    },
    helpText: {
      fontSize: 16,
      color: '#757575',
      lineHeight: 22,
    },
  });

  return (
    <View style={styles.mockScreen}>
      <Text style={styles.debugText}>Help Screen (Outer)</Text>
      <View style={styles.header}>
        <Text style={styles.debugText}>Header</Text>
        <Text style={styles.headerTitle}>Help</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.debugText}>Content</Text>
        <Text style={styles.sectionTitle}>FarmAssist Help Center</Text>
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>FAQs</Text>
          <Text style={styles.helpText}>Check our frequently asked questions for quick answers.</Text>
        </View>
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Contact Support</Text>
          <Text style={styles.helpText}>Email: support@farmassist.com</Text>
          <Text style={styles.helpText}>Phone: +1-800-555-1234</Text>
        </View>
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Tutorials</Text>
          <Text style={styles.helpText}>Watch our video guides on YouTube: [Link]</Text>
        </View>
      </View>
    </View>
  );
};

export default HelpScreen;