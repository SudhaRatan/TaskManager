import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import { Button, useTheme } from "react-native-paper";
import { Audio } from "expo-av";
import axios from "axios";

const AISCreen = ({ navigation }) => {
  const theme = useTheme();
  const [recording, setRecording] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const { height } = Dimensions.get("screen");

  const [sound, setSound] = useState();
  const [uri, setUri] = useState(null);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    console.log("Playing Sound", sound);
    await sound.playAsync();
  }

  //   function blobToBase64(blobUrl) {
  //     return new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = function () {
  //         if (this.status === 200) {
  //           resolve(this.response);
  //         } else {
  //           reject(new Error("Failed to fetch image data"));
  //         }
  //       };
  //       xhr.onerror = reject;
  //       xhr.open("GET", blobUrl);
  //       xhr.responseType = "arraybuffer";
  //       xhr.send();
  //     }).then((arrayBuffer) => {
  //       return (
  //         "data:audio/webm;base64," +
  //         btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
  //       );
  //     });
  //   }

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

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
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
    console.log(data);
    axios
      .post(`https://api.openai.com/v1/audio/transcriptions`, {
        model: "whisper-1",
        file: data,
      },{headers:{
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPEN_AI_KEY}`
      }})
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    // blobToBase64(data)
    //   .then((base64Data) => {
    //     console.log(base64Data);
    //     axios
    //       .post(`${process.env.EXPO_PUBLIC_API_KEY}/search`, {
    //         audio: "data:audio/webm;base64,"+base64Data,
    //       })
    //       .then((data) => {
    //         console.log(data);
    //       })
    //       .catch((error) => console.error(error));
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const cancelRecording = () => {
    setRecording(null);
    navigation.goBack();
  };

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
          //   transform:[{translateY:"100%"}]
        }}
      >
        {recording ? (
          <>
            <Image
              source={require("../../assets/ai_anim.gif")}
              style={{ width: 80, height: 80 }}
            />
            <Button mode="contained" onPress={stopRecording}>
              Stop recording
            </Button>
            <Button mode="contained" onPress={cancelRecording}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button mode="contained" onPress={startRecording}>
              Start recording
            </Button>
          </>
        )}
        <Button onPress={playSound}>Play sound</Button>
      </View>
    </View>
  );
};

export default AISCreen;
