import { useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Welcome animation hook
export const useWelcomeAnimation = (welcomeAnim, letterAnims) => {
  useEffect(() => {
    // Welcome text letter-by-letter animation
    const letterAnimations = letterAnims.map((anim, index) => {
      return Animated.timing(anim, {
        toValue: 1,
        duration: 200,
        delay: index * 100,
        useNativeDriver: true,
      });
    });

    // Main sequence of animations
    Animated.sequence([
      Animated.timing(welcomeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.stagger(100, letterAnimations),
    ]).start();
  }, []);
};

// Form animation hook
export const useFormAnimation = (formAnim) => {
  useEffect(() => {
    Animated.timing(formAnim, {
      toValue: 1,
      duration: 800,
      delay: 1500, // Delay after welcome animation
      useNativeDriver: true,
    }).start();
  }, []);
};

// Help button animation hook
export const useHelpButtonAnimation = (helpButtonScale) => {
  useEffect(() => {
    // Help button pulse animation
    const pulseAnimation = () => {
      Animated.sequence([
        Animated.timing(helpButtonScale, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(helpButtonScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => setTimeout(pulseAnimation, 3000));
    };
    pulseAnimation();
  }, []);
};

// Bubble animations hook
export const useAnimatedBubbles = (
  bubble1Anim, 
  bubble2Anim, 
  bubble3Anim, 
  bubble1Scale, 
  bubble2Scale, 
  bubble3Scale,
  width,
  height
) => {
  useEffect(() => {
    // Animate bubbles continuously
    const animateBubble1 = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(bubble1Scale, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble1Scale, {
            toValue: 0.7,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bubble1Anim, {
            toValue: { x: width * 0.1, y: -height * 0.05 },
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble1Anim, {
            toValue: { x: -width * 0.1, y: -height * 0.1 },
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animateBubble1());
    };

    const animateBubble2 = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(bubble2Scale, {
            toValue: 0.8,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble2Scale, {
            toValue: 0.5,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bubble2Anim, {
            toValue: { x: -width * 0.15, y: -height * 0.07 },
            duration: 6000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble2Anim, {
            toValue: { x: width * 0.1, y: -height * 0.12 },
            duration: 6000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animateBubble2());
    };

    const animateBubble3 = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(bubble3Scale, {
            toValue: 0.9,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(bubble3Scale, {
            toValue: 0.6,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(bubble3Anim, {
            toValue: { x: width * 0.12, y: -height * 0.09 },
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(bubble3Anim, {
            toValue: { x: -width * 0.08, y: -height * 0.04 },
            duration: 5000,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animateBubble3());
    };

    animateBubble1();
    setTimeout(() => animateBubble2(), 500);
    setTimeout(() => animateBubble3(), 1000);

    // Clean up animations when component unmounts
    return () => {
      // Animation cleanup if needed
    };
  }, []);
};