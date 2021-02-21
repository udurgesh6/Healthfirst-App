import React, { Component } from 'react'

import {View, Text, TouchableOpacity} from 'react-native'
import {TextInput} from 'react-native-paper'
import firebase from 'firebase'
import {Picker} from '@react-native-picker/picker'
import { ScrollView } from 'react-native-gesture-handler'


export class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password : '',
            first_name : '',
            last_name : '',
            weight :'',
            height : '',
            phone : '',
            age : '',
            gender : 'None'
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const {email, password, first_name, last_name, height, weight, phone, age, gender} = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                first_name,
                last_name,
                email,
                height,
                weight,
                phone,
                age,
                gender
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: '#1a243d', paddingHorizontal: 20, paddingTop: 20, borderWidth:2, borderColor: '#f4a460', }}>
                <ScrollView>

                <View style={{flexDirection: 'row', alignItems:'center'}}>
                <TextInput
                    style={{width: 120, flex:1, marginRight: 7, fontWeight: "bold"}}
                    mode='outlined'
                    placeholderTextColor='black' 
                    placeholder="First Name" onChangeText={ (first_name)  => this.setState({ first_name : first_name })}
                />

                <TextInput 
                    style={{width: 120, flex:1, fontWeight: "bold"}}
                    mode='outlined'
                    placeholderTextColor='black'
                    placeholder="Last Name" onChangeText={ (last_name)  => this.setState({ last_name : last_name })}
                />
                </View>
                

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
                <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
                <TextInput
                    style={{width: 120, flex:1, marginRight:5, fontWeight: "bold"}}
                    mode='outlined'
                    placeholderTextColor='black'
                    placeholder="Weight in kgs"
                    keyboardType='number-pad'
                    onChangeText={ (weight)  => this.setState({ weight : weight })}
                />

                <TextInput
                    style={{width: 120, flex:1, marginRight:5, fontWeight: "bold"}}
                    mode='outlined'
                    placeholderTextColor='black'
                    placeholder="Height in cms"
                    keyboardType={'number-pad'}
                    onChangeText={ (height)  => this.setState({ height : height })}
                />
                <TextInput
                    style={{width: 70, fontWeight: "bold"}}
                    mode='outlined'
                    placeholderTextColor='black'
                    placeholder="Age"
                    keyboardType={'number-pad'}
                    onChangeText={ (age)  => this.setState({ age : age })}
                />
                </View>
                <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
                <TextInput
                    style={{width: 160, flex:1, marginRight: 7, fontWeight: "bold"}}
                    mode='outlined'
                    placeholderTextColor='black'
                    placeholder="Phone No."
                    keyboardType={'phone-pad'}
                    onChangeText={ (phone)  => this.setState({ phone : phone })}
                />
                <View style={{backgroundColor:'white', marginTop: 7, width: 150}}>
                <Picker
                    gender={this.state.gender}
                    style={{ height: 56, width: 150, borderRadius: 12}}
                    onValueChange={(gender, itemIndex) =>{ this.setState({gender : gender})}}
                    itemStyle={{fontWeight:"400"}}
                    >

                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                        <Picker.Item label="Other" value="Other" />

                </Picker>
                </View>

                
                </View>
                

                
                

                <TouchableOpacity 
                    onPress={() => this.onSignUp()}
                    style={{alignItems: 'center', backgroundColor: '#446aab', padding: 12, margin: 20, borderRadius: 26}}
                >
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sign Up</Text>
                </TouchableOpacity>
                
                </ScrollView>
            </View>
        )
    }
}

export default Register
