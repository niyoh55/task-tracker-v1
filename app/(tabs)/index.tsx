import { StyleSheet, TouchableOpacity, ViewToken } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import TaskList from "@/components/TaskList";
import useTaskStore, { TaskStore } from "@/features/tasks/store";
import { useRealTimeTasks } from "@/hooks/useRealTimeTask";
// import messaging from "@react-native-firebase/messaging";

export default function TabOneScreen() {
  const router = useRouter();
  useRealTimeTasks();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const { tasks, removeTask, setTasksList } = useTaskStore(
    (state: TaskStore) => state
  );

  useEffect(() => {
    // fetchTasks();
    // addTask();
    console.log({ tasksZustand: tasks });
  }, [tasks]);

  return (
    <SafeAreaView className="!flex-1 !bg-[#112D4E]">
      <TaskList data={tasks} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => router.navigate("/task/add")}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#DBE2EF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#3F72AF",
    fontSize: 24,
    fontWeight: "bold",
  },
});
