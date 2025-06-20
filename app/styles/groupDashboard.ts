// styles/groupDashboard.js

import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export default StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
  },
  groupName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  tagContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  inviteContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  inviteLink: {
    fontSize: 14,
    color: "#fff",
    textDecorationLine: "underline",
    marginBottom: 4,
  },
  copyHintText: {
    fontSize: 12,
    color: "#e0e0e0",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 20,
  },
  statCard: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statTitle: {
    fontSize: 13,
    color: "#777",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
    color: "#333",
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  menuItem: {
    width: "40%",
    padding: 16,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
  },
  activitySection: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  activityItem: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
  },

  inviteButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: "center",
  },
  inviteButtonText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
  },
});
