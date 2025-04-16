import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const OptimizationModelsScreen = () => {
  const [expandedSections, setExpandedSections] = useState({
    cropRotation: true,
    resourceAllocation: false,
    financialModeling: false,
    simplex: false,
    integerProgramming: false,
    transportation: false,
    goalProgramming: false,
    quadraticProgramming: false,
    dynamicProgramming: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4a90e2', '#63b3ed']}
        style={styles.header}
      >
        <Text style={styles.title}>Optimization Models</Text>
        <Text style={styles.subtitle}>Advanced Planning Algorithms</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Existing Sections */}
        <Pressable onPress={() => toggleSection('cropRotation')} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Crop Rotation Model</Text>
            <MaterialIcons
              name={expandedSections.cropRotation ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedSections.cropRotation && (
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Recommended Rotation: Corn → Soybeans → Wheat</Text>
              <Text style={styles.cardText}>Estimated Yield Increase: 18%</Text>
              <Text style={styles.cardText}>Soil Health Improvement: High</Text>
            </View>
          )}
        </Pressable>

        <Pressable onPress={() => toggleSection('resourceAllocation')} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Resource Allocation</Text>
            <MaterialIcons
              name={expandedSections.resourceAllocation ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedSections.resourceAllocation && (
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Water Usage Optimization: 75% efficiency</Text>
              <Text style={styles.cardText}>Fertilizer Application Plan: Precision mapping</Text>
              <Text style={styles.cardText}>Labor Distribution: Optimized by season</Text>
            </View>
          )}
        </Pressable>

        <Pressable onPress={() => toggleSection('financialModeling')} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Financial Modeling</Text>
            <MaterialIcons
              name={expandedSections.financialModeling ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedSections.financialModeling && (
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>ROI Projection: 22% annual</Text>
              <Text style={styles.cardText}>Cost-Benefit Analysis: Positive</Text>
              <Text style={styles.cardText}>Risk Assessment: Moderate</Text>
            </View>
          )}
        </Pressable>

        {/* New Optimization Engine Sections */}
        <Pressable onPress={() => toggleSection('simplex')} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Simplex Model</Text>
            <MaterialIcons
              name={expandedSections.simplex ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedSections.simplex && (
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Objective: Maximize yield based on land, water, and budget</Text>
              <Text style={styles.cardText}>Method: Linear programming with iterative optimization</Text>
              <Text style={styles.cardText}>Benefit: Efficient resource utilization</Text>
            </View>
          )}
        </Pressable>

        <Pressable onPress={() => toggleSection('integerProgramming')} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Integer Programming</Text>
            <MaterialIcons
              name={expandedSections.integerProgramming ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedSections.integerProgramming && (
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Objective: Ensure whole-number crop quantities</Text>
              <Text style={styles.cardText}>Method: Constraint-based integer solutions</Text>
              <Text style={styles.cardText}>Benefit: Practical crop planning</Text>
            </View>
          )}
        </Pressable>

        <Pressable onPress={() => toggleSection('transportation')} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Transportation Model</Text>
            <MaterialIcons
              name={expandedSections.transportation ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedSections.transportation && (
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Objective: Plan cheapest/fastest route to storage or market</Text>
              <Text style={styles.cardText}>Method: Network optimization</Text>
              <Text style={styles.cardText}>Benefit: Cost and time efficiency</Text>
            </View>
          )}
        </Pressable>

        <Pressable onPress={() => toggleSection('goalProgramming')} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Goal Programming</Text>
            <MaterialIcons
              name={expandedSections.goalProgramming ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedSections.goalProgramming && (
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Objective: Balance yield, water usage, and profit</Text>
              <Text style={styles.cardText}>Method: Multi-objective optimization</Text>
              <Text style={styles.cardText}>Benefit: Sustainable trade-offs</Text>
            </View>
          )}
        </Pressable>

        <Pressable onPress={() => toggleSection('quadraticProgramming')} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Quadratic Programming</Text>
            <MaterialIcons
              name={expandedSections.quadraticProgramming ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedSections.quadraticProgramming && (
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Objective: Optimize input levels (e.g., fertilizer-water tradeoff)</Text>
              <Text style={styles.cardText}>Method: Quadratic cost functions</Text>
              <Text style={styles.cardText}>Benefit: Precise resource management</Text>
            </View>
          )}
        </Pressable>

        <Pressable onPress={() => toggleSection('dynamicProgramming')} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Dynamic Programming</Text>
            <MaterialIcons
              name={expandedSections.dynamicProgramming ? 'expand-less' : 'expand-more'}
              size={24}
              color="#2c3e50"
            />
          </View>
          {expandedSections.dynamicProgramming && (
            <View style={styles.cardBody}>
              <Text style={styles.cardText}>Objective: Plan crop cycles across multiple seasons</Text>
              <Text style={styles.cardText}>Method: Sequential decision-making</Text>
              <Text style={styles.cardText}>Benefit: Long-term strategic planning</Text>
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
    backgroundColor: '#f5f7fa',
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
    color: '#d3e0f0',
    textAlign: 'center',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f4f8',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  cardBody: {
    padding: 15,
  },
  cardText: {
    fontSize: 15,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 22,
  },
});
export default OptimizationModelsScreen;