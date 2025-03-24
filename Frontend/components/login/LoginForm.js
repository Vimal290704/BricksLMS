import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFormAnimation } from '../../hooks/useAnimations';
import { 
  formContainer, formStyle, inputContainer, inputContainerFocused, 
  inputLabel, input, loginButton, buttonGradient, loginButtonText 
} from '../../styles/loginStyles';

const LoginForm = ({ onLogin }) => {
  // Input state
  const [schoolCode, setSchoolCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSchoolCodeFocused, setIsSchoolCodeFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Animation values
  const formAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;
  
  // Custom hook to handle form animations
  useFormAnimation(formAnim);

  const handleLogin = () => {
    Animated.sequence([
      Animated.timing(buttonAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    onLogin(schoolCode, username, password);
  };

  // Animation styles
  const formAnimStyle = {
    opacity: formAnim,
    transform: [
      {
        translateY: formAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const buttonStyle = {
    transform: [{ scale: buttonAnim }],
  };

  return (
    <Animated.View style={[formContainer, formAnimStyle]}>
      <View style={[
        inputContainer,
        isSchoolCodeFocused && inputContainerFocused
      ]}>
        <Text style={inputLabel}>School Code</Text>
        <TextInput
          style={input}
          placeholder="Enter your school code"
          placeholderTextColor="#8a4fff"
          value={schoolCode}
          onChangeText={setSchoolCode}
          onFocus={() => setIsSchoolCodeFocused(true)}
          onBlur={() => setIsSchoolCodeFocused(false)}
          autoCapitalize="none"
        />
      </View>

      <View style={[
        inputContainer,
        isUsernameFocused && inputContainerFocused
      ]}>
        <Text style={inputLabel}>Username</Text>
        <TextInput
          style={input}
          placeholder="Enter your username"
          placeholderTextColor="#8a4fff"
          value={username}
          onChangeText={setUsername}
          onFocus={() => setIsUsernameFocused(true)}
          onBlur={() => setIsUsernameFocused(false)}
          autoCapitalize="none"
        />
      </View>

      <View style={[
        inputContainer,
        isPasswordFocused && inputContainerFocused
      ]}>
        <Text style={inputLabel}>Password</Text>
        <TextInput
          style={input}
          placeholder="Enter your password"
          placeholderTextColor="#8a4fff"
          value={password}
          onChangeText={setPassword}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          secureTextEntry
        />
      </View>

      <Animated.View style={buttonStyle}>
        <TouchableOpacity
          style={loginButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8a4fff', '#ba86fc', '#5a2ca0']}
            start={[0, 0]}
            end={[1, 0]}
            style={buttonGradient}
          >
            <Text style={loginButtonText}>Let's Learn!</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default LoginForm;