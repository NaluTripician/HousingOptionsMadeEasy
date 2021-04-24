<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TestFirestore from "./components/TestFirestore";
=======
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, Pressable, View } from 'react-native';
import MyComp from './components/MyComp';
import openImagePickerAsync from './imagePicker';
import {styles} from './styles';
>>>>>>> fc455e01979f12c0e125f3addb3247634d23c092

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        </View>
    );
  }

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <TestFirestore />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
=======
      <Text style={styles.instructions}>
        Upload a photo of your house.
      </Text>

      <Pressable
       hitSlop={30}
        onPress={ async () => {
            let image = await openImagePickerAsync();
            image ? setSelectedImage(image) : null
            }
        }
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </Pressable>
    </View>
  );
}
>>>>>>> fc455e01979f12c0e125f3addb3247634d23c092
