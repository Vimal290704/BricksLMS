import React from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AnimatedBackground from '../components/login/AnimatedBackground';
import WelcomeHeader from '../components/login/WelcomeHeader';
import LoginForm from '../components/login/LoginForm';
import HelpButton from '../components/login/HelpButton';
import { container, background, scrollContent } from '../styles/loginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const handleLogin = (schoolCode, username, password) => {
    console.log('Login with:', schoolCode, username, password);
    // Add your login logic here
  };

  const clearOnboarding = async () => {
    console.log('Clear onboarding');
    // Add your clear onboarding logic here
    try{
      await AsyncStorage.removeItem('isAppFirstLaunched');
    }catch(error){
      console.log(error);
    }
  };

  const handleHelpPress = () => {
    console.log('Help requested');
    // Add your help logic here
    clearOnboarding();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <LinearGradient
        colors={['#f0e5ff', '#e6d5ff', '#dac4ff']}
        style={background}
      />
      
      <AnimatedBackground />

      <ScrollView 
        contentContainerStyle={scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60, paddingHorizontal: 20 }}>
          <WelcomeHeader />
          <LoginForm onLogin={handleLogin} />
        </View>
      </ScrollView>
      
      <HelpButton onPress={handleHelpPress} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;