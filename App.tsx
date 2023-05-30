import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';

export default function App() {
  const [permission, setPermission] = useState(null);
  const [image, setImage] = useState<Camera>(null);
  const [camera, setCamera] = useState(null);


  useEffect(() => {
    //permissoes: camera, media
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === 'granted');
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  async function takePicture() {
    if (camera) {
      //tirar foto
      const photo = await camera.takePictureAsync();
      console.log(photo.uri);
      //salvar foto
      await MediaLibrary.saveToLibraryAsync(photo.uri);
    }
  }

  return (
    <View style={styles.container}>
      <Camera ref={(ref) => setCamera(ref)}
        style={styles.camera}
        type={CameraType.back}
        ratio={'1:1'}
      />
      <Image
        style={styles.container}
        source={image}
        contentFit="cover"
        transition={1000}

      />
      
        <TouchableHighlight
          style={styles.button}
          onPress={() => { takePicture() }}
        >
          <Text style={styles.text}> Tirar Foto </Text>
        </TouchableHighlight>

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  camera: {
    aspectRatio: 1,
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
    backgroundColor: '#f1f1f1',
    color: 'white',
    borderRadius: 200,
    width: 100,
    height: 100,

  },
  text:{
    color: 'white',
    fontSize: 20, 
  }
});
