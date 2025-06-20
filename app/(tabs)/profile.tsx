import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { saveToStorage, getFromStorage } from "../components/storage";
import { useFocusEffect, useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";

import styles from "../styles/profile.styles";

const API_BASE = "http://172.16.0.176:8080";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setLoading(true);

        try {
          const token = await getFromStorage("token");
          const decoded = jwtDecode(token);

          if (!decoded?.user_id) {
            console.log("Invalid or missing user ID");
            return;
          }

          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };

          // Always fetch user
          const userRes = await fetch(`${API_BASE}/users/${decoded.user_id}`, {
            headers,
          });

          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData);
            await saveToStorage("user", userData);
          }

          // Try to load profile from storage
          let storedProfile = await getFromStorage("user_profile");

          try {
            if (typeof storedProfile === "string") {
              storedProfile = JSON.parse(storedProfile);
            }
          } catch (e) {
            storedProfile = null;
          }

          const isValidProfile =
            storedProfile &&
            typeof storedProfile === "object" &&
            Object.keys(storedProfile).length > 0;

          if (isValidProfile) {
            // console.log("Using stored profile", storedProfile);
            console.log("Profile data", storedProfile.profile_pic);

            setProfile(storedProfile);
          } else {
            console.log("No valid profile in storage, fetching...");
            const profileRes = await fetch(
              `${API_BASE}/profile/${decoded.user_id}`,
              { headers }
            );

            if (profileRes.ok) {
              const profileData = await profileRes.json();
              console.log("Profile data", profileData.profile_pic);

              setProfile(profileData);
              await saveToStorage("user_profile", profileData);
            } else {
              console.log("Failed to fetch profile:", profileRes.status);
            }
          }
        } catch (err) {
          console.log("Profile Fetch Error:", err);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [])
  );

  const handleSignOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          await saveToStorage("token", null);
          await saveToStorage("user", null);
          await saveToStorage("user_profile", null);
          router.replace("/(auth)/login/login");
        },
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          {profile?.profile_pic?.startsWith("file://") ? (
            <Image
              source={{ uri: profile.profile_pic }}
              style={{ width: 150, height: 110, borderRadius: 50 }}
            />
          ) : (
            <Text style={styles.avatarText}>
              {user?.username?.charAt(0).toUpperCase() || "J"}
            </Text>
          )}
        </View>
        <Text style={styles.username}>{user?.username || "John Doe"}</Text>
        <View style={styles.verified}>
          <Text style={styles.verifiedText}>
            {user?.verified ? "Verified" : "Unverified"}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator
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
          <Text style={styles.aboutText}>{profile?.bio || ""}</Text>

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
              <MaterialIcons name="edit" size={24} color="#0f766e" />
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
              <MaterialIcons name="settings" size={24} color="#0f766e" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Entypo name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="help-outline" size={24} color="#0f766e" />
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
