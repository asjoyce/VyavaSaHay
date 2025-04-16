import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { solveSimplex, solveIntegerProgram } from '../utils/optimization';
import { Picker } from '@react-native-picker/picker';
import { WebView } from 'react-native-webview';

const CropPlanningScreen = () => {
  const [land, setLand] = useState('');
  const [budget, setBudget] = useState('');
  const [water, setWater] = useState('');
  const [soil, setSoil] = useState('Alluvial');
  const [output, setOutput] = useState(null);
  const [cardScale] = useState(new Animated.Value(1));
  const [showChart, setShowChart] = useState(false);

  const handleSolve = () => {
    const simplex = solveSimplex(Number(land), Number(budget), Number(water), soil);
    const integerSolution = solveIntegerProgram(simplex.suggestion);
    setOutput({ simplex, integerSolution });
  };

  const animateCard = (toValue) => {
    Animated.spring(cardScale, {
      toValue,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Water Use Guide</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <style>
        body { font-family: Arial, sans-serif; background-color: #f9fbfd; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .chart-container { width: 90%; max-width: 600px; background-color: #fff; padding: 20px; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-left: 5px solid #2ecc71; text-align: center; }
        .crop-section { margin: 15px 0; padding: 10px; border: 2px solid #d3e0ea; border-radius: 10px; background-color: #e8f4f0; }
        .crop-icon { font-size: 40px; margin-bottom: 10px; }
        .water-drop { font-size: 30px; color: #3498db; margin: 5px; }
        .area-circle { width: 50px; height: 50px; background-color: #2ecc71; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; color: #fff; font-size: 16px; margin: 5px; }
      </style>
    </head>
    <body>
      <div class="chart-container">
        <h2 style="color: #27ae60;">🌱 Water Use Guide</h2>
        <div class="crop-section">
          <i class="fas fa-wheat-alt crop-icon" style="color: #f1c40f;"></i>
          <div>Wheat</div>
          <i class="fas fa-tint water-drop"></i><i class="fas fa-tint water-drop"></i><i class="fas fa-tint water-drop"></i>
          <div class="area-circle">25M</div>
        </div>
        <div class="crop-section">
          <i class="fas fa-rice crop-icon" style="color: #e74c3c;"></i>
          <div>Rice</div>
          <i class="fas fa-tint water-drop"></i><i class="fas fa-tint water-drop"></i><i class="fas fa-tint water-drop"></i><i class="fas fa-tint water-drop"></i>
          <div class="area-circle">10M</div>
        </div>
        <div class="crop-section">
          <i class="fas fa-corn crop-icon" style="color: #9b59b6;"></i>
          <div>Maize</div>
          <i class="fas fa-tint water-drop"></i><i class="fas fa-tint water-drop"></i><i class="fas fa-tint water-drop"></i><i class="fas fa-tint water-drop"></i>
          <div class="area-circle">12M</div>
        </div>
        <p style="font-size: 12px; color: #7f8c8d;">M = Million Acres | More drops = More water</p>
      </div>
    </body>
    </html>
  `;

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.fullScreen}>
      <LinearGradient
        colors={['#2ecc71', '#27ae60', '#ffffff']}
        style={styles.header}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.heading}>🌾 Crop Planning</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Land in acres"
            keyboardType="numeric"
            value={land}
            onChangeText={setLand}
            style={[styles.input, land && styles.inputFilled]}
            placeholderTextColor="#7f8c8d"
          />
          <TextInput
            placeholder="Budget in ₹"
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
            style={[styles.input, budget && styles.inputFilled]}
            placeholderTextColor="#7f8c8d"
          />
          <TextInput
            placeholder="Water in liters"
            keyboardType="numeric"
            value={water}
            onChangeText={setWater}
            style={[styles.input, water && styles.inputFilled]}
            placeholderTextColor="#7f8c8d"
          />
        </View>

        <Text style={styles.label}>Select Soil Type:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={soil}
            style={styles.picker}
            onValueChange={(val) => setSoil(val)}
            dropdownIconColor="#2ecc71"
          >
            <Picker.Item label="Alluvial" value="Alluvial" />
            <Picker.Item label="Black" value="Black" />
            <Picker.Item label="Red" value="Red" />
            <Picker.Item label="Laterite" value="Laterite" />
          </Picker>
        </View>

        <Pressable
          style={styles.button}
          onPressIn={() => animateCard(0.95)}
          onPressOut={() => {
            animateCard(1);
            handleSolve();
          }}
        >
          <Text style={styles.buttonText}>Solve</Text>
        </Pressable>

        {output && (
          <View style={styles.result}>
            <Text style={styles.subHeading}>🌾 Crops in Acres</Text>
            <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
              <MaterialIcons name="grain" size={20} color="#27ae60" style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>Wheat</Text>
                <Text style={styles.cardContent}>{output.integerSolution.wheat} acres</Text>
              </View>
            </Animated.View>
            <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
              <MaterialIcons name="local-dining" size={20} color="#27ae60" style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>Rice</Text>
                <Text style={styles.cardContent}>{output.integerSolution.rice} acres</Text>
              </View>
            </Animated.View>
            <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
              <MaterialIcons name="local-florist" size={20} color="#27ae60" style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>Maize</Text>
                <Text style={styles.cardContent}>{output.integerSolution.maize} acres</Text>
              </View>
            </Animated.View>
            <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
              <MaterialIcons name="attach-money" size={20} color="#27ae60" style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>Max Profit</Text>
                <Text style={styles.cardContent}>₹{output.integerSolution.profit}</Text>
              </View>
            </Animated.View>

            <Text style={styles.subHeading}>🧮 Plan and Profit</Text>
            {output.simplex.steps.map((step, idx) => (
              <Animated.View key={idx} style={[styles.card, { transform: [{ scale: cardScale }] }]}>
                <MaterialIcons name="calculate" size={20} color="#27ae60" style={styles.cardIcon} />
                <View>
                  <Text style={styles.cardTitle}>Plan {idx + 1}</Text>
                  <Text style={styles.cardContent}>
                    W: {step.wheat} | R: {step.rice} | M: {step.maize} | Cost: ₹{step.cost} | Water: {step.water}L | Profit: ₹{step.profit}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>
        )}

        <Pressable
          style={styles.chartButton}
          onPress={() => setShowChart(true)}
        >
          <Text style={styles.buttonText}>View Water Use Guide 🌊</Text>
        </Pressable>

        {showChart && (
          <WebView
            source={{ html: htmlContent }}
            style={styles.webView}
            onClose={() => setShowChart(false)}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: '100%',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f9fbfd',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
    width: '100%',
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: '#d3e0ea',
    borderRadius: 15,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  inputFilled: {
    borderColor: '#2ecc71',
    borderWidth: 2,
    shadowColor: '#2ecc71',
    shadowOpacity: 0.3,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#d3e0ea',
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#34495e',
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  chartButton: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  result: {
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#2ecc71',
    width: '100%',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#27ae60',
    marginVertical: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
    borderLeftWidth: 5,
    borderLeftColor: '#2ecc71',
  },
  cardIcon: {
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    textTransform: 'capitalize',
  },
  cardContent: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  webView: {
    flex: 1,
    width: '100%',
    height: 400,
    marginTop: 15,
  },
});

export default CropPlanningScreen;