import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function SplashScreen() {
  const onLayoutRootView = () => {
    // Measure the root view dimensions here
    // You can use the event.nativeEvent.layout object to get the width and height
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* Your splash screen content goes here */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
