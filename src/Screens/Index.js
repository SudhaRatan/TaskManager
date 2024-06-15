import { StyleSheet, View, Platform } from "react-native";
import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Text,
  Snackbar,
  useTheme,
  Dialog,
  Portal,
} from "react-native-paper";
import { useBreakPoint } from "../utils/breakpoint";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useAuthStore } from "../Stores/authStore";
import { useDatabaseStore } from "../Stores/databaseStore";

const Index = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [signUpDialog, setSignUpDialog] = useState(false);
  const theme = useTheme();
  const styles = style(theme);

  const auth = useDatabaseStore((state) => state.auth);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = () => {
    if (Platform.OS == "web") {
      signInWithPopup(auth, new GoogleAuthProvider());
    }
  };

  const loginEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, sEmail, sPass)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  };

  const [sEmail, setSEmail] = useState("");
  const [sPass, setSPass] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          value={email}
          mode="flat"
          style={{ width: "100%" }}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          mode="flat"
          style={{ width: "100%" }}
          onChangeText={setPassword}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button onPress={() => setSignUpDialog(true)}>Sign up</Button>
          <Button mode="contained" elevation={2} onPress={loginEmail}>
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
      <Portal>
        <Dialog visible={signUpDialog} onDismiss={() => setSignUpDialog(false)}>
          <Dialog.Title>Sign up</Dialog.Title>
          <Dialog.Content style={{ gap: 20 }}>
            <TextInput
              value={sEmail}
              placeholder="ex: test@gmail.com"
              label="Email"
              onChangeText={setSEmail}
            />
            <TextInput
              value={sPass}
              label="Password"
              secureTextEntry
              onChangeText={setSPass}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={signUp}>
              Sign up
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
