import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import { CheckBox, Divider } from "@rneui/base";
import TaskListItem from "./TaskListItem";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date | undefined;
  priority: number;
}

const TaskList = ({ data }: { data: Task[] }): ReactElement => {
  const renderItem = ({ item }: { item: any }) => {
    return <TaskListItem item={item} />;
  };

  return (
    <Animated.FlatList
      keyboardDismissMode={"on-drag"}
      contentContainerClassName={`py-5 ${
        data.length !== 0 && "bg-[#3F72AF]"
      } rounded-2xl gap-y-2`}
      className={`px-3 py-10 bg-[#112D4E]`}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      itemLayoutAnimation={LinearTransition.duration(200)}
      ItemSeparatorComponent={() => (
        <Divider inset={false} insetType="middle" />
      )}
    />
  );
};

export default TaskList;

const styles = StyleSheet.create({});
