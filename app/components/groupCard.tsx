import styles from "@/app/styles/groups.styles";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, Feather } from "@expo/vector-icons";

const GroupCard = ({ group }) => {
  console.log("card", group);

  const numberOfMembers =
    group.yet_to_collect_members.length +
    group.already_collected_members.length;

  console.log("members", numberOfMembers);

  const goal = group.amount * numberOfMembers;
  console.log("goal", goal);

  const percentage = ((group.saved / group.goal) * 100).toFixed(1);

  return (
    <View style={styles.groupCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.groupTitle}>{group.name}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{group.status}</Text>
        </View>
      </View>

      <Text style={styles.groupDescription}>{group.description}</Text>

      <View style={styles.progressRow}>
        {/* <Text style={styles.amountText}>₦{group..toLocaleString()}</Text> */}
        <Text style={styles.amountText}>₦ {goal.toLocaleString()}</Text>
        {}
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, backgroundColor: "#0f766e" },
          ]}
        />
      </View>
      <Text style={styles.percentText}>{percentage}% completed</Text>

      <View style={styles.detailsRow}>
        <Text style={styles.infoText}>
          <FontAwesome5 name="user-friends" size={14} /> {numberOfMembers}{" "}
          members
        </Text>
        <Text style={styles.infoText}>
          <Feather name="calendar" size={14} />{" "}
          {new Date(group.collection_deadline).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>
    </View>
  );
};
export default GroupCard;
