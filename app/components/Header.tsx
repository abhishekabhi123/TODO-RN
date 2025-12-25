import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import useTheme from "../hooks/useTheme";

const Header = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const completedTodos = todos
    ? todos.map((todo) => todo.isCompleted).length
    : 0;
  const totalTodos = todos ? todos.length : 0;
  const todosPercentage = todos ? (completedTodos / totalTodos) * 100 : 0;
  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.container}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        ></LinearGradient>
      </View>
    </View>
  );
};

export default Header;
