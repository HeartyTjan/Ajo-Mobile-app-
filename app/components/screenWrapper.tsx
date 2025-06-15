import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function ScreenWrapper({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={28} />

        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Hi, Sarah! 👋</Text>
          <Text style={styles.subtitle}>Welcome back</Text>
        </View>

        <MaterialIcons
          name="notifications"
          size={28}
          color="#111"
          style={styles.notificationIcon}
        />
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // push notification icon to the right
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  welcomeSection: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#555",
    fontSize: 14,
  },
  notificationIcon: {
    paddingRight: 5,
    paddingVertical: 8,
  },
});
