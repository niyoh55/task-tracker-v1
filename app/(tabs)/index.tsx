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
import { useEffect } from "react";
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
import messaging from "@react-native-firebase/messaging";

export default function TabOneScreen() {
  const router = useRouter();

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const { tasks, removeTask } = useTaskStore((state) => state);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    ); // Request permission for notifications

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log({ token123: token });
  };
  useEffect(() => {
    requestUserPermission(); // Request permission for notifications
    getToken();
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
