import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

export default function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={styles.iconButtonLabel} onPress={onPress}>
      <MaterialIcon name={icon} size={24} color={"#fff"} />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  IconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});