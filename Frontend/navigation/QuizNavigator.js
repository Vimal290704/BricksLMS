import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuizScreen from '../Screens/QuizScreen';
import CustomQuizScreen from '../Screens/QuizScreens/CustomQuizScreen';
import ManualQuizScreen from '../Screens/QuizScreens/ManualQuizScreen';

const Stack = createStackNavigator();

const QuizNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Quiz" 
        component={QuizScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CustomQuizScreen" 
        component={CustomQuizScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ManualQuizScreen" 
        component={ManualQuizScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default QuizNavigator;