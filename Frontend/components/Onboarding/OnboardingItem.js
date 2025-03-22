import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';  

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <LottieView 
        source={item.image}  
        autoPlay  
        loop  
        style={styles.animation} 
      />
     
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',  // Clean White Background
  },
  animation: {
    width: 300,  
    height: 300,  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#4B0082', // Deep Purple for a Premium Look
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#6A0DAD', // Slightly Lighter Purple for Elegance
    fontWeight: '300',
  },
});
