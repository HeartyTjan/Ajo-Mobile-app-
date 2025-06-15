import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import styles from "../styles/createAjoGroup.styles"; // create styles as needed
import { Stack } from "expo-router";
export default function CreateAjoGroup() {
  const [group, setGroup] = useState({
    name: "",
    description: "",
    amount: "",
    frequency: "",
    startDate: "",
    members: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setGroup((prev) => ({ ...prev, image: uri }));
    }
  };

  const handleSubmit = async () => {
    const { name, description, amount, frequency, startDate, members } = group;

    if (
      !name ||
      !description ||
      !amount ||
      !frequency ||
      !startDate ||
      !members
    ) {
      Alert.alert("Error", "All fields except image are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/ajo/create", {
        name,
        description,
        amount: parseFloat(amount),
        frequency,
        startDate,
        members: parseInt(members),
        image: group.image,
      });

      Alert.alert("Success", "Ajo Group Created");
      setGroup({
        name: "",
        description: "",
        amount: "",
        frequency: "",
        startDate: "",
        members: "",
        image: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert("Error", "Failed to create Ajo group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Stack.Screen
        options={{ title: "Create Ajo Group", headerShown: true }}
      />
      <View style={styles.field}>
        <Text style={styles.label}>Group Name</Text>
        <TextInput
          style={styles.input}
          value={group.name}
          onChangeText={(text) => setGroup({ ...group, name: text })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={group.description}
          onChangeText={(text) => setGroup({ ...group, description: text })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Contribution Amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={group.amount}
          onChangeText={(text) => setGroup({ ...group, amount: text })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Contribution Frequency</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., weekly, monthly"
          value={group.frequency}
          onChangeText={(text) => setGroup({ ...group, frequency: text })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={group.startDate}
          onChangeText={(text) => setGroup({ ...group, startDate: text })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Number of Members</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={group.members}
          onChangeText={(text) => setGroup({ ...group, members: text })}
        />
      </View>

      <View style={styles.field}>
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.uploadBtn}>Upload Group Image (optional)</Text>
        </TouchableOpacity>
        {group.image && (
          <Image
            source={{ uri: group.image }}
            style={{ width: 100, height: 100, marginTop: 10, borderRadius: 10 }}
          />
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          {loading ? "Creating..." : "Create Group"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
