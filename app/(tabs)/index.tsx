import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/dashboard.styles";
import ScreenWrapper from "@/app/components/screenWrapper";
import { useRouter } from "expo-router";
const DashboardScreen = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.overview}>Overview</Text>

        <View style={[styles.card, styles.green]}>
          <View style={styles.cardContent}>
            <View style={styles.iconBox}>
              <Ionicons name="cash" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.label}>Total Contributed</Text>
              <Text style={styles.value}>NGN 2,450</Text>
            </View>
          </View>
          <Text style={styles.badge}>+12%</Text>
        </View>

        <View style={[styles.card, styles.blue]}>
          <View style={styles.cardContent}>
            <View style={styles.iconBox}>
              <Ionicons name="people" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.label}>Active Groups</Text>
              <Text style={styles.value}>4</Text>
            </View>
          </View>
          <Text style={styles.badge}>+1</Text>
        </View>

        <View style={[styles.card, styles.pink]}>
          <View style={styles.cardContent}>
            <View style={styles.iconBox}>
              <Ionicons name="trending-up" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.label}>This Month</Text>
              <Text style={styles.value}>NGN 320</Text>
            </View>
          </View>
          <Text style={styles.badge}>+8%</Text>
        </View>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>

        <View style={styles.quickActionsGrid}>
          <View style={[styles.actionCard, { backgroundColor: "#ecfdf5" }]}>
            <View style={[styles.iconWrapper, { backgroundColor: "#059669" }]}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            <Text style={styles.actionTitle}>Add Money</Text>
            <Text style={styles.actionSubtitle}>Contribute to group</Text>
          </View>

          <View style={[styles.actionCard, { backgroundColor: "#eef2ff" }]}>
            <View style={[styles.iconWrapper, { backgroundColor: "#4f46e5" }]}>
              <Ionicons name="send" size={24} color="#fff" />
            </View>
            <Text style={styles.actionTitle}>Send</Text>
            <Text style={styles.actionSubtitle}>Transfer funds</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("../components/createAjoGroup")}
            style={[styles.actionCard, { backgroundColor: "#fdf4ff" }]}
          >
            <View>
              <View
                style={[styles.iconWrapper, { backgroundColor: "#d946ef" }]}
              >
                <Ionicons name="people" size={24} color="#fff" />
              </View>
              <Text style={styles.actionTitle}>New Group</Text>
              <Text style={styles.actionSubtitle}>Create group</Text>
            </View>
          </TouchableOpacity>

          <View style={[styles.actionCard, { backgroundColor: "#fff7ed" }]}>
            <View style={[styles.iconWrapper, { backgroundColor: "#f97316" }]}>
              <Ionicons name="card" size={24} color="#fff" />
            </View>
            <Text style={styles.actionTitle}>Pay Bills</Text>
            <Text style={styles.actionSubtitle}>Group expenses</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <View style={styles.activityCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#d1fae5" }]}>
            <Ionicons name="heart" size={24} color="#047857" />
          </View>
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityTitle}>Family Vacation Fund</Text>
            <Text style={styles.activitySubtitle}>2 hours ago</Text>
          </View>
          <Text style={[styles.amount, { color: "#047857" }]}>+₦50</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#fee2e2" }]}>
            <Ionicons name="boat" size={24} color="#dc2626" />
            {/* <Ionicons name="arrow-up-right" size={20} color="#dc2626" /> */}
          </View>
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityTitle}>Weekend Trip Payment</Text>
            <Text style={styles.activitySubtitle}>1 day ago</Text>
          </View>
          <Text style={[styles.amount, { color: "#dc2626" }]}>-₦120</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#e0e7ff" }]}>
            <Ionicons name="people" size={20} color="#4f46e5" />
          </View>
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityTitle}>Added to Birthday Fund</Text>
            <Text style={styles.activitySubtitle}>2 days ago</Text>
          </View>
          <Text style={[styles.amount, { color: "#3b82f6" }]}>New member</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#d1fae5" }]}>
            <Ionicons name="wallet" size={24} color="#047857" />
          </View>
          <View style={styles.activityTextContainer}>
            <Text style={styles.activityTitle}>Office Party Fund</Text>
            <Text style={styles.activitySubtitle}>3 days ago</Text>
          </View>
          <Text style={[styles.amount, { color: "#047857" }]}>+₦25</Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default DashboardScreen;
