import React, { useState } from 'react'
import { View, Image, Button, TouchableOpacity, Text } from 'react-native'
import {TextInput} from 'react-native-paper'
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
import {Picker} from '@react-native-picker/picker'
require("firebase/firestore")
require("firebase/firebase-storage")
function Save(props, {navigation}) {

    const [selectedValue, setSelectedValue] = useState("Other");

    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase.storage().ref().child(`report/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`).put(blob);

        const taskProgress = snapshot => {
            console.log(`transfered: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot);
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {
        firebase.firestore().collection('reports').doc(firebase.auth().currentUser.uid).collection(selectedValue).add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function () {
            props.navigation.popToTop()
        }))
    }
    return (
        <View style={{flex:1, backgroundColor: '#1a243d', borderWidth:2, borderColor: '#f4a460', paddingHorizontal: 20}}>

            <Image source={{ uri : props.route.params.image}}/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 18}}>
                    Report Category :
                </Text>

                <View style={{backgroundColor:'white', marginTop: 20, width: 150, marginBottom: 20,}}>
                
                <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150, marginTop:5}}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >

                    <Picker.Item label="Diabetes" value="Diabetes" />
                    <Picker.Item label="CHD" value="CHD" />
                    <Picker.Item label="Bronchiectasis" value="Bronchiectasis" />
                    <Picker.Item label="Hypoxemia" value="Hypoxemia" />   
                    <Picker.Item label="Other" value="Other" />

                </Picker>
                </View>
            </View>
            

            <TextInput
                placeholder="Add some details about the report..."
                onChangeText={(caption)=> setCaption(caption)}
            />

            <TouchableOpacity 
                    onPress={() => uploadImage()}
                    style={{alignItems: 'center', backgroundColor: '#DDDDDD', padding: 12, margin: 20, borderRadius: 26}}
            >
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Save Report</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Save
