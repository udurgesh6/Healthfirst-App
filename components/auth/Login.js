import React, { Component } from 'react'

import {View, TouchableOpacity, Text} from 'react-native'
import {TextInput} from 'react-native-paper'
import firebase from 'firebase'




export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password : ''
        }

        this.onLogin = this.onLogin.bind(this)
    }

    onLogin() {
        const {email, password} = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: '#1a243d', paddingHorizontal: 20, paddingTop: 20, borderColor: '#f4a460', borderWidth: 2}}>

                <TextInput 
                style={{marginTop: 10, fontWeight: "bold"}}
                mode='outlined'
                placeholderTextColor='black' 
                    placeholder="Email" onChangeText={ (email)  => this.setState({ email : email })}
                />

                <TextInput
                style={{marginTop: 10, fontWeight: "bold"}}
                mode='outlined'
                placeholderTextColor='black' 
                    placeholder="Password" secureTextEntry={true} onChangeText={ (password)  => this.setState({ password : password })}
                />

                <TouchableOpacity 
                    onPress={() => this.onLogin()}
                    style={{alignItems: 'center', backgroundColor: '#446aab', padding: 12, margin: 20, borderRadius: 26}}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sign In</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default Login
