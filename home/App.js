import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, Pressable, View } from 'react-native';
import openImagePickerAsync from './imagePicker';
import {styles} from './styles';

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
