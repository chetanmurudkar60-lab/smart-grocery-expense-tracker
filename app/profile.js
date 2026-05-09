import { useEffect, useState } from "react";

import BottomNav from "../components/BottomNav";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

export default function ProfileScreen() {

  const [user, setUser] = useState(null);


  // LOAD USER
  const loadUser = async () => {
    try {

      const storedUser =
        await AsyncStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

    } catch (error) {

      console.log(error);

    }
  };


  // LOGOUT
  const handleLogout = async () => {
    try {

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      router.replace("/");

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    loadUser();
  }, []);


  return (

    <View style={{ flex: 1 }}>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >


        {/* HEADER */}
        <View style={styles.header}>

          <Text style={styles.smallHeading}>
            Your Account 👤
          </Text>

          <Text style={styles.heading}>
            Profile
          </Text>

        </View>


        {/* PROFILE CARD */}
        <View style={styles.profileCard}>


          {/* AVATAR */}
          <View style={styles.avatar}>

            <Text style={styles.avatarText}>
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </Text>

          </View>


          {/* NAME */}
          <Text style={styles.userName}>
            {user?.name || "Guest User"}
          </Text>


          {/* EMAIL */}
          <Text style={styles.userEmail}>
            {user?.email || "No Email"}
          </Text>

        </View>


        {/* STATS SECTION */}
        <View style={styles.statsRow}>


          <View style={styles.statsCard}>

            <Text style={styles.statsNumber}>
              100%
            </Text>

            <Text style={styles.statsText}>
              Active
            </Text>

          </View>


          <View style={styles.statsCard}>

            <Text style={styles.statsNumber}>
              Secure
            </Text>

            <Text style={styles.statsText}>
              Account
            </Text>

          </View>

        </View>


        {/* ACCOUNT SECTION */}
        <Text style={styles.sectionTitle}>
          Account Information
        </Text>


        <View style={styles.infoCard}>


          <View style={styles.infoRow}>

            <Text style={styles.label}>
              Full Name
            </Text>

            <Text style={styles.value}>
              {user?.name}
            </Text>

          </View>


          <View style={styles.divider} />


          <View style={styles.infoRow}>

            <Text style={styles.label}>
              Email Address
            </Text>

            <Text style={styles.value}>
              {user?.email}
            </Text>

          </View>

        </View>


        {/* SMART INSIGHT */}
        <View style={styles.insightCard}>

          <Text style={styles.insightTitle}>
            Smart Insight 🧠
          </Text>

          <Text style={styles.insightText}>
            Your grocery and expense tracking
            habits are helping you stay more
            organized and financially aware.
          </Text>

        </View>


        {/* LOGOUT BUTTON */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>


        {/* SPACE */}
        <View style={{ height: 120 }} />

      </ScrollView>


      {/* BOTTOM NAV */}
      <BottomNav />

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    paddingHorizontal: 20,
  },

  header: {
    paddingTop: 65,
    marginBottom: 25,
  },

  smallHeading: {
    fontSize: 16,
    color: "#666",
  },

  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111",
    marginTop: 5,
  },

  profileCard: {
    backgroundColor: "#4A90E2",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    elevation: 8,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#4A90E2",
  },

  userName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 18,
  },

  userEmail: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 8,
    fontSize: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },

  statsCard: {
    backgroundColor: "white",
    width: "48%",
    padding: 24,
    borderRadius: 22,
    alignItems: "center",
    elevation: 4,
  },

  statsNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },

  statsText: {
    marginTop: 6,
    color: "#666",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 18,
    color: "#111",
  },

  infoCard: {
    backgroundColor: "white",
    borderRadius: 22,
    padding: 24,
    elevation: 4,
  },

  infoRow: {
    marginVertical: 10,
  },

  label: {
    color: "#666",
    fontSize: 15,
  },

  value: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
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

  logoutButton: {
    backgroundColor: "#ef4444",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 35,
    elevation: 4,
  },

  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

});