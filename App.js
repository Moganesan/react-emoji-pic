import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRef, useState } from "react";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmojiSticker from "./components/EmojiSticker";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("./assets/bird.webp");

export default function App() {
  const [selectedImage, setSelectedImage] = useState("");
  const [showAppOption, setShowAppOption] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [pickedEmoji, setPickeEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const iamgeRef = useRef();
  const PickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOption(true);
    } else {
      alert("You did not select any image.");
    }
  };
  if (status === null) {
    requestPermission();
  }

  const onReset = () => {
    setShowAppOption(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(iamgeRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAddSticker = () => {
    setisModalVisible(true);
  };

  const onModalClose = () => {
    setisModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View collapsable={false} ref={iamgeRef} style={styles.imageContainer}>
        <ImageViewer
          placeHolderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {pickedEmoji !== null ? (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        ) : null}
      </View>
      {showAppOption ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon={"refresh"} label={"Reset"} onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon={"save-alt"}
              label={"Save"}
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            onPress={PickImageAsync}
            label={"Choose A Photo"}
            them={"primary"}
          />
          <Button
            onPress={() => setShowAppOption(true)}
            label={"Use this photo"}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickeEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 50,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
