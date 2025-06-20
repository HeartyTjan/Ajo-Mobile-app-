import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect, useMemo } from "react";
import GroupCard from "@/app/components/groupCard";
import styles from "../styles/groups.styles";
import { useRouter } from "expo-router";
import axios from "axios";
import { getFromStorage } from "../components/storage";
import { jwtDecode } from "jwt-decode";

const API_BASE = "http://172.16.0.176:8080";

export default function MyGroupsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteLink, setInviteLink] = useState("");

  const loadGroups = async () => {
    try {
      const token = await getFromStorage("token");
      const decoded = jwtDecode(token);

      if (!decoded?.user_id) {
        console.log("Invalid or missing user ID");
        return;
      }

      if (!token) return;

      const res = await axios.get(
        `${API_BASE}/contributions/groups/${decoded.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGroups(res.data);
    } catch (error) {
      console.error("Failed to fetch contributions:", error);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const filteredGroups = useMemo(() => {
    return groups.filter((group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [groups, searchQuery]);

  const handleJoinGroup = async () => {
    if (!inviteLink.trim()) {
      Alert.alert("Error", "Please enter a valid invite link");
      return;
    }

    const inviteCode = inviteLink.split("/").pop();
    if (!inviteCode) {
      Alert.alert("Error", "Invalid link format");
      return;
    }

    try {
      const token = await getFromStorage("token");
      if (!token) {
        Alert.alert("Error", "User not authenticated");
        return;
      }

      await axios.post(
        `${API_BASE}/contributions/join`,
        {
          invite_code: inviteCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Success", "You have joined the Ajo group");
      loadGroups();
      setInviteLink("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.error || "Failed to join group"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Groups</Text>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search groups..."
          style={styles.inputsearch}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push("../components/createAjoGroup")}
        >
          <Text style={styles.createText}>+ Create</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.joinBox}>
        <Text style={styles.label}>Join a Group</Text>
        <TextInput
          placeholder="Paste invite link here"
          placeholderTextColor="#999"
          style={styles.input}
          value={inviteLink}
          onChangeText={setInviteLink}
        />
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinGroup}>
          <Text style={styles.joinButtonText}>Join Group</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "../components/groupDashboard",
                params: { group: JSON.stringify(item) },
              })
            }
          >
            <GroupCard group={item} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
