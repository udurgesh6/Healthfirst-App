import React, { Component } from 'react'
import {View, Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser, fetchUserReports, clearData} from '../redux/actions/index'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FeedScreen from "./main/Feed"
import ProfileScreen from "./main/Profile"
import ChatScreen from "./main/Chat"




const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}


export class Main extends Component {

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchUserReports();
        this.props.clearData();
    }

    
    render() {

        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false} barStyle={{backgroundColor: '#f4a460'}}>

                {/* This is the Activity Screen */}
                <Tab.Screen name="Feed" component={FeedScreen} options= {{ tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ) }}/>


                {/* This is the Add Details Screen */}
                <Tab.Screen name="AddContainer" component={EmptyScreen} listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Add")
                    }
                })}  options= {{ tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                ) }}/>


                {/* This is the Chatbot */}
                <Tab.Screen name="ChatContainer" component={EmptyScreen} listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Chat")
                    }
                })}   options= {{ tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="assistant" color={color} size={26} />
                ) }}/>


                {/* This is the Profile Section */}
                <Tab.Screen name="Profile" component={ProfileScreen} options= {{ tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                ) }}/>

            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserReports, clearData}, dispatch)


export default connect(mapStateToProps, mapDispatchProps)(Main)
