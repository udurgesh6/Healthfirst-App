import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'



import LandingScreen from "./components/auth/Landing"
import RegisterScreen from "./components/auth/Register"
import MainScreen from './components/Main'
import LoginScreen from './components/auth/Login'

import firebase from 'firebase/app'


import {View, Text} from 'react-native'



import { Provider } from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'


import AddScreen from "./components/main/Add"
import ChatScreen from "./components/main/Chat"
import SaveScreen from "./components/main/Save"


const store = createStore(rootReducer, applyMiddleware(thunk))


const firebaseConfig = {
  apiKey: "AIzaSyB-zpCYfhqd4I-w-QucnGpy7Zl1AdTrDMM",
  authDomain: "healthfirst-b9757.firebaseapp.com",
  projectId: "healthfirst-b9757",
  storageBucket: "healthfirst-b9757.appspot.com",
  messagingSenderId: "640675158030",
  appId: "1:640675158030:web:a0ddbafed4249a472c045f",
  measurementId: "G-LLMRJ4KZJC"
};


if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}


const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render(){
    const { loggedIn, loaded } = this.state;

    //while loading output a blank screen
    if(!loaded){
      return (
        <View style={{flex:1, justifyContent: 'center'}}>
          <Text>
            Loading
          </Text>
        </View>
      )
    }

    //if user is not logged in then render landing page
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing" screenOptions={{headerStyle: {backgroundColor: '#c7984c' }}}>
    
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}
            />
    
            <Stack.Screen name="Register" component={RegisterScreen}
            />
            <Stack.Screen name="Login" component={LoginScreen}
            />
    
          </Stack.Navigator>
        </NavigationContainer>
      );
    }


    //If user is already logged in
    return (
      
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main" screenOptions={{headerStyle: {backgroundColor: '#c7984c' }}}>
    
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}}
            />

            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}
            />

            <Stack.Screen name="Chat" component={ChatScreen}  navigation={this.props.navigation}
            />

            <Stack.Screen name="Save" component={SaveScreen}
            />
    
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      
    )
    
  }
 
}

export default App

