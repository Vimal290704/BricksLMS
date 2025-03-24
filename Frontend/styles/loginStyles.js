import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Main container styles
export const container = {
  flex: 1,
  backgroundColor: '#4a0072', // Ensure no white space at bottom
};

export const background = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

export const scrollContent = {
  flexGrow: 1,
  paddingBottom: 80, // Space for help button
};

export const content = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 60,
  paddingHorizontal: 20,
  paddingBottom: 40,
};

// Welcome header styles
export const welcomeContainer = {
  alignItems: 'center',
  marginBottom: 30,
};

export const welcomeText = {
  fontSize: 20,
  color: '#e1bee7',
  marginBottom: 5,
};

export const appName = {
  fontSize: 32,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 15,
};

export const hiTextContainer = {
  flexDirection: 'row',
  justifyContent: 'center',
};

export const hiText = {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#ffffff',
};

// Form styles
export const formContainer = {
  width: '100%',
  maxWidth: 350,
  backgroundColor: 'rgba(26, 0, 39, 0.7)',
  borderRadius: 20,
  padding: 25,
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
};

export const inputContainer = {
  backgroundColor: 'rgba(80, 0, 120, 0.6)',
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: 'rgba(186, 104, 200, 0.3)',
};

export const inputContainerFocused = {
  borderColor: '#ce93d8',
  borderWidth: 2,
};

export const inputLabel = {
  fontSize: 12,
  color: '#e1bee7',
  marginBottom: 4,
};

export const input = {
  fontSize: 16,
  color: 'white',
  paddingVertical: 6,
};

export const loginButton = {
  width: '100%',
  height: 54,
  borderRadius: 27,
  overflow: 'hidden',
  marginTop: 10,
  elevation: 3,
  shadowColor: '#9c27b0',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
};

export const buttonGradient = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

export const loginButtonText = {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
};

// Help button styles
export const helpButtonWrapper = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#4a0072',
  paddingVertical: 20,
  paddingHorizontal: 20,
  alignItems: 'center',
};

export const helpButtonContainer = {
  width: '70%',
  maxWidth: 250,
};

export const helpButton = {
  height: 40,
  borderRadius: 20,
  overflow: 'hidden',
  elevation: 3,
  shadowColor: '#9c27b0',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
};

export const helpButtonGradient = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

export const helpButtonText = {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#4a0072',
};

// Bubble styles
export const bubblesContainer = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

export const bubble = {
  position: 'absolute',
  borderRadius: 50,
  backgroundColor: 'rgba(206, 147, 216, 0.3)',
};

export const bubble1 = {
  width: 100,
  height: 100,
  left: '60%',
  top: '15%',
};

export const bubble2 = {
  width: 70,
  height: 70,
  left: '25%',
  top: '25%',
  backgroundColor: 'rgba(186, 104, 200, 0.3)',
};

export const bubble3 = {
  width: 120,
  height: 120,
  left: '40%',
  top: '70%',
  backgroundColor: 'rgba(156, 39, 176, 0.3)',
};