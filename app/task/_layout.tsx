import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const TaskStackLayout = () => {
  return (
    <Stack initialRouteName="add">
      <Stack.Screen name="add" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TaskStackLayout;

const styles = StyleSheet.create({});
