import React from "react";
import { Text, View } from "react-native";
import App from "../App";
import openImagePickerAsync from "./imagePicker";

function InputStuff(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Add a review of your House.</Text>

      <Text style={styles.instructions}>Upload a photo of your house.</Text>

      <Pressable
        hitSlop={30}
        onPress={async () => {
          let image = await openImagePickerAsync();
          image ? setSelectedImage(image) : null;
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pick a photo</Text>
      </Pressable>
    </View>
  );
}
export default Home;
