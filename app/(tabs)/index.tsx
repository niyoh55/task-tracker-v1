import {
  Alert,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ViewToken,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import useTaskStore from "@/store/taskStore";
import Animated, {
  FadeIn,
  FadeOut,
  JumpingTransition,
  LinearTransition,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import { CheckBox, Divider } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import TaskList from "@/components/TaskList";
import firestore from "@react-native-firebase/firestore";
// import messaging from "@react-native-firebase/messaging";

export type Task = {
  id: string;
  title: string;
  // description: string;
  completed: boolean;
  date: Date | string | undefined;
  priority: number;
};

export default function TabOneScreen() {
  const router = useRouter();

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const { tasks, removeTask, setTasksList } = useTaskStore((state) => state);

  const fetchTasks = async () => {
    const tasks = await firestore().collection("tasks").get();
    const tasksList: Task[] = tasks.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        // description: data.description || "",
        completed: data.completed || false,
        date: (data?.date && new Date(data?.date?.seconds * 1000)) || "",
        priority: data.priority || 0,
      };
    });
    console.log({ tasksList });
    if (tasksList.length > 0) {
      setTasksList(tasksList);
    }
  };

  const addTask = async () => {
    const addTask123 = await firestore()
      .collection("tasks")
      .add({
        title: "wews123",
        completed: false,
        date: new Date(),
        priority: 0,
      })
      .then(() => {
        console.log("User added!");
      });
    console.log({ addTask123: addTask123 });
  };

  useEffect(() => {
    fetchTasks();
    // addTask();
  }, []);

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
