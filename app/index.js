import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

import API from "../services/api";

export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");


  // LOGIN
  const handleLogin = async () => {

    if (!email || !password) {
      return Alert.alert(
        "Please fill all fields"
      );
    }

    try {

      const response =
        await API.post("/auth/login", {
          email,
          password,
        });


      // SAVE TOKEN
      await AsyncStorage.setItem(
        "token",
        response.data.token
      );


      // SAVE USER
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      Alert.alert("Login Success");

      router.replace("/dashboard");

    } catch (error) {

      Alert.alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };


  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >


      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.smallHeading}>
          Welcome Back 👋
        </Text>

        <Text style={styles.heading}>
          Grocery Tracker
        </Text>

        <Text style={styles.subHeading}>
          Manage groceries and track
          expenses smarter every day.
        </Text>

      </View>


      {/* LOGIN CARD */}
      <View style={styles.loginCard}>


        {/* EMAIL */}
        <Text style={styles.label}>
          Email Address
        </Text>

        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#999"
          style={styles.input}
        />


        {/* PASSWORD */}
        <Text style={styles.label}>
          Password
        </Text>

        <TextInput
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
          style={styles.input}
        />


        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>
            Login
          </Text>
        </TouchableOpacity>


        {/* SIGNUP BUTTON */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() =>
            router.replace("/signup")
          }
        >
          <Text style={styles.signupText}>
            Create New Account
          </Text>
        </TouchableOpacity>

      </View>


      {/* INSIGHT CARD */}
      <View style={styles.insightCard}>

        <Text style={styles.insightTitle}>
          Smart Budgeting 🧠
        </Text>

        <Text style={styles.insightText}>
          Track expenses, organize grocery
          lists, and improve spending habits
          with a clean productivity-focused
          experience.
        </Text>

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#f4f7fb",
    paddingHorizontal: 24,
    paddingTop: 75,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 35,
  },

  smallHeading: {
    fontSize: 16,
    color: "#666",
  },

  heading: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#111",
    marginTop: 5,
  },

  subHeading: {
    marginTop: 12,
    color: "#666",
    lineHeight: 22,
    fontSize: 15,
  },

  loginCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 28,
    elevation: 5,
  },

  label: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#f5f7fa",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#4A90E2",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 18,
    elevation: 4,
  },

  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  signupButton: {
    alignItems: "center",
    marginTop: 22,
  },

  signupText: {
    color: "#4A90E2",
    fontWeight: "600",
    fontSize: 15,
  },

  insightCard: {
    backgroundColor: "#111827",
    marginTop: 30,
    borderRadius: 24,
    padding: 24,
  },

  insightTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  insightText: {
    color: "#d1d5db",
    marginTop: 10,
    lineHeight: 22,
    fontSize: 15,
  },

});