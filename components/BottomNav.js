import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

export default function BottomNav() {

  return (
    <View style={styles.container}>


      {/* DASHBOARD */}
      <TouchableOpacity
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.text}>
          🏠
        </Text>

        <Text style={styles.label}>
          Home
        </Text>
      </TouchableOpacity>


      {/* GROCERY */}
      <TouchableOpacity
        onPress={() => router.push("/grocery")}
      >
        <Text style={styles.text}>
          🛒
        </Text>

        <Text style={styles.label}>
          Grocery
        </Text>
      </TouchableOpacity>


      {/* EXPENSES */}
      <TouchableOpacity
        onPress={() => router.push("/expenses")}
      >
        <Text style={styles.text}>
          💰
        </Text>

        <Text style={styles.label}>
          Expenses
        </Text>
      </TouchableOpacity>


      {/* PROFILE */}
      <TouchableOpacity
        onPress={() => router.push("/profile")}
      >
        <Text style={styles.text}>
          👤
        </Text>

        <Text style={styles.label}>
          Profile
        </Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "space-around",

    backgroundColor: "white",

    paddingVertical: 12,

    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  text: {
    fontSize: 24,
    textAlign: "center",
  },

  label: {
    fontSize: 12,
    marginTop: 3,
  },

});