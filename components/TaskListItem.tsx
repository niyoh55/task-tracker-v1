import { PRIORITY_MAP } from "@/constants";
import { deleteTask, updateTask } from "@/features/tasks/api";
import useTaskStore from "@/features/tasks/store";
import { FontAwesome5 } from "@expo/vector-icons";
import { CheckBox } from "@rneui/base";
import React from "react";
import { View, Animated, Text } from "react-native";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface ListItemProps {
  item: {
    id: string;
    title: string;
    date: Date | undefined;
    priority: number;
    completed: boolean;
  };
}

const TaskListItem: React.FC<ListItemProps> = ({ item }) => {
  const { tasks, removeTask } = useTaskStore((state) => state);

  return (
    <Animated.View className="flex-1 rounded-lg pl-5 pr-0 !bg-[#3F72AF] py-3 flex-row items-center">
      <View className="items-center justify-center pr-3">
        <FontAwesome5
          size={20}
          name="flag"
          color={PRIORITY_MAP[item.priority].color}
          solid
        />
      </View>
      <View className="!bg-[#3F72AF] flex-1 justify-center">
        <Text
          className={`!text-[#F9F7F7] text-2xl ${
            item?.completed && "line-through"
          } decoration-4`}
        >
          {item.title}
        </Text>
        {item?.date && (
          <Text className="!text-[#F9F7F7] text-base">
            {item.date?.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        )}
      </View>
      <View className="!bg-[#3F72AF] z-10">
        <BouncyCheckbox
          size={25}
          fillColor="#112D4E"
          unFillColor="#FFFFFF"
          iconStyle={{ borderColor: "red", borderRadius: 0 }}
          innerIconStyle={{ borderWidth: 0 }}
          onLongPress={() => {
            if (item?.completed) {
              deleteTask(item.id);
            } else {
              updateTask(item.id, {
                completed: true,
              });
            }
          }}
          onPress={(isChecked: boolean) => {
            updateTask(item.id, {
              completed: isChecked,
            });
          }}
          isChecked={item?.completed}
        />
      </View>
    </Animated.View>
  );
};

const styles = {
  item: {
    height: 100,
    width: "90%",
    backgroundColor: "#34B7F1",
    marginVertical: 20,
    borderRadius: 15,
    alignSelf: "center",
  },
};

export default TaskListItem;
