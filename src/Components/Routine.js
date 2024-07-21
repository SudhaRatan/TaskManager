import { View } from "react-native";
import React, { useState } from "react";
import { Checkbox, Surface, Text } from "react-native-paper";

const Routine = ({theme, width}) => {

  const data = [0, 1, 0, 1, 1, 0, 1];
  const [checked, setChecked] = useState(false);
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Surface
      style={{
        borderRadius: 10,
        margin: 5,
        padding: 20,
        gap: 10,
        backgroundColor: theme.colors.inverseOnSurface,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: 700, fontSize: 22 }}>Workout 💪</Text>
        <Checkbox
          color={"#05C460"}
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
        />
      </View>
      <View style={{ gap: 8, flexDirection: "row" }}>
        {data.map((val, index) => {
          return (
            <View key={index} style={{ gap: 4 }}>
              <View
                style={{
                  backgroundColor:
                    val === 1 ? "#05C460" : theme.colors.surfaceDisabled,
                  width: width,
                  height: width,
                  borderRadius: 5,
                }}
              />
              <Text style={{ textAlign: "center" }}>{days[index]}</Text>
            </View>
          );
        })}
      </View>
      <View style={{ flexDirection: "row" }}></View>
    </Surface>
  );
};

export default Routine;
