import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [permission, setPermission] = useState (null);
  const [image, setImage] = useState<Camera>(null);
  const [camera, setCamera] = useState (null); 


  useEffect (()=>{
    (async ()=>{
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission (cameraStatus.status === 'granted');
    })();
  }, []);

  async function TakePicture (){
    if (camera){
    
    const photo = await camera.takePictureAsync();
    console.log(photo.uri);
    await MediaLibrary.saveToLibraryAsync(photo.uri);

  }}


  return (
    <View style={styles.container}>
        <Camera ref={(ref) => setCamera(ref)}
        style={styles.camera}
        type={CameraType.back}
        ratio={'1:1'}
        />
        <Button 
        title=' Tirar foto' 
        onPress={()=>{TakePicture()}}
      
        />
      <StatusBar style="auto" />
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
  camera: {
    aspectRatio: 1,
    flex: 1, 
    
  }
});
