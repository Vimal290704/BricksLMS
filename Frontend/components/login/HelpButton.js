import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useHelpButtonAnimation } from '../../hooks/useAnimations';
import { 
  helpButtonWrapper, helpButtonContainer, helpButton, 
  helpButtonGradient, helpButtonText 
} from '../../styles/loginStyles';

const HelpButton = ({ onPress }) => {
  const helpButtonScale = useRef(new Animated.Value(1)).current;
  
  // Custom hook to handle help button animation
  useHelpButtonAnimation(helpButtonScale);

  const handleHelpPress = () => {
    Animated.sequence([
      Animated.timing(helpButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(helpButtonScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(helpButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    onPress();
  };

  const helpButtonStyle = {
    transform: [{ scale: helpButtonScale }],
  };

  return (
    <View style={helpButtonWrapper}>
      <Animated.View style={[helpButtonContainer, helpButtonStyle]}>
        <TouchableOpacity
          style={helpButton}
          onPress={handleHelpPress}
        >
          <LinearGradient
            colors={['#8a4fff', '#ba86fc', '#5a2ca0']}
            style={helpButtonGradient}
          >
            <Text style={helpButtonText}>Need Help?</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default HelpButton;