import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, useTheme, Text, ActivityIndicator } from "react-native-paper";
import { Audio } from "expo-av";
import axios from "axios";
import { useNavigationState } from "@react-navigation/native";
import { createCategoriesAI, createTasksAI } from "../DL/firebaseFunctions";
import { useCategoryStore } from "../Stores/categoryStore";
import { useAuthStore } from "../Stores/authStore";

const AISCreen = ({ navigation }) => {
  const theme = useTheme();
  const [recording, setRecording] = useState(null);
  const [message, setMessage] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const { height } = Dimensions.get("screen");

  const [sound, setSound] = useState();
  const [uri, setUri] = useState(null);
  const [selectCatOnClickCallback, setSelectCatOnClickCallback] =
    useState(null);
  const [canSelectCategory, setCanSelectCategory] = useState(false);

  const category = useCategoryStore((state) => state.category);
  const user = useAuthStore((state) => state.user);
  const index = useNavigationState((state) => state.index);

  useEffect(() => {
    if (index === 0) {
      navigation.navigate("app");
      navigation.reset({
        index: 0,
        routes: [{ name: "app" }],
      });
    }
  }, []);

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      setRecording(null);
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setUri(uri);
    console.log("Recording stopped and stored at", uri);
    setRecording(null);
    const response = await fetch(uri);
    const data = await response.blob();

    blobToBase64(data)
      .then((base64Data) => {
        setMessage("Transcribing");
        axios
          .post(`${process.env.EXPO_PUBLIC_API_KEY}/transcribe`, {
            audio: base64Data,
            platform: Platform.OS,
          })
          .then((data) => {
            console.log(data.data);
            sendPrompt(data.data);
          })
          .catch((error) => {
            setMessage(null);
            // console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cancelRecording = async () => {
    await recording.stopAndUnloadAsync();
    setRecording(null);
    navigation.goBack();
  };

  const sendPrompt = (prompt) => {
    setMessage("Getting response");
    axios
      .get(`${process.env.EXPO_PUBLIC_API_KEY}/prompt/${prompt}`)
      .then(async (data) => {
        setMessage("Translating to tasks");
        const res = data.data;
        if (res.name === "task" && res.type === "single") {
          if (category) {
            await createTasksAI(
              res.data.map((i) => ({
                ...i,
                category_id: category.id,
              })),
              user.uid
            );
            setMessage(null);
            navigation.goBack("");
          } else {
            setSelectCatOnClickCallback(() => {
              return async (categoryId) => {
                await createTasksAI(
                  res.data.map((i) => ({
                    ...i,
                    category_id: categoryId,
                  }))
                );
                setMessage(null);
                navigation.goBack("");
              };
            });
            setCanSelectCategory(true);
          }
        } else if (res.name === "category") {
          await createCategoriesAI({ categories: res.data, userId: user.uid });
          setMessage(null);
          navigation.goBack("");
        }
      })
      .catch((error) => {
        console.warn(error);
        setMessage(null);
      });
  };

  useEffect(() => {
    startRecording();
  }, [permissionResponse]);

  return (
    <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor: "#00000070",
          position: "absolute",
          width: "100%",
          height: height,
        }}
        onPress={() => navigation.goBack("")}
      ></TouchableOpacity>
      <View
        style={{
          backgroundColor: theme.colors.background,
          padding: 40,
          borderRadius: theme.roundness,
          marginBottom: 20,
          alignItems: "center",
          gap: 30,
          position: "absolute",
          top: height / 2,
          left: 0,
          right: 0,
          margin: "auto",
          width: "fit-content",
        }}
      >
        {message && (
          <>
            <ActivityIndicator size={"small"} />
            <Text>{message}</Text>
          </>
        )}
        {recording ? (
          <>
            <Image
              source={require("../../assets/ai_anim.gif")}
              style={{ width: 80, height: 80 }}
            />
            <Button mode="contained" onPress={stopRecording}>
              Stop
            </Button>
            <Button mode="contained" onPress={cancelRecording}>
              Cancel
            </Button>
          </>
        ) : (
          !message && (
            <Button mode="contained" onPress={startRecording}>
              Start
            </Button>
          )
        )}
        {/* <Button onPress={playSound}>Play sound</Button> */}
      </View>
    </View>
  );
};

export default AISCreen;
