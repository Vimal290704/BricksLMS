import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Validation Schema using Yup
const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
});

const SignupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (values) => {
    setLoading(true);

    try {
      // Check if user already exists
      const existingUser = await AsyncStorage.getItem(`@user_${values.email}`);
      if (existingUser) {
        Alert.alert('Error', 'User already exists. Try logging in.');
        setLoading(false);
        return;
      }

      // Save user details
      const userData = JSON.stringify({ email: values.email, password: values.password });
      await AsyncStorage.setItem(`@user_${values.email}`, userData);
      await AsyncStorage.setItem('@userToken', values.email); // Store session token

      Alert.alert('Success', 'Account Created');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Already have an account? Log In</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: 300, padding: 10, marginBottom: 10, borderWidth: 1, borderRadius: 5, backgroundColor: '#fff' },
  button: { backgroundColor: '#F4338F', padding: 12, borderRadius: 5, width: 150, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 5 },
  link: { color: 'blue', marginTop: 10 },
});

export default SignupScreen;
