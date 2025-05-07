import type { PropsWithChildren } from 'react';
import { StyleSheet, Animated, ScrollView } from 'react-native';

type ParallaxScrollViewProps = PropsWithChildren<{
  headerHeight: number;
}>;

const ParallaxScrollView = ({ children, headerHeight }: ParallaxScrollViewProps) => {
  const scrollY = new Animated.Value(0);

  const headerStyle = {
    opacity: scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    height: headerHeight,
  };

  return (
    <ScrollView
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      scrollEventThrottle={16}
    >
      <Animated.View style={[styles.header, headerStyle]}>
        {/* Header content */}
      </Animated.View>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
});

export default ParallaxScrollView;