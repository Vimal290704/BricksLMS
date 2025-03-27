import React , { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, useColorScheme, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from '../context/AuthContext';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import Onboarding from '../components/Onboarding/Onboarding';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

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
    const {isLoading , isLoggedIn} = useAuth();
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

  if (isAppFirstLaunched === null) return null; // Prevents rendering before AsyncStorage check

    if(isLoading){
        return <LoadingScreen />;
    }

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? 
            (<>
                <Stack.Screen name='Home' component={HomeScreen} />
            </>):(
                <>
                {isAppFirstLaunched && (
                    <Stack.Screen name='Onboarding' component={Onboarding} />
                )}
                <Stack.Screen name='Login' component={LoginScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}

export const AppNavigator = () =>{
    return(
        <AuthProvider>
            <NavigationContainer>
                <AppNavigatorContent />
            </NavigationContainer>
        </AuthProvider>
    )
}