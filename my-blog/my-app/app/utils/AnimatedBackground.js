import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AnimatedBackground = () => {
  const particles = useRef([]);
  const animationFrame = useRef(null);

  const cropIcons = ['🌾', '🌽', '🌱', '🌿', '🌳', '🍀', '🍃', '🪵'];

  useEffect(() => {
    particles.current = Array.from({ length: 50 }, (_, i) => {
      const isCropIcon = i % 5 === 0;
      return {
        x: new Animated.Value(Math.random() * width),
        y: new Animated.Value(Math.random() * height),
        size: isCropIcon ? 24 : Math.random() * 5 + 2,
        speedX: isCropIcon ? 0 : Math.random() * 0.5 - 0.25, // Crop icons don't move horizontally
        speedY: isCropIcon ? -(Math.random() * 0.2 + 0.1) : Math.random() * 0.5 - 0.25, // Crop icons float upward
        isCropIcon,
        icon: isCropIcon ? cropIcons[Math.floor(Math.random() * cropIcons.length)] : null,
      };
    });

    const animate = () => {
      particles.current.forEach((particle) => {
        // Update positions
        Animated.timing(particle.x, {
          toValue: particle.x._value + particle.speedX,
          duration: 16,
          useNativeDriver: true,
        }).start();
        Animated.timing(particle.y, {
          toValue: particle.y._value + particle.speedY,
          duration: 16,
          useNativeDriver: true,
        }).start();

        // Bounce particles off walls or reset crop icons
        if (particle.isCropIcon) {
          // Crop icons float upward and reset at the bottom
          if (particle.y._value < -particle.size) {
            particle.y.setValue(height + particle.size);
            particle.x.setValue(Math.random() * width);
          }
        } else {
          // Regular particles bounce off walls
          if (particle.x._value < -particle.size) {
            particle.x.setValue(width + particle.size);
            particle.speedX *= -1;
          } else if (particle.x._value > width + particle.size) {
            particle.x.setValue(-particle.size);
            particle.speedX *= -1;
          }
          if (particle.y._value < -particle.size) {
            particle.y.setValue(height + particle.size);
            particle.speedY *= -1;
          } else if (particle.y._value > height + particle.size) {
            particle.y.setValue(-particle.size);
            particle.speedY *= -1;
          }
        }
      });
      animationFrame.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <View style={styles.canvas}>
      {particles.current.map((particle, index) => {
        const animatedStyle = {
          transform: [
            { translateX: particle.x },
            { translateY: particle.y },
          ],
          position: 'absolute',
          width: particle.size,
          height: particle.size,
        };

        return (
          <Animated.View
            key={index}
            style={[animatedStyle, particle.isCropIcon ? styles.cropIcon : styles.particle]}
          >
            {particle.isCropIcon && <Text style={styles.iconText}>{particle.icon}</Text>}
          </Animated.View>
        );
      })}
      <LinearGradient
        colors={['#E8F5E9', '#C8E6C9']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  particle: {
    borderRadius: 50,
    backgroundColor: 'rgba(74, 222, 128, 0.3)',
  },
  cropIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    color: 'rgba(34, 197, 94, 0.5)',
  },
});

export default AnimatedBackground;