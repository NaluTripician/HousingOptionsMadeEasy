import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import openImagePickerAsync from './imagePicker';

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
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
