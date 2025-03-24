import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Light Purple Color Palette
const colors = {
  background: '#f5f5f5',
  primary: '#8a4fff',
  primaryLight: '#ba86fc',
  primaryDark: '#5a2ca0',
  text: '#333333',
  textLight: '#666666',
  inputBackground: '#f0f0f0',
  inputBorder: '#d1d1d1',
};

// Main container styles
export const container = {
  flex: 1,
  backgroundColor: colors.background,
};

export const background = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.1,
};

export const scrollContent = {
  flexGrow: 1,
  paddingBottom: 80,
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
  color: colors.primaryDark,
  marginBottom: 5,
};

export const appName = {
  fontSize: 32,
  fontWeight: 'bold',
  color: colors.primary,
  marginBottom: 15,
};

export const hiTextContainer = {
  flexDirection: 'row',
  justifyContent: 'center',
};

export const hiText = {
  fontSize: 28,
  fontWeight: 'bold',
  color: colors.primaryDark,
};

// Form styles
export const formContainer = {
  width: '100%',
  maxWidth: 350,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 25,
  elevation: 5,
  shadowColor: colors.primaryDark,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
};

export const inputContainer = {
  backgroundColor: colors.inputBackground,
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: colors.inputBorder,
};

export const inputContainerFocused = {
  borderColor: colors.primary,
  borderWidth: 2,
};

export const inputLabel = {
  fontSize: 12,
  color: colors.primaryDark,
  marginBottom: 4,
};

export const input = {
  fontSize: 16,
  color: colors.text,
  paddingVertical: 6,
};

export const loginButton = {
  width: '100%',
  height: 54,
  borderRadius: 27,
  overflow: 'hidden',
  marginTop: 10,
  elevation: 3,
  shadowColor: colors.primary,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
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
  backgroundColor: 'white',
  paddingVertical: 20,
  paddingHorizontal: 20,
  alignItems: 'center',
  borderTopWidth: 1,
  borderTopColor: colors.inputBorder,
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
  shadowColor: colors.primary,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
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
  color: 'white',
};

// Bubble styles
export const bubblesContainer = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0.3,
};

export const bubble = {
  position: 'absolute',
  borderRadius: 50,
  backgroundColor: colors.primaryLight,
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
  backgroundColor: colors.primary,
};

export const bubble3 = {
  width: 120,
  height: 120,
  left: '40%',
  top: '70%',
  backgroundColor: colors.primaryDark,
};