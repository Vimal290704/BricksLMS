import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import Onboarding from '../components/Onboarding/Onboarding';

const AuthStack = createStackNavigator();

const AuthNavigator = ({ isFirstLaunch }) => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch && (
        <AuthStack.Screen name="Onboarding" component={Onboarding} />
      )}
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;