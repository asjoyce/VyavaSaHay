import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Simple quadratic programming model for resource optimization
const optimizeResources = (cropType, soilType, areaSize) => {
  // These would be based on real models in production
  const crops = {
    corn: { water: 12, nitrogen: 180, phosphorus: 70, potassium: 70 },
    wheat: { water: 8, nitrogen: 110, phosphorus: 60, potassium: 60 },
    soybeans: { water: 10, nitrogen: 0, phosphorus: 40, potassium: 60 },
    vegetables: { water: 15, nitrogen: 120, phosphorus: 90, potassium: 120 },
    coverCrops: { water: 5, nitrogen: 0, phosphorus: 20, potassium: 30 }
  };
  
  const soilMultipliers = {
    sandy: { water: 1.3, nitrogen: 1.2, phosphorus: 1.0, potassium: 0.9 },
    loam: { water: 1.0, nitrogen: 1.0, phosphorus: 1.0, potassium: 1.0 },
    clay: { water: 0.8, nitrogen: 0.9, phosphorus: 1.1, potassium: 1.2 },
    silt: { water: 0.9, nitrogen: 1.1, phosphorus: 1.0, potassium: 1.0 }
  };
  
  const crop = crops[cropType] || crops.corn;
  const multiplier = soilMultipliers[soilType] || soilMultipliers.loam;
  
  return {
    water: Math.round(crop.water * multiplier.water * areaSize), // thousand gallons
    nitrogen: Math.round(crop.nitrogen * multiplier.nitrogen * areaSize), // pounds
    phosphorus: Math.round(crop.phosphorus * multiplier.phosphorus * areaSize), // pounds
    potassium: Math.round(crop.potassium * multiplier.potassium * areaSize) // pounds
  };
};

// Dynamic programming for crop rotation benefits
const calculateRotationBenefits = (previousCrop, currentCrop) => {
  const benefitMatrix = {
    corn: {
      corn: { yield: -10, pestReduction: -15, fertilizerSavings: -5 },
      wheat: { yield: 5, pestReduction: 20, fertilizerSavings: 10 },
      soybeans: { yield: 12, pestReduction: 25, fertilizerSavings: 30 },
      vegetables: { yield: 0, pestReduction: 5, fertilizerSavings: 0 },
      coverCrops: { yield: 8, pestReduction: 15, fertilizerSavings: 20 }
    },
    wheat: {
      corn: { yield: 3, pestReduction: 15, fertilizerSavings: 5 },
      wheat: { yield: -8, pestReduction: -10, fertilizerSavings: -5 },
      soybeans: { yield: 7, pestReduction: 20, fertilizerSavings: 15 },
      vegetables: { yield: 5, pestReduction: 10, fertilizerSavings: 5 },
      coverCrops: { yield: 6, pestReduction: 15, fertilizerSavings: 10 }
    },
    soybeans: {
      corn: { yield: 8, pestReduction: 10, fertilizerSavings: 25 },
      wheat: { yield: 5, pestReduction: 15, fertilizerSavings: 10 },
      soybeans: { yield: -12, pestReduction: -25, fertilizerSavings: -10 },
      vegetables: { yield: 0, pestReduction: 5, fertilizerSavings: 5 },
      coverCrops: { yield: 5, pestReduction: 12, fertilizerSavings: 15 }
    },
    vegetables: {
      corn: { yield: 0, pestReduction: 5, fertilizerSavings: 0 },
      wheat: { yield: 3, pestReduction: 12, fertilizerSavings: 5 },
      soybeans: { yield: 0, pestReduction: 8, fertilizerSavings: 5 },
      vegetables: { yield: -15, pestReduction: -30, fertilizerSavings: -20 },
      coverCrops: { yield: 15, pestReduction: 35, fertilizerSavings: 25 }
    },
    coverCrops: {
      corn: { yield: 5, pestReduction: 15, fertilizerSavings: 20 },
      wheat: { yield: 4, pestReduction: 15, fertilizerSavings: 10 },
      soybeans: { yield: 3, pestReduction: 12, fertilizerSavings: 15 },
      vegetables: { yield: 10, pestReduction: 25, fertilizerSavings: 20 },
      coverCrops: { yield: 0, pestReduction: 8, fertilizerSavings: 10 }
    }
  };
  
  if (!benefitMatrix[previousCrop] || !benefitMatrix[previousCrop][currentCrop]) {
    return { yield: 0, pestReduction: 0, fertilizerSavings: 0 };
  }
  
  return benefitMatrix[previousCrop][currentCrop];
};

// Icons for crops
const cropIcons = {
  corn: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/corn.png'), // These would be actual image paths in a real app
  wheat: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/wheat.png'),
  soybeans: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/soybean.png'),
  vegetables: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/vegetables.png'),
  coverCrops: require('/Users/sathwikajoyce/FSDMPproject/my-blog/my-app/assets/cover-crops.png')
};

// Mock-up icons for simulation
const mockIcons = {
  corn: '🌽',
  wheat: '🌾',
  soybeans: '🌱',
  vegetables: '🥦',
  coverCrops: '🌿',
  water: '💧',
  nitrogen: '🟦',
  phosphorus: '🟨',
  potassium: '🟪',
  yield: '📈',
  pestReduction: '🐛',
  fertilizerSavings: '💰'
};

const seasonColors = {
  spring: ['#a8e063', '#56ab2f'],
  summer: ['#f2994a', '#f2c94c'],
  fall: ['#ff9966', '#ff5e62'],
  winter: ['#8e9eab', '#eef2f3']
};

const SeasonPlannerScreen = () => {
  const [expandedSeason, setExpandedSeason] = useState('spring');
  const [soilType, setSoilType] = useState('loam');
  const [areaSize, setAreaSize] = useState(10); // acres
  const [animations, setAnimations] = useState({
    spring: new Animated.Value(1),
    summer: new Animated.Value(0),
    fall: new Animated.Value(0)
  });

  const seasons = {
    spring: {
      mainCrop: 'corn',
      secondaryCrop: 'wheat',
      plantingWindow: 'March 15 - April 30',
      keyActivities: ['Soil preparation', 'Fertilization', 'Planting'],
      previousCrop: 'coverCrops' // From previous fall
    },
    summer: {
      mainCrop: 'soybeans',
      secondaryCrop: 'vegetables',
      plantingWindow: 'May 10 - June 15',
      keyActivities: ['Irrigation management', 'Pest control', 'Weed management'],
      previousCrop: 'corn' // From spring
    },
    fall: {
      mainCrop: 'wheat',
      secondaryCrop: 'coverCrops',
      plantingWindow: 'September 1 - October 15',
      keyActivities: ['Harvest', 'Soil conservation', 'Winter preparation'],
      previousCrop: 'soybeans' // From summer
    }
  };

  const toggleSeason = (season) => {
    // Animate expansion
    if (expandedSeason === season) return;
    
    // Reset all animations
    Object.keys(animations).forEach(key => {
      Animated.timing(animations[key], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start();
    });
    
    // Expand the selected season
    Animated.timing(animations[season], {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
    
    setExpandedSeason(season);
  };

  // Calculate resource needs
  const springResources = optimizeResources(seasons.spring.mainCrop, soilType, areaSize);
  const summerResources = optimizeResources(seasons.summer.mainCrop, soilType, areaSize);
  const fallResources = optimizeResources(seasons.fall.mainCrop, soilType, areaSize);
  
  // Calculate rotation benefits
  const springBenefits = calculateRotationBenefits(seasons.spring.previousCrop, seasons.spring.mainCrop);
  const summerBenefits = calculateRotationBenefits(seasons.spring.mainCrop, seasons.summer.mainCrop);
  const fallBenefits = calculateRotationBenefits(seasons.summer.mainCrop, seasons.fall.mainCrop);

  // For visual indicators
  const maxValue = Math.max(
    springResources.water, summerResources.water, fallResources.water,
    springResources.nitrogen, summerResources.nitrogen, fallResources.nitrogen,
    springResources.phosphorus, summerResources.phosphorus, fallResources.phosphorus,
    springResources.potassium, summerResources.potassium, fallResources.potassium
  );

  const renderResourceBar = (value, max, color) => {
    const percentage = (value / max) * 100;
    return (
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    );
  };

  const renderRotationBenefitIcons = (benefits) => {
    const icons = [];
    
    // Add yield icons
    for (let i = 0; i < Math.abs(benefits.yield) / 5; i++) {
      icons.push(
        <Text key={`yield-${i}`} style={{fontSize: 18}}>
          {benefits.yield > 0 ? mockIcons.yield : '📉'}
        </Text>
      );
    }
    
    // Add pest reduction icons
    for (let i = 0; i < Math.abs(benefits.pestReduction) / 10; i++) {
      icons.push(
        <Text key={`pest-${i}`} style={{fontSize: 18}}>
          {benefits.pestReduction > 0 ? mockIcons.pestReduction : '🐜'}
        </Text>
      );
    }
    
    // Add fertilizer savings icons
    for (let i = 0; i < Math.abs(benefits.fertilizerSavings) / 10; i++) {
      icons.push(
        <Text key={`fertilizer-${i}`} style={{fontSize: 18}}>
          {benefits.fertilizerSavings > 0 ? mockIcons.fertilizerSavings : '💸'}
        </Text>
      );
    }
    
    return (
      <View style={styles.benefitIconsContainer}>
        {icons}
      </View>
    );
  };

  const renderSeason = (season) => {
    const seasonData = seasons[season];
    const resources = season === 'spring' ? springResources : 
                     season === 'summer' ? summerResources : fallResources;
    const benefits = season === 'spring' ? springBenefits : 
                    season === 'summer' ? summerBenefits : fallBenefits;
    
    const containerHeight = animations[season].interpolate({
      inputRange: [0, 1],
      outputRange: [120, 450]
    });

    return (
      <Animated.View style={[
        styles.seasonContainer, 
        { height: containerHeight }
      ]}>
        <LinearGradient
          colors={seasonColors[season]}
          style={styles.seasonGradient}
        >
          <TouchableOpacity 
            style={styles.seasonHeader}
            onPress={() => toggleSeason(season)}
          >
            <View style={styles.seasonTitleContainer}>
              <Text style={styles.seasonTitle}>
                {season.charAt(0).toUpperCase() + season.slice(1)} Season
              </Text>
              <Text style={styles.seasonDuration}>{seasonData.plantingWindow}</Text>
            </View>
            <Ionicons 
              name={expandedSeason === season ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>

          {expandedSeason === season && (
            <View style={styles.seasonContent}>
              {/* Crops Section */}
              <View style={styles.cropSection}>
                <View style={styles.cropContainer}>
                  <Text style={styles.cropLabel}>Main Crop</Text>
                  <View style={styles.cropIconContainer}>
                    <Text style={styles.cropIcon}>{mockIcons[seasonData.mainCrop]}</Text>
                  </View>
                  <Text style={styles.cropName}>
                    {seasonData.mainCrop.charAt(0).toUpperCase() + seasonData.mainCrop.slice(1)}
                  </Text>
                </View>

                <View style={styles.cropContainer}>
                  <Text style={styles.cropLabel}>Secondary</Text>
                  <View style={styles.cropIconContainer}>
                    <Text style={styles.cropIcon}>{mockIcons[seasonData.secondaryCrop]}</Text>
                  </View>
                  <Text style={styles.cropName}>
                    {seasonData.secondaryCrop.charAt(0).toUpperCase() + seasonData.secondaryCrop.slice(1)}
                  </Text>
                </View>
              </View>

              {/* Resource Optimization */}
              <View style={styles.resourcesSection}>
                <Text style={styles.sectionTitle}>Resource Needs</Text>
                
                <View style={styles.resourceRow}>
                  <View style={styles.resourceIconContainer}>
                    <Text style={styles.resourceIcon}>{mockIcons.water}</Text>
                  </View>
                  <View style={styles.resourceInfo}>
                    <Text style={styles.resourceLabel}>Water</Text>
                    <Text style={styles.resourceValue}>{resources.water} thousand gallons</Text>
                    {renderResourceBar(resources.water, maxValue, '#4fc3f7')}
                  </View>
                </View>

                <View style={styles.resourceRow}>
                  <View style={styles.resourceIconContainer}>
                    <Text style={styles.resourceIcon}>{mockIcons.nitrogen}</Text>
                  </View>
                  <View style={styles.resourceInfo}>
                    <Text style={styles.resourceLabel}>Nitrogen</Text>
                    <Text style={styles.resourceValue}>{resources.nitrogen} pounds</Text>
                    {renderResourceBar(resources.nitrogen, maxValue, '#64b5f6')}
                  </View>
                </View>

                <View style={styles.resourceRow}>
                  <View style={styles.resourceIconContainer}>
                    <Text style={styles.resourceIcon}>{mockIcons.phosphorus}</Text>
                  </View>
                  <View style={styles.resourceInfo}>
                    <Text style={styles.resourceLabel}>Phosphorus</Text>
                    <Text style={styles.resourceValue}>{resources.phosphorus} pounds</Text>
                    {renderResourceBar(resources.phosphorus, maxValue, '#ffb74d')}
                  </View>
                </View>

                <View style={styles.resourceRow}>
                  <View style={styles.resourceIconContainer}>
                    <Text style={styles.resourceIcon}>{mockIcons.potassium}</Text>
                  </View>
                  <View style={styles.resourceInfo}>
                    <Text style={styles.resourceLabel}>Potassium</Text>
                    <Text style={styles.resourceValue}>{resources.potassium} pounds</Text>
                    {renderResourceBar(resources.potassium, maxValue, '#ba68c8')}
                  </View>
                </View>
              </View>

              {/* Crop Rotation Benefits */}
              <View style={styles.benefitsSection}>
                <Text style={styles.sectionTitle}>Rotation Benefits</Text>
                
                <View style={styles.benefitRow}>
                  <View style={styles.benefitLabelContainer}>
                    <Text style={styles.benefitLabel}>Yield</Text>
                    <Text style={[
                      styles.benefitValue, 
                      {color: benefits.yield > 0 ? '#4caf50' : '#f44336'}
                    ]}>
                      {benefits.yield > 0 ? `+${benefits.yield}%` : `${benefits.yield}%`}
                    </Text>
                  </View>
                  <View style={styles.benefitVisualContainer}>
                    {renderRotationBenefitIcons({yield: benefits.yield, pestReduction: 0, fertilizerSavings: 0})}
                  </View>
                </View>

                <View style={styles.benefitRow}>
                  <View style={styles.benefitLabelContainer}>
                    <Text style={styles.benefitLabel}>Pest Control</Text>
                    <Text style={[
                      styles.benefitValue, 
                      {color: benefits.pestReduction > 0 ? '#4caf50' : '#f44336'}
                    ]}>
                      {benefits.pestReduction > 0 ? `+${benefits.pestReduction}%` : `${benefits.pestReduction}%`}
                    </Text>
                  </View>
                  <View style={styles.benefitVisualContainer}>
                    {renderRotationBenefitIcons({yield: 0, pestReduction: benefits.pestReduction, fertilizerSavings: 0})}
                  </View>
                </View>

                <View style={styles.benefitRow}>
                  <View style={styles.benefitLabelContainer}>
                    <Text style={styles.benefitLabel}>Fertilizer Savings</Text>
                    <Text style={[
                      styles.benefitValue, 
                      {color: benefits.fertilizerSavings > 0 ? '#4caf50' : '#f44336'}
                    ]}>
                      {benefits.fertilizerSavings > 0 ? `+${benefits.fertilizerSavings}%` : `${benefits.fertilizerSavings}%`}
                    </Text>
                  </View>
                  <View style={styles.benefitVisualContainer}>
                    {renderRotationBenefitIcons({yield: 0, pestReduction: 0, fertilizerSavings: benefits.fertilizerSavings})}
                  </View>
                </View>
              </View>

              {/* Key Activities */}
              <View style={styles.activitiesSection}>
                <Text style={styles.sectionTitle}>Key Activities</Text>
                {seasonData.keyActivities.map((activity, index) => (
                  <View key={index} style={styles.activityRow}>
                    <Ionicons name="checkmark-circle" size={24} color="#4caf50" />
                    <Text style={styles.activityText}>{activity}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Season Planner</Text>
        <Text style={styles.subtitle}>Best crops for your fields all year round</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Ionicons name="information-circle" size={24} color="#3498db" />
            <Text style={styles.infoCardTitle}>Your Farm Plan</Text>
          </View>
          <Text style={styles.infoCardText}>
            This plan uses special math to help you use water and fertilizer in the best way. 
            It also shows how crops should follow each other for best results.
          </Text>
        </View>
        
        {renderSeason('spring')}
        {renderSeason('summer')}
        {renderSeason('fall')}
        
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>What the Symbols Mean:</Text>
          <View style={styles.legendRow}>
            <Text style={styles.legendIcon}>{mockIcons.yield}</Text>
            <Text style={styles.legendText}>Better crop growth</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendIcon}>{mockIcons.pestReduction}</Text>
            <Text style={styles.legendText}>Fewer pests</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendIcon}>{mockIcons.fertilizerSavings}</Text>
            <Text style={styles.legendText}>Save money on fertilizer</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendIcon}>{mockIcons.water}</Text>
            <Text style={styles.legendText}>Water needs</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendIcon}>{mockIcons.nitrogen}</Text>
            <Text style={styles.legendText}>Nitrogen fertilizer</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendIcon}>{mockIcons.phosphorus}</Text>
            <Text style={styles.legendText}>Phosphorus fertilizer</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendIcon}>{mockIcons.potassium}</Text>
            <Text style={styles.legendText}>Potassium fertilizer</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Tap on each season to see detailed information
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9fc',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ecf0f1',
    marginTop: 5,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 8,
  },
  infoCardText: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 22,
  },
  seasonContainer: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  seasonGradient: {
    flex: 1,
    borderRadius: 12,
  },
  seasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  seasonTitleContainer: {
    flexDirection: 'column',
  },
  seasonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  seasonDuration: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  seasonContent: {
    padding: 16,
  },
  cropSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  cropContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 12,
    width: '45%',
  },
  cropLabel: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
  },
  cropIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 4,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cropIcon: {
    fontSize: 36,
  },
  cropName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  resourcesSection: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  resourceIcon: {
    fontSize: 20,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceLabel: {
    fontSize: 14,
    color: '#2c3e50',
  },
  resourceValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  barContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: 8,
    borderRadius: 4,
  },
  benefitsSection: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitLabelContainer: {
    width: 100,
  },
  benefitLabel: {
    fontSize: 14,
    color: '#2c3e50',
  },
  benefitValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  benefitVisualContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  benefitIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activitiesSection: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 16,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#2c3e50',
  },
  legendContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendIcon: {
    fontSize: 20,
    width: 30,
  },
  legendText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  footer: {
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  }
});

export default SeasonPlannerScreen;