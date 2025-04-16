import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import soilwaterData from '../../assets/stateSoilWaterData.json';
import { LinearGradient } from 'expo-linear-gradient';

const SoilWaterScreen = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [filteredData, setFilteredData] = useState(soilwaterData);
  const [optimizationModalVisible, setOptimizationModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [optimizationParams, setOptimizationParams] = useState({
    yieldWeight: 0.4,
    waterWeight: 0.3,
    profitWeight: 0.3,
    fertilizerBudget: 1000,
    waterBudget: 5000,
  });
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState('goalProgramming');

  const regions = [...new Set(soilwaterData.map(item => item.region))];

  useEffect(() => {
    setFilteredData(
      selectedRegion === ''
        ? soilwaterData
        : soilwaterData.filter(item => item.region === selectedRegion)
    );
  }, [selectedRegion]);

  // Goal Programming Implementation
  const runGoalProgramming = () => {
    setIsCalculating(true);
    
    // Simulating calculation time
    setTimeout(() => {
      if (!selectedState) return;
      
      const { yieldWeight, waterWeight, profitWeight } = optimizationParams;
      
      // Sample calculation based on weights and soil data
      // In a real implementation, this would be a more complex mathematical model
      const cropYield = 75 + Math.random() * 25; // 75-100 range
      const waterUsage = 2000 + Math.random() * 1000; // 2000-3000 range
      const profit = 5000 + Math.random() * 3000; // 5000-8000 range
      
      // Recommended actions based on soil properties
      const actions = [];
      
      if (selectedState.pH < 6.0) {
        actions.push("Add lime to increase soil pH");
      } else if (selectedState.pH > 7.5) {
        actions.push("Add sulfur to decrease soil pH");
      }
      
      if (selectedState.nutrients.N < 30) {
        actions.push("Increase nitrogen application");
      }
      
      if (selectedState.moisture < "Medium") {
        actions.push("Increase irrigation frequency");
      }
      
      setOptimizationResults({
        cropYield,
        waterUsage,
        profit,
        waterSavings: 3500 - waterUsage,
        fertilizerAllocation: {
          nitrogen: 40 + Math.floor(Math.random() * 20),
          phosphorus: 20 + Math.floor(Math.random() * 15),
          potassium: 30 + Math.floor(Math.random() * 15),
        },
        recommendedActions: actions,
      });
      
      setIsCalculating(false);
    }, 1500);
  };
  
  // Quadratic Programming Implementation
  const runQuadraticProgramming = () => {
    setIsCalculating(true);
    
    // Simulating calculation time
    setTimeout(() => {
      if (!selectedState) return;
      
      const { fertilizerBudget, waterBudget } = optimizationParams;
      
      // Sample quadratic optimization results
      // In a real app, this would involve solving a quadratic programming problem
      const optimalNitrogen = 35 + Math.floor(Math.random() * 15);
      const optimalPhosphorus = 25 + Math.floor(Math.random() * 10);
      const optimalPotassium = 30 + Math.floor(Math.random() * 10);
      
      const optimalWaterAllocation = waterBudget * 0.8 + Math.random() * waterBudget * 0.15;
      const estimatedYield = 80 + Math.random() * 20;
      
      setOptimizationResults({
        fertilizerAllocation: {
          nitrogen: optimalNitrogen,
          phosphorus: optimalPhosphorus,
          potassium: optimalPotassium,
          totalCost: (optimalNitrogen * 2) + (optimalPhosphorus * 3) + (optimalPotassium * 2.5),
        },
        waterAllocation: optimalWaterAllocation,
        estimatedYield,
        efficiency: {
          fertilizerEfficiency: 85 + Math.random() * 10,
          waterEfficiency: 80 + Math.random() * 15,
        },
        marginalReturns: {
          nitrogen: 0.4 + Math.random() * 0.3,
          phosphorus: 0.3 + Math.random() * 0.2,
          potassium: 0.2 + Math.random() * 0.2,
          water: 0.5 + Math.random() * 0.3,
        }
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const handleRunOptimization = () => {
    if (activeTab === 'goalProgramming') {
      runGoalProgramming();
    } else {
      runQuadraticProgramming();
    }
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => {
        setSelectedState(item);
        setOptimizationModalVisible(true);
      }}
    >
      <LinearGradient
        colors={['#ecfffc', '#ffffff']}
        style={styles.cardGradient}
      >
        <Text style={styles.cardTitle}>{item.state}</Text>
        <Text style={styles.cardSubtitle}>Region: {item.region}</Text>
        
        <View style={styles.cardContent}>
          <View style={styles.cardColumn}>
            <Text style={styles.sectionTitle}>Soil Properties</Text>
            <Text style={styles.cardText}>Type: {item.soilType}</Text>
            <Text style={styles.cardText}>pH: {item.pH}</Text>
            <Text style={styles.cardText}>Organic Matter: {item.organicMatter}</Text>
            <Text style={styles.cardText}>
              Nutrients: N-{item.nutrients.N}, P-{item.nutrients.P}, K-{item.nutrients.K}
            </Text>
          </View>
          
          <View style={styles.cardColumn}>
            <Text style={styles.sectionTitle}>Water Properties</Text>
            <Text style={styles.cardText}>Moisture: {item.moisture}</Text>
            <Text style={styles.cardText}>Irrigation: {item.irrigation}</Text>
            <Text style={styles.cardText}>Water Source: {item.waterSource}</Text>
            <Text style={styles.cardText}>Quality: {item.waterQuality}</Text>
          </View>
        </View>
        
        <View style={styles.optimizeButtonContainer}>
          <TouchableOpacity 
            style={styles.optimizeButton}
            onPress={() => {
              setSelectedState(item);
              setOptimizationModalVisible(true);
            }}
          >
            <Text style={styles.optimizeButtonText}>Optimize Resources</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderOptimizationModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={optimizationModalVisible}
      onRequestClose={() => setOptimizationModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Resource Optimization for {selectedState?.state}
          </Text>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'goalProgramming' && styles.activeTab
              ]}
              onPress={() => setActiveTab('goalProgramming')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'goalProgramming' && styles.activeTabText
              ]}>Goal Programming</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'quadraticProgramming' && styles.activeTab
              ]}
              onPress={() => setActiveTab('quadraticProgramming')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'quadraticProgramming' && styles.activeTabText
              ]}>Quadratic Programming</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalScrollView}>
            {activeTab === 'goalProgramming' ? (
              <View style={styles.optimizationForm}>
                <Text style={styles.formLabel}>Optimization Weights</Text>
                <Text style={styles.formDescription}>
                  Adjust the importance of each factor in your optimization goals (must sum to 1.0)
                </Text>
                
                <View style={styles.sliderContainer}>
                  <Text style={styles.sliderLabel}>Yield Weight: {optimizationParams.yieldWeight}</Text>
                  <View style={styles.sliderRow}>
                    <Text>0.0</Text>
                    <TextInput
                      style={styles.input}
                      value={optimizationParams.yieldWeight.toString()}
                      onChangeText={(value) => setOptimizationParams({
                        ...optimizationParams,
                        yieldWeight: parseFloat(value) || 0
                      })}
                      keyboardType="numeric"
                    />
                    <Text>1.0</Text>
                  </View>
                </View>
                
                <View style={styles.sliderContainer}>
                  <Text style={styles.sliderLabel}>Water Conservation Weight: {optimizationParams.waterWeight}</Text>
                  <View style={styles.sliderRow}>
                    <Text>0.0</Text>
                    <TextInput
                      style={styles.input}
                      value={optimizationParams.waterWeight.toString()}
                      onChangeText={(value) => setOptimizationParams({
                        ...optimizationParams,
                        waterWeight: parseFloat(value) || 0
                      })}
                      keyboardType="numeric"
                    />
                    <Text>1.0</Text>
                  </View>
                </View>
                
                <View style={styles.sliderContainer}>
                  <Text style={styles.sliderLabel}>Profit Weight: {optimizationParams.profitWeight}</Text>
                  <View style={styles.sliderRow}>
                    <Text>0.0</Text>
                    <TextInput
                      style={styles.input}
                      value={optimizationParams.profitWeight.toString()}
                      onChangeText={(value) => setOptimizationParams({
                        ...optimizationParams,
                        profitWeight: parseFloat(value) || 0
                      })}
                      keyboardType="numeric"
                    />
                    <Text>1.0</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.optimizationForm}>
                <Text style={styles.formLabel}>Resource Budgets</Text>
                <Text style={styles.formDescription}>
                  Set your available budgets for fertilizer and water resources
                </Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Fertilizer Budget ($):</Text>
                  <TextInput
                    style={styles.budgetInput}
                    value={optimizationParams.fertilizerBudget.toString()}
                    onChangeText={(value) => setOptimizationParams({
                      ...optimizationParams,
                      fertilizerBudget: parseFloat(value) || 0
                    })}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Water Budget (gallons):</Text>
                  <TextInput
                    style={styles.budgetInput}
                    value={optimizationParams.waterBudget.toString()}
                    onChangeText={(value) => setOptimizationParams({
                      ...optimizationParams,
                      waterBudget: parseFloat(value) || 0
                    })}
                    keyboardType="numeric"
                  />
                </View>
                
                <Text style={styles.soilSummary}>
                  Soil Type: {selectedState?.soilType}  |  pH: {selectedState?.pH}  |  
                  Nutrients: N-{selectedState?.nutrients.N}, P-{selectedState?.nutrients.P}, K-{selectedState?.nutrients.K}
                </Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.runButton}
              onPress={handleRunOptimization}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.runButtonText}>Run Optimization</Text>
              )}
            </TouchableOpacity>
            
            {optimizationResults && !isCalculating && (
              <View style={styles.resultsContainer}>
                <Text style={styles.resultsTitle}>Optimization Results</Text>
                
                {activeTab === 'goalProgramming' ? (
                  <>
                    <View style={styles.resultCard}>
                      <Text style={styles.resultLabel}>Estimated Crop Yield:</Text>
                      <Text style={styles.resultValue}>{optimizationResults.cropYield.toFixed(2)} bushels/acre</Text>
                    </View>
                    
                    <View style={styles.resultCard}>
                      <Text style={styles.resultLabel}>Water Usage:</Text>
                      <Text style={styles.resultValue}>{optimizationResults.waterUsage.toFixed(2)} gallons</Text>
                    </View>
                    
                    <View style={styles.resultCard}>
                      <Text style={styles.resultLabel}>Estimated Profit:</Text>
                      <Text style={styles.resultValue}>${optimizationResults.profit.toFixed(2)}</Text>
                    </View>
                    
                    <View style={styles.resultCard}>
                      <Text style={styles.resultLabel}>Water Savings:</Text>
                      <Text style={styles.resultValue}>{optimizationResults.waterSavings.toFixed(2)} gallons</Text>
                    </View>
                    
                    <Text style={styles.resultSectionTitle}>Fertilizer Allocation</Text>
                    <View style={styles.fertilizerResults}>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Nitrogen:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.fertilizerAllocation.nitrogen} lbs/acre</Text>
                      </View>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Phosphorus:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.fertilizerAllocation.phosphorus} lbs/acre</Text>
                      </View>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Potassium:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.fertilizerAllocation.potassium} lbs/acre</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.resultSectionTitle}>Recommended Actions</Text>
                    {optimizationResults.recommendedActions.map((action, index) => (
                      <View key={index} style={styles.actionItem}>
                        <Text style={styles.actionText}>• {action}</Text>
                      </View>
                    ))}
                  </>
                ) : (
                  <>
                    <Text style={styles.resultSectionTitle}>Optimal Fertilizer Allocation</Text>
                    <View style={styles.fertilizerResults}>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Nitrogen:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.fertilizerAllocation.nitrogen} lbs/acre</Text>
                      </View>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Phosphorus:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.fertilizerAllocation.phosphorus} lbs/acre</Text>
                      </View>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Potassium:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.fertilizerAllocation.potassium} lbs/acre</Text>
                      </View>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Total Cost:</Text>
                        <Text style={styles.resultValue}>${optimizationResults.fertilizerAllocation.totalCost.toFixed(2)}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.resultCard}>
                      <Text style={styles.resultLabel}>Optimal Water Allocation:</Text>
                      <Text style={styles.resultValue}>{optimizationResults.waterAllocation.toFixed(2)} gallons</Text>
                    </View>
                    
                    <View style={styles.resultCard}>
                      <Text style={styles.resultLabel}>Estimated Yield:</Text>
                      <Text style={styles.resultValue}>{optimizationResults.estimatedYield.toFixed(2)} bushels/acre</Text>
                    </View>
                    
                    <Text style={styles.resultSectionTitle}>Resource Efficiency</Text>
                    <View style={styles.resultCard}>
                      <Text style={styles.resultLabel}>Fertilizer Efficiency:</Text>
                      <Text style={styles.resultValue}>{optimizationResults.efficiency.fertilizerEfficiency.toFixed(2)}%</Text>
                    </View>
                    <View style={styles.resultCard}>
                      <Text style={styles.resultLabel}>Water Efficiency:</Text>
                      <Text style={styles.resultValue}>{optimizationResults.efficiency.waterEfficiency.toFixed(2)}%</Text>
                    </View>
                    
                    <Text style={styles.resultSectionTitle}>Marginal Returns</Text>
                    <View style={styles.fertilizerResults}>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Nitrogen:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.marginalReturns.nitrogen.toFixed(2)} bu/lb</Text>
                      </View>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Phosphorus:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.marginalReturns.phosphorus.toFixed(2)} bu/lb</Text>
                      </View>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Potassium:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.marginalReturns.potassium.toFixed(2)} bu/lb</Text>
                      </View>
                      <View style={styles.fertilizerItem}>
                        <Text style={styles.resultLabel}>Water:</Text>
                        <Text style={styles.resultValue}>{optimizationResults.marginalReturns.water.toFixed(2)} bu/gal</Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            )}
          </ScrollView>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setOptimizationModalVisible(false);
              setOptimizationResults(null);
            }}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e0f7fa', '#f3fefb']}
        style={styles.headerGradient}
      >
        <Text style={styles.heading}>State-wise Soil and Water Details</Text>
        
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            placeholder={{ label: 'Select a Region...', value: '' }}
            onValueChange={setSelectedRegion}
            items={regions.map(region => ({ label: region, value: region }))}
            style={{
              inputIOS: styles.picker,
              inputAndroid: styles.picker,
            }}
          />
        </View>
      </LinearGradient>

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.state}-${index}`}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 150, paddingHorizontal: 16 }}
      />
      
      {renderOptimizationModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3fefb',
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c6e49',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    color: '#333',
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 16,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardGradient: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a4d2e',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardColumn: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c6e49',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  optimizeButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  optimizeButton: {
    backgroundColor: '#2c6e49',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  optimizeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c6e49',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2c6e49',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  activeTabText: {
    color: '#2c6e49',
  },
  modalScrollView: {
    paddingHorizontal: 16,
    paddingTop: 16,
    maxHeight: 500,
  },
  optimizationForm: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  formDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '70%',
    textAlign: 'center',
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
  },
  budgetInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  soilSummary: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  runButton: {
    backgroundColor: '#2c6e49',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  runButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultsContainer: {
    backgroundColor: '#f5f9f7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c6e49',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2c6e49',
  },
  resultSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  fertilizerResults: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  fertilizerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionItem: {
    paddingVertical: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#444',
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SoilWaterScreen;