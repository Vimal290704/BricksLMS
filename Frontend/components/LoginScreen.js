import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const clearOnboarding = async () => {
     try{
       await AsyncStorage.removeItem('isAppFirstLaunched');
     }catch(error){
       console.log(error)
     }
  }
  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
      <View style={styles.waveTop} />
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.subtitle}>Enter details provided by your organisation</Text>
      
      <View style={styles.inputContainer}>
        <TextInput placeholder="School Code" style={styles.input} placeholderTextColor="#aaa" />
        <TextInput placeholder="Username" style={styles.input} placeholderTextColor="#aaa" />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry placeholderTextColor="#aaa" />
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
        <AntDesign name="arrowright" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={clearOnboarding}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.waveBottom} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 30,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    color: "#fff",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5a00b4",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
  },
  waveTop: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 120,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  waveBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 120,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});