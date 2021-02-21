import React from 'react'
import { Text, View, Image, FlatList, StyleSheet, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import firebase from 'firebase'


function Profile(props) {
    const { currentUser, reports } = props;
    console.log({currentUser, reports})

    const onLogout = () => {
        firebase.auth().signOut();
    }

    return (
        <View  style={{flex:1, backgroundColor: '#1a243d', paddingHorizontal: 20, paddingTop: 20, borderWidth:2, borderColor: '#f4a460'}}>

            
            <View style={{flexDirection: 'row', alignItems:'center', borderBottomColor: 'white', borderBottomWidth: 1,}}>
                <Text style={{width: 140, flex:1, marginRight: 7,  color: 'white', fontSize: 18}}>About you</Text>
                <TouchableOpacity
                onPress={() => onLogout()}
                style={{alignItems: 'center', backgroundColor: '#DDDDDD', padding: 12, marginBottom: 20, borderRadius: 26, width:100, marginTop: 20}}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', marginTop: 20, justifyContent: 'space-between'}}>
                <Text style={{color: 'white', fontSize: 18}}>Name  :      {currentUser.first_name} {currentUser.last_name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center', marginTop: 5, justifyContent: 'space-between'}}>
                <Text style={{color: 'white', fontSize: 18}}>Email   :      {currentUser.email}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center', marginTop: 5, justifyContent: 'space-between'}}>
                <Text style={{color: 'white', fontSize: 18}}>Phone :      {currentUser.phone}</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems:'center', marginTop: 30, justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center', width: 150, borderColor: 'white', borderWidth: 2, padding: 10}}>
                    <Text style={{color: 'white', fontSize: 18}}>Height: {currentUser.height}cms</Text>
                </View>

                <View style={{alignItems: 'center', width: 150, borderColor: 'white', borderWidth: 2, padding: 10}}>
                    <Text style={{color: 'white', fontSize: 18}}>Weight: {currentUser.weight}kgs</Text>
                </View>
            </View>       

            <View style={{flexDirection: 'row', alignItems:'center', marginTop: 20, justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center', width: 150, borderColor: 'white', borderWidth: 2, padding: 10}}>
                    <Text style={{color: 'white', fontSize: 18}}>Gender: {currentUser.gender}</Text>
                </View>

                <View style={{alignItems: 'center', width: 150, borderColor: 'white', borderWidth: 2, padding: 10}}>
                    <Text style={{color: 'white', fontSize: 18}}>Age: {currentUser.age}years</Text>
                </View>
            </View>     
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        marginLeft: 20
    },
    containerInfo: {
        margin: 20
    },
    containerGallery:{
        flex: 1
    },
    containerImage:{
        flex: 1/3
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    }
})


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    reports: store.userState.reports
})

export default connect(mapStateToProps, null)(Profile)
