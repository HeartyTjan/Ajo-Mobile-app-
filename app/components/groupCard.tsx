import styles from "@/app/styles/groups.styles";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, Feather } from "@expo/vector-icons";

const GroupCard = ({ group }) => {
  const percentage = ((group.saved / group.goal) * 100).toFixed(1);

  return (
    <View style={styles.groupCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.groupTitle}>{group.title}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{group.status}</Text>
        </View>
      </View>

      <Text style={styles.groupDescription}>{group.description}</Text>

      <View style={styles.progressRow}>
        <Text style={styles.amountText}>${group.saved.toLocaleString()}</Text>
        <Text style={styles.amountText}>${group.goal.toLocaleString()}</Text>
      </View>

      <View style={styles.progressBar}>
        <LinearGradient
          colors={["#3b82f6", "#8b5cf6"]}
          style={[styles.progressFill, { width: `${percentage}%` }]}
        />
      </View>
      <Text style={styles.percentText}>{percentage}% completed</Text>

      <View style={styles.detailsRow}>
        <Text style={styles.infoText}>
          <FontAwesome5 name="user-friends" size={14} /> {group.members} members
        </Text>
        <Text style={styles.infoText}>
          <Feather name="calendar" size={14} /> {group.dueDate}
        </Text>
      </View>
    </View>
  );
};
export default GroupCard;
