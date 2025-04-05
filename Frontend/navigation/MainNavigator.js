import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import QuizScreen from '../Screens/QuizScreen';
import InstituteScreen from '../Screens/InstituteScreen';
import AIassistScreen from '../Screens/AIassistScreen';
import QuizNavigator from './QuizNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'QuizTab') {
            iconName = focused ? 'reader' : 'reader-outline';
          } else if (route.name === 'InstituteTab') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'AI Help') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#815AD5',
        tabBarInactiveTintColor: '#5D3E9E',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
        }
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="QuizTab" 
        component={QuizNavigator} 
        options={{ title: 'Quiz' }}
      />
      <Tab.Screen 
        name="InstituteTab" 
        component={InstituteScreen} 
        options={{ title: 'Institute' }}
      />
      <Tab.Screen 
        name="AI Help" 
        component={AIassistScreen} 
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;