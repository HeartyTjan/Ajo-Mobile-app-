import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/wallet.styles";
import axios from "axios";
import { getFromStorage } from "../components/storage";
import { useFocusEffect } from "expo-router";

const API_BASE = "http://172.16.0.176:8080";

const WalletScreen = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadWallet = async () => {
    try {
      const token = await getFromStorage("token");
      if (!token) {
        Alert.alert("Error", "User not authenticated");
        return;
      }

      const res = await axios.get(`${API_BASE}/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWallet(res.data);
    } catch (err) {
      console.error("Failed to load wallet", err);
      Alert.alert("Error", "Could not load wallet data");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWallet();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0f766e" />
      </View>
    );
  }

  if (!wallet) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No wallet found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wallet</Text>
        <Text style={styles.subtitle}>
          Account Number: {wallet.virtual_account_number || "N/A"}
        </Text>
        <Text style={styles.balance}>₦{wallet.balance.toLocaleString()}</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="add-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Fund Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="arrow-down-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.transactionSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <FlatList
          data={wallet.transactions || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <MaterialCommunityIcons
                name={
                  item.type === "credit"
                    ? "arrow-down-bold-circle"
                    : "arrow-up-bold-circle"
                }
                size={28}
                color={item.type === "credit" ? "#4CAF50" : "#ef4444"}
              />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDesc}>{item.description}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text
                style={[
                  styles.amount,
                  { color: item.type === "credit" ? "#4CAF50" : "#F44336" },
                ]}
              >
                {item.type === "credit" ? "+" : "-"}₦
                {item.amount.toLocaleString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No transactions found</Text>
          }
          ListFooterComponent={
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreText}>See more</Text>
            </TouchableOpacity>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
    </View>
  );
};

export default WalletScreen;
