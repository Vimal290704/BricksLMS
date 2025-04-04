import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import QuizScreen from '../Screens/QuizScreen';
import InstituteScreen from '../Screens/InstituteScreen';
import AIassistScreen from '../Screens/AIassistScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Quiz') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Institute') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'AI Help') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5B218F',
        tabBarInactiveTintColor: 'black', // darker version of the purple
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Institute" component={InstituteScreen} />
      <Tab.Screen name="AI Help" component={AIassistScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;