import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TaskForm from "@/components/TaskForm";

const AddTaskScreen = () => {
  return (
    <View className="flex-1 bg-[#112D4E] pt-5 pb-3">
      <TaskForm />
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({});
