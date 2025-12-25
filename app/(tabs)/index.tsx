import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../hooks/useTheme";

export default function Index() {
  const { toggleDarkMode } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the index page </Text>
      <TouchableOpacity style={styles.button} onPress={toggleDarkMode}>
        <Text>Toggle dark</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    color: "red",
  },
});
