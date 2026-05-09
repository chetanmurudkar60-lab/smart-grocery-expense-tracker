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

import { router } from "expo-router";

import API from "../services/api";

export default function SignupScreen() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");


  // SIGNUP
  const handleSignup = async () => {

    if (!name || !email || !password) {
      return Alert.alert(
        "Please fill all fields"
      );
    }

    try {

      const response =
        await API.post("/auth/signup", {
          name,
          email,
          password,
        });

      Alert.alert(response.data.message);

      router.replace("/");

    } catch (error) {

      Alert.alert(
        error.response?.data?.message ||
        "Signup Failed"
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
          Create Your Account 🚀
        </Text>

        <Text style={styles.heading}>
          Signup
        </Text>

        <Text style={styles.subHeading}>
          Start managing groceries and
          expenses smarter.
        </Text>

      </View>


      {/* FORM CARD */}
      <View style={styles.formCard}>


        {/* NAME */}
        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#999"
        />


        {/* EMAIL */}
        <Text style={styles.label}>
          Email Address
        </Text>

        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#999"
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
          style={styles.input}
          placeholderTextColor="#999"
        />


        {/* SIGNUP BUTTON */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
        >
          <Text style={styles.signupText}>
            Create Account
          </Text>
        </TouchableOpacity>


        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() =>
            router.replace("/")
          }
        >
          <Text style={styles.loginText}>
            Already have an account?
            Login
          </Text>
        </TouchableOpacity>

      </View>


      {/* INSIGHT CARD */}
      <View style={styles.insightCard}>

        <Text style={styles.insightTitle}>
          Smart Tracking 🧠
        </Text>

        <Text style={styles.insightText}>
          Organize groceries, manage
          expenses, and improve your
          budgeting habits in one app.
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
    paddingTop: 70,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 30,
  },

  smallHeading: {
    fontSize: 16,
    color: "#666",
  },

  heading: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#111",
    marginTop: 6,
  },

  subHeading: {
    marginTop: 10,
    color: "#666",
    lineHeight: 22,
    fontSize: 15,
  },

  formCard: {
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

  signupButton: {
    backgroundColor: "#4A90E2",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 15,
    elevation: 4,
  },

  signupText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  loginButton: {
    alignItems: "center",
    marginTop: 22,
  },

  loginText: {
    color: "#4A90E2",
    fontWeight: "600",
    fontSize: 15,
  },

  insightCard: {
    backgroundColor: "#111827",
    marginTop: 28,
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