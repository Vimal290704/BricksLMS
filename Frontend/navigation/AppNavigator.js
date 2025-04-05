// AppNavigator.js - fixed
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, useColorScheme, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import MainNavigator from './MainNavigator';

const LoadingScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <View 
      style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5'
      }}
    >
      <ActivityIndicator 
        size="large" 
        color={colorScheme === 'dark' ? '#ffffff' : '#007bff'} 
      />
      <Text 
        style={{ 
          marginTop: 10, 
          color: colorScheme === 'dark' ? '#ffffff' : '#000000' 
        }}
      >
        Loading...
      </Text>
    </View>
  );
};

const AppNavigatorContent = () => {
  const { isLoading, isLoggedIn } = useAuth();
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData === null) {
        setIsAppFirstLaunched(true);
        await AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isAppFirstLaunched === null) return null;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isLoggedIn ? <DrawerNavigator /> : <AuthNavigator isFirstLaunch={isAppFirstLaunched} />;
};

export const AppNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigatorContent />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;