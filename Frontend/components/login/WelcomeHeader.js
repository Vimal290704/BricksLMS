import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { welcomeContainer, welcomeText, appName, hiTextContainer, hiText } from '../../styles/loginStyles';

const WelcomeHeader = () => {
  // Animation values
  const welcomeAnim = useRef(new Animated.Value(0)).current;
  
  // Typing animation for "Hi Student!"
  const text = "Hi Student!";
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  
  useEffect(() => {
    // Welcome animation
    Animated.timing(welcomeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    
    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Hide cursor after a brief pause
        setTimeout(() => {
          setTypingComplete(true);
          setCursorVisible(false);
        }, 500);
      }
    }, 150); // Adjust typing speed here
    
    // Blink cursor while typing
    const cursorInterval = setInterval(() => {
      if (!typingComplete) {
        setCursorVisible(prev => !prev);
      }
    }, 500);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [typingComplete]);

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
        <Text style={hiText}>
          {displayedText}
          {cursorVisible && <Text style={{ color: '#fff' }}>|</Text>}
        </Text>
      </View>
    </Animated.View>
  );
};

export default WelcomeHeader;