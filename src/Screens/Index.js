import { StyleSheet, View, Platform } from "react-native";
import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Text,
  Snackbar,
  useTheme,
} from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import * as Notifications from "expo-notifications";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthStore } from "../Stores/authStore";
import { useDatabaseStore } from "../Stores/databaseStore";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { signInWithCredential } from "firebase/auth";

if (Platform.OS !== "web") {
  WebBrowser.maybeCompleteAuthSession();
}

const Index = () => {
  const [request, response, promptAsync] =
    Platform.OS !== "web"
      ? Google.useAuthRequest({
          androidClientId:
            "924751066543-7u9jsh1k00b64eu4abqvo2jlicp0imbk.apps.googleusercontent.com",
        })
      : [null, null, null];
  const [text, setText] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const theme = useTheme();
  const styles = style(theme);

  const auth = useDatabaseStore((state) => state.auth);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = () => {
    if (Platform.OS === "web") {
      signInWithPopup(auth, new GoogleAuthProvider());
    } else {
      promptAsync();
    }
  };

  useEffect(() => {
    if (Platform.OS !== "web") {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential);
      }
    }
  }, [response]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

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
          <Button mode="text" elevation={2} onPress={handleLogin}>
            Login with google
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
