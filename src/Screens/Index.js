import { StyleSheet, View, Platform } from "react-native";
import { useState } from "react";
import {
  Button,
  TextInput,
  Text,
  Snackbar,
  useTheme,
} from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import * as Notifications from "expo-notifications";

const Index = ({ navigation }) => {
  async function schedulePushNotification() {
    if (Platform.OS !== "web") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got notification! 🔔",
          body: "Here is the notification body",
        },
        trigger: { seconds: 2 },
      });
    } else {
      new Notification("Notification")
    }
  }

  const [text, setText] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const theme = useTheme();
  const styles = style(theme);

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.loginContainer,
          { width: useBreakPoint("100%", "70%", "50%") },
        ]}
      >
        <Text variant="displaySmall">Login</Text>
        <TextInput
          label="Email"
          value={text}
          mode="flat"
          style={{ width: "100%" }}
          onChangeText={(text) => setText(text)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            mode="text"
            elevation={2}
            onPress={() => {
              navigation.navigate("app");
            }}
          >
            Continue as guest
          </Button>
          <Button
            mode="contained"
            elevation={2}
            onPress={() => {
              setShowSnackbar(true);
            }}
          >
            Login
          </Button>
        </View>
      </View>
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        action={{
          label: "Ok",
          onPress: () => {
            setShowSnackbar(false);
          },
        }}
        style={{ width: useBreakPoint(null, "50%", "40%") }}
      >
        TODO!!
      </Snackbar>
    </View>
  );
};

const style = (props) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: props.colors.background,
    },
    loginContainer: {
      gap: 10,
      alignItems: "flex-start",
      padding: 20,
    },
  });

export default Index;
