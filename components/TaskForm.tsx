import React, { ReactElement, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, Input } from "@rneui/themed";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { CheckBox, Icon } from "@rneui/base";
import useTaskStore from "@/store/taskStore";
import { useRouter } from "expo-router";

const TaskForm = (): ReactElement => {
  const router = useRouter();
  const { addTask } = useTaskStore((state) => state);

  const [text, setText] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedIndex, setIndex] = useState(0);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const clearAllInputs = () => {
    setText("");
    setIndex(0);
    setDate(undefined);
  };

  const handleSubmit = () => {
    addTask({
      id: Math.random().toString(36).substring(7),
      title: text ? text : "Task Name",
      completed: false,
      date: date,
      priority: selectedIndex,
    });
    clearAllInputs();
    router.back();
  };

  return (
    <View className="flex-1 px-5 bg-[#112D4E]">
      <View className="flex-row items-center justify-center">
        <Input
          label="Task Name"
          labelStyle={{ color: "white", fontSize: 18 }}
          placeholder="Enter text"
          value={text}
          onChangeText={(value) => setText(value)}
          className="text-white"
          style={{
            color: "white",
          }}
        />
      </View>
      <View className="flex-col py-3 my-3 bg-white rounded-lg shadow-2xl">
        <Text className="px-5 text-2xl font-bold">Priority:</Text>
        <View className="flex-row items-center justify-start">
          <View className="flex-row items-center justify-center">
            <CheckBox
              className="!bg-transparent"
              checked={selectedIndex === 0}
              onPress={() => setIndex(0)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text>Low</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <CheckBox
              className="!bg-transparent"
              checked={selectedIndex === 1}
              onPress={() => setIndex(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text>Medium</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <CheckBox
              className="!bg-transparent"
              checked={selectedIndex === 2}
              onPress={() => setIndex(2)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text>High</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={showDatepicker}
        className="flex-row items-center justify-center py-2 bg-white rounded-lg shadow-2xl gap-x-5"
      >
        <Icon name="calendar" type="font-awesome" color="#517fa4" />
        <Text className="py-1 text-xl font-semibold">
          {date
            ? date?.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Select Date"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSubmit}
        className="flex-row items-center justify-center p-2 mt-auto mb-5 bg-white rounded-lg shadow-2xl gap-x-3"
      >
        <Text className="text-2xl font-bold text-center">Add Task</Text>
        <Icon name="enter" type="ant-design" color="#517fa4" />
      </TouchableOpacity>
      {/* </View> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode={"date"}
          is24Hour={true}
          onChange={(e, date) => onChange(e, date)}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default TaskForm;
