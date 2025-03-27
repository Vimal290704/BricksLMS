import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import CustomInput from '../components/CustomInput';
//import authService from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [schoolCode, setSchoolCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // try {
    //   const response = await authService.login(schoolCode, username, password);
      
    //   if (response.success) {
    //     // Navigate to Home screen
    //     navigation.replace('Home');
    //   } else {
    //     // Handle login failure
    //     Alert.alert('Login Failed', response.message);
    //   }
    // } catch (error) {
    //   console.error('Login error:', error);
    //   Alert.alert('Error', 'Something went wrong. Please try again.');
    // }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.appName}>BricksLMS</Text>
          <Text style={styles.tagline}>ज्ञान शक्ति:</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Hi Student!</Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="School Code"
            value={schoolCode}
            onChangeText={setSchoolCode}
          />
          <CustomInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Need Help?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A3FFC',
    marginTop: 10,
  },
  tagline: {
    fontSize: 14,
    color: '#8A3FFC',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#8A3FFC',
  },
  loginButton: {
    backgroundColor: '#8A3FFC',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;