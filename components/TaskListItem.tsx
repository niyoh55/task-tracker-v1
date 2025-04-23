import { PRIORITY_MAP } from "@/constants";
import useTaskStore from "@/store/taskStore";
import { FontAwesome5 } from "@expo/vector-icons";
import { CheckBox } from "@rneui/base";
import React from "react";
import { View, Animated, Text } from "react-native";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

interface ListItemProps {
  item: { id: string; title: string; date: Date | undefined; priority: number };
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
        <Text className="!text-[#F9F7F7] text-2xl">{item.title}</Text>
        {item?.date && (
          <Text className="!text-[#F9F7F7] text-base">
            {item.date?.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        )}
        {/* <Text
          className={`text-sm`}
          style={{ color: PRIORITY_MAP[item.priority].color }}
        >
          {PRIORITY_MAP[item.priority].description}
        </Text> */}
      </View>
      <View className="!bg-[#3F72AF] z-10">
        <CheckBox
          className="!bg-[#3F72AF]"
          checked={false}
          onPress={() => {
            removeTask(item.id);
          }}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={"checkbox-blank-outline"}
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
