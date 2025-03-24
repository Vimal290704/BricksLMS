import React, { useEffect, useRef } from 'react';
import { View, Dimensions, Animated } from 'react-native';
import { useAnimatedBubbles } from '../../hooks/useAnimations';
import { bubblesContainer, bubble, bubble1, bubble2, bubble3 } from '../../styles/loginStyles';

const { width, height } = Dimensions.get('window');

const AnimatedBackground = () => {
  // Animation values
  const bubble1Anim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const bubble2Anim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const bubble3Anim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const bubble1Scale = useRef(new Animated.Value(0.7)).current;
  const bubble2Scale = useRef(new Animated.Value(0.5)).current;
  const bubble3Scale = useRef(new Animated.Value(0.6)).current;

  // Custom hook to handle bubble animations
  useAnimatedBubbles(bubble1Anim, bubble2Anim, bubble3Anim, bubble1Scale, bubble2Scale, bubble3Scale, width, height);

  // Bubble styles
  const bubble1Style = {
    transform: [
      { translateX: bubble1Anim.x },
      { translateY: bubble1Anim.y },
      { scale: bubble1Scale },
    ],
  };

  const bubble2Style = {
    transform: [
      { translateX: bubble2Anim.x },
      { translateY: bubble2Anim.y },
      { scale: bubble2Scale },
    ],
  };

  const bubble3Style = {
    transform: [
      { translateX: bubble3Anim.x },
      { translateY: bubble3Anim.y },
      { scale: bubble3Scale },
    ],
  };

  return (
    <View style={bubblesContainer}>
      <Animated.View style={[bubble, bubble1, bubble1Style]} />
      <Animated.View style={[bubble, bubble2, bubble2Style]} />
      <Animated.View style={[bubble, bubble3, bubble3Style]} />
    </View>
  );
};

export default AnimatedBackground;