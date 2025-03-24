import React from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedBackground from '../components/login/AnimatedBackground';
import WelcomeHeader from '../components/login/WelcomeHeader';
import LoginForm from '../components/login/LoginForm';
import HelpButton from '../components/login/HelpButton';
import { container, background, scrollContent } from '../styles/loginStyles';

const LoginScreen = () => {
  const handleLogin = (schoolCode, username, password) => {
    console.log('Login with:', schoolCode, username, password);
    // Add your login logic here
  };

  const clearOnboarding = async () => {
    try{
      await AsyncStorage.removeItem('isAppFirstLaunched');
    }catch(error){
      console.log(error)
    }
 }

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
        colors={['#4a0072', '#7b1fa2', '#9c27b0']}
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