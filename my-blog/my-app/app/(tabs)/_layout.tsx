import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // 👈 Completely hides the tab bar
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: null, // 👈 Optional: prevent navigation tab
        }}
      />
    </Tabs>
  );
}
