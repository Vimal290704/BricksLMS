import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './components/Onboarding';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import HomeScreen from './components/HomeScreen';
import { useEffect, useState } from 'react';

// Loading Component
const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#F4338F" />
  </View>
);

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('@userToken');
        const onboardingStatus = await AsyncStorage.getItem('@viewedOnboarding');

        if (onboardingStatus !== null) setViewedOnboarding(true);
        if (token) setUserToken(token);
      } catch (e) {
        console.log('Error checking auth:', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!viewedOnboarding ? (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        ) : userToken ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
