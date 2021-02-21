import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({navigation}) {

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const[camera, setCamera] = useState(null);
  const[image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();

      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission===false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission===false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{flex:1, justifyContent: 'center', backgroundColor: '#1a243d', borderWidth:2, borderColor: '#f4a460', }}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'}/>
      </View>
      
      <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', paddingHorizontal:10}}>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#000063', padding: 12, marginBottom: 20, borderRadius: 26, width:80, marginTop: 20}} onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
          <Text style={{color:'white'}}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#000063', padding: 12, marginBottom: 20, borderRadius: 26, width:80, marginTop: 20}} onPress={() => takePicture()}>
          <Text style={{color:'white'}}>Click</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#000063', padding: 12, marginBottom: 20, borderRadius: 26, width:80, marginTop: 20}} onPress={() => pickImage()}>
          <Text style={{color:'white'}}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#000063', padding: 12, marginBottom: 20, borderRadius: 26, width:80, marginTop: 20}} onPress={() => navigation.navigate('Save',{image})}>
          <Text style={{color:'white'}}>Save</Text>
        </TouchableOpacity>
      </View>
      
      

      {image && <Image source={{uri: image}} style={{flex:1}}/>}  
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio:{
    flex: 1,
  }
})
