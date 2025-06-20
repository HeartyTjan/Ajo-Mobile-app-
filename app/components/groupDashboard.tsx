import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { getFromStorage } from "../components/storage";
import styles from "../styles/groupDashboard";
import { useLocalSearchParams } from "expo-router";

export default function AjoGroupDashboard() {
  const router = useRouter();
  const { group } = useLocalSearchParams();
  const [ajoGroup, setAjoGroup] = useState(null);

  useEffect(() => {
    try {
      const parsedGroup = typeof group === "string" ? JSON.parse(group) : group;
      setAjoGroup(parsedGroup);
    } catch {
      setAjoGroup(null);
    }
  }, [group]);

  const copyInviteLink = () => {
    const link = `https://ajor.com/invite/${ajoGroup?.invite_code || "code"}`;
    Clipboard.setString(link);
    ToastAndroid.show("Invite link copied!", ToastAndroid.SHORT);
  };

  if (!ajoGroup) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading group...</Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffff" }}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.groupName}>{ajoGroup?.name || "Ajo Group"}</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>
            {ajoGroup?.cycle || "Cycle"} - {ajoGroup?.type || "Type"}
          </Text>
        </View>
        <View style={styles.inviteContainer}>
          <View style={styles.inviteContainer}>
            <TouchableOpacity
              onPress={copyInviteLink}
              style={styles.inviteButton}
            >
              <Text style={styles.inviteButtonText}>Invite Me</Text>
              <Text style={styles.copyHintText}>(Tap to copy link)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Contributed</Text>
          <Text style={styles.statValue}>₦245,000</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Members</Text>
          <Text style={styles.statValue}>12</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Next Payout</Text>
          <Text style={styles.statValue}>₦20,000</Text>
        </View>
      </View>

      {/* Action Menu */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/ajo/recordPayment")}
        >
          <MaterialIcons name="payment" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>Record Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/ajo/transactions")}
        >
          <MaterialIcons name="receipt" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>View Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/ajo/settings")}
        >
          <Entypo name="cog" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>Group Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Activity Feed */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Text style={styles.activityItem}>John contributed ₦5,000 - Today</Text>
        <Text style={styles.activityItem}>
          Grace received ₦20,000 - 3 days ago
        </Text>
        <Text style={styles.activityItem}>New member added - Last week</Text>
      </View>
    </ScrollView>
  );
}
