import React from 'react'
import {View,TouchableOpacity, Text, Image, Platform, StatusBar} from 'react-native'

function Landing({navigation}) {
    return (
        <View style={{paddingTop: Platform.OS==='android'? StatusBar.currentHeight : 0, flex:1, justifyContent: 'center', backgroundColor: '#1a243d', paddingHorizontal: 60, borderWidth:2, borderColor: '#f4a460', borderTopColor:'#1a243d'}}>
            
            <StatusBar/>
            <Image source={{uri: 'https://d3dltcd736v4cm.cloudfront.net/wp-content/uploads/heart-healthy.png'}} style={{width: 200, height: 100, alignItems: 'center',paddingLeft: 12, margin: 10, marginLeft: 20}}></Image>
            
            <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#DDDDDD', padding: 12, margin: 10, borderRadius: 26}}  onPress={() => navigation.navigate("Register") }>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Register</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#DDDDDD', padding: 12, margin: 10, borderRadius: 26}}  onPress={() => navigation.navigate("Login") }>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Landing
