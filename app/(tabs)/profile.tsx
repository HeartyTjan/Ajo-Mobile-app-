import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import styles from "../styles/profile.styles";
import { saveToStorage, getFromStorage } from "../components/storage";
import { useRouter } from "expo-router";

const API_BASE = "http://localhost:8080";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const token = await getFromStorage("token");
      const storedUser = await getFromStorage("user");

      setUser(storedUser);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(`${API_BASE}/profile/${storedUser?.id}`, {
        headers,
      });
      const profileData = await response.json();
      setProfile(profileData);
      await saveToStorage("user_profile", profileData);
    } catch (error) {
      console.log("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSignOut = async () => {
  //   await saveToStorage("token", null);
  //   await saveToStorage("user", null);
  //   navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleSignOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          await saveToStorage("token", null);
          await saveToStorage("user", null);
          router.replace("/(auth)/login/login");
        },
      },
    ]);
  };
  // if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={styles.scrollContainer}>
      <LinearGradient
        colors={["#3b82f6", "#8b5cf6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.username?.charAt(0).toUpperCase() || "J"}
          </Text>
        </View>
        <Text style={styles.username}>{user?.username || "John Doe"}</Text>
        <View style={styles.verified}>
          <Text style={styles.verifiedText}>
            {user?.verified ? "Verified" : "Unverified"}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Contributed</Text>
            <Text style={styles.money}>$2,450</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Groups</Text>
            <Text style={styles.groups}>4</Text>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutText}>
            {profile?.bio ||
              "Passionate about group savings and financial literacy. Love helping others achieve their financial goals!"}
          </Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color="gray" />
            <Text style={styles.infoText}>
              {user?.email || "user@example.com"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={20} color="gray" />
            <Text style={styles.infoText}>{user?.phone || "000-000-0000"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Entypo name="location-pin" size={20} color="gray" />
            <Text style={styles.infoText}>
              {profile?.location || "Unknown Location"}
            </Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("../components/editProfile")}
          >
            <View style={styles.menuIcon}>
              <MaterialIcons name="edit" size={24} color="#3b82f6" />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <Entypo name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("../components/settings")}
          >
            <View style={styles.menuIcon}>
              <MaterialIcons name="settings" size={24} color="#3b82f6" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Entypo name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Support")}
          >
            <View style={styles.menuIcon}>
              <MaterialIcons name="help-outline" size={24} color="#3b82f6" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <Entypo name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="logout" size={24} color="#ef4444" />
            </View>
            <Text style={[styles.menuText, { color: "#ef4444" }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
