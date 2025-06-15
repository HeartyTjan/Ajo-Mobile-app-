import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useMemo } from "react";
// import ScreenWrapper from "@/components/screenWrapper";
// import { MaterialIcons } from "@expo/vector-icons";
import GroupCard from "@/app/components/groupCard";
import styles from "../styles/groups.styles";
import { useRouter } from "expo-router";

const mockBackendData = async () => {
  return {
    totalSaved: 23000,
    groups: [
      {
        id: 1,
        title: "Family Vacation Fund",
        description: "Saving for our annual family trip to Hawaii",
        saved: 8500,
        goal: 15000,
        members: 6,
        dueDate: "Jun 15",
        status: "Active",
      },
      {
        id: 2,
        title: "Wedding Savings",
        description: "Contribution towards Sarah’s wedding",
        saved: 7000,
        goal: 10000,
        members: 5,
        dueDate: "Aug 30",
        status: "Active",
      },
      {
        id: 3,
        title: "Project X Fund",
        description: "Funding side project with team",
        saved: 7500,
        goal: 12000,
        members: 4,
        dueDate: "Jul 10",
        status: "Active",
      },
    ],
  };
};

export default function MyGroupsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await mockBackendData();
      setGroups(data?.groups);
      setTotalSaved(data.totalSaved);
    };
    fetchData();
  }, []);

  const filteredGroups = useMemo(() => {
    return groups.filter((group) =>
      group.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [groups, searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Groups</Text>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search groups..."
          style={styles.input}
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

      <View style={styles.summaryBox}>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Active Groups</Text>
          <Text style={styles.value}>{groups.length}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Total Saved</Text>
          <Text style={[styles.value, { color: "#22c55e" }]}>
            ${totalSaved.toLocaleString()}
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <GroupCard group={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
