import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { useWelcomeAnimation } from '../../hooks/useAnimations';
import { welcomeContainer, welcomeText, appName, hiTextContainer, hiText } from '../../styles/loginStyles';

const WelcomeHeader = () => {
  // Animation values
  const welcomeAnim = useRef(new Animated.Value(0)).current;
  
  // Animated letters for "Hi Student!"
  const letters = "Hi Student!".split('');
  const letterAnims = letters.map(() => useRef(new Animated.Value(0)).current);
  
  // Custom hook to handle welcome animations
  useWelcomeAnimation(welcomeAnim, letterAnims);

  // Animation styles
  const welcomeStyle = {
    opacity: welcomeAnim,
    transform: [
      {
        translateY: welcomeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-30, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[welcomeContainer, welcomeStyle]}>
      <Text style={welcomeText}>Welcome to</Text>
      <Text style={appName}>BRICKS LMS</Text>
      
      <View style={hiTextContainer}>
        {letters.map((letter, index) => (
          <Animated.Text 
            key={index}
            style={[
              hiText,
              {
                opacity: letterAnims[index],
                transform: [
                  {
                    translateY: letterAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </Animated.View>
  );
};

export default WelcomeHeader;