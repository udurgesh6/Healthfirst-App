import React, { Component } from 'react'
import { SafeAreaView, Text, View, ScrollView, Title } from 'react-native'
import {Card, Button} from 'react-native-elements'
import {GiftedChat, Bubble} from 'react-native-gifted-chat'

import {Dialogflow_V2} from 'react-native-dialogflow'
import {dialogflowConfig} from '../../env'

import firebase from 'firebase'


// Bot Details
const botAvatar = require('../../assets/images/assistant.png')
const BOT = {
    _id : 2,
    name : 'Personal Assistant',
    avatar : botAvatar
}



// Chat Component
export class Chat extends Component {

    // Initial State
    state = {
        messages: [],
        id: 1,
        name: '',
        reports: []
    };



    // When Component Mounts
    componentDidMount() {

        // Sets the Dialog Flow Configuration
        Dialogflow_V2.setConfiguration(

            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id

        );

        // Set the user id to its uid and name
        const id = firebase.auth().currentUser.uid
        const name = "Myself"

    
        // Check if previous chat is available or not
        firebase.firestore()
        .collection('Chatbot History')
        .doc(firebase.auth().currentUser.uid)
        .collection('Messages')
        .orderBy('createdAt', 'desc')
        .limit(15)
        .get()
        .then((snapshot) => {
            
            let messages = snapshot.docs.map((doc) => {
                const firebaseData = doc.data();

                const data = {
                    _id: doc.id,
                    text: doc.text,
                    createdAt: new Date().getTime(),
                    ...firebaseData

                }

                if(!firebaseData.system) {
                    data.user = {
                        ...firebaseData.user,
                        name: firebaseData.user.name
                    }
                }
                return data;
            })

            
            // If messages present update the messages state
            if(messages.length > 0) {
                this.setState({name, id, messages})
            } 
            // Else greet with Hello Message
            else {
                this.setState({
                    name,
                    id,
                    messages : [
                        {
                            _id: 1,
                            text: "Hello",
                            createdAt: new Date().getTime(),
                            user: BOT
                        }
                    ]
                })
            }
        }).catch(function (err){
            console.log(err)
        });

    }

    handleGoogleResponse(result) {
        console.log(result)
        let text = result.queryResult.fulfillmentMessages[0].text.text[0]
        this.sendBotResponse(text);

    }

    getReports(text){
        firebase.firestore()
            .collection('reports')
            .doc(firebase.auth().currentUser.uid)
            .collection(text)
            .orderBy('creation', 'desc')
            .limit(15)
            .get()
            .then((snapshot) => {
            
                let messages = snapshot.docs.map((doc) => {
                    const firebaseData = doc.data();

                    const data = {
                        _id: doc.id,
                        text: doc.text,
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    }

                    
                    
                    return data;
                })

                reports = messages.map(message => {
                    
                    return {
                        title: message.caption,
                        image: message.downloadURL
                    }
                })

                

                       
            })

            return reports
    }

    sendBotResponse(text) {

        let msg;

        if (text == 'travel') {
            msg = {
                
                text:'Would you like to buy plane tickets ?',
                createdAt: new Date().getTime(),
                user: BOT,
            }
        } else if (text == 'Show options') {
            msg = {
                
                text:'Please choose your destination',
                createdAt: new Date().getTime(),
                user: BOT,
                isOptions: true,
                data: [{title: 'Thailand', image: 'https://www.fodors.com/wp-content/uploads/2019/02/thai-beaches-hero-.jpg'}, {title: 'USA', image: 'https://lp-cms-production.imgix.net/2019-06/93cbcf5a52559e6649736e18aaca98cc-usa.jpg'}],
                
            }
        } else if (text == 'Show Reports') {
            msg = {
                text : 'Please choose your report category',
                createdAt : new Date().getTime(),
                user: BOT,
                isOptions: true,
                data: [{title: 'Diabetes', image:'https://www.docnitinagrawal.com/blog/wp-content/uploads/2018/07/Dietary-guidelines-for-diabetes.png'}, {title: 'CHD', image: 'https://st1.thehealthsite.com/wp-content/uploads/2019/11/coronary-heart-disease.jpg?impolicy=Medium_Resize&w=1200&h=800'}, {title: 'Bronchitis', image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/bronchitis_slideshow/webmd_composite_image_of_bronchitis.jpg'}, {title: 'Hypoxemia', image: 'https://cdn.mos.cms.futurecdn.net/9QQip6uwgpg6iw4QyJAPHR.jpg'}, {title: 'Asthma', image: 'https://www.respiratorylondon.co.uk/wp-content/uploads/asthma.jpg'}, {title: 'Other', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMS3pwnnV6I9y3cqRSqHkm7uHMhr0e2r2HZw&usqp=CAU'}]
            }
        } else if (text == 'Diabetes' || text == 'Hypoxemia' || text == 'CHD' || text == 'Other') {
            
            
            msg = {
                text : `Your ${text} reports`,
                createdAt : new Date().getTime(),
                user: BOT,
                isOptions: true,
                data: this.getReports(text)
                
            }

            
        }
        else{
            msg = {
                
                text,
                createdAt: new Date().getTime(),
                user: BOT,
            }
        }


        // Add whatever the above message sent by BOT to the chat history
        firebase.firestore().collection('Chatbot History').doc(firebase.auth().currentUser.uid).collection('Messages').add(msg)
        
        // Update this msg's id with total message till now + 1
        msg._id = this.state.messages.length + 1;

        // then update the state of the messages with this new msg from the bot
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, [msg]),
        }))
    }


    // This function runs when user types any message and clicks on send
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))


        let text = messages[0].text;

        firebase.firestore().collection('Chatbot History').doc(firebase.auth().currentUser.uid).collection('Messages').add({
            text,
            createdAt: new Date().getTime(),
            user: {
                _id: 1,
                name: "Myself"
            }
        })
        
        Dialogflow_V2.requestQuery(
            text, 
            (result) => this.handleGoogleResponse(result),
            (error) => console.log(error)
        )
    }

    onQuickReply(quickReply) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, quickReply)
        }))


        let message = quickReply[0].value;


        Dialogflow_V2.requestQuery(
            message, 
            (result) => this.handleGoogleResponse(result),
            (error) => console.log(error)
        )
    }

    renderBubble = props => {
        if (props.currentMessage.isOptions){
            return (
               
                <ScrollView style = {{backgroundColor: 'white'}} horizontal={true}>
                    
                    {props.currentMessage.data.map((item) => (
                        <Card containerStyle={{padding:0, borderRadius: 15, paddingBottom: 7, overflow: 'hidden'}} key={item.title}>
                            <Card.Image style={{width: 220, height: 110}} resizeMode="cover" source={{uri: item.image}}></Card.Image>
                            <Button style={{height:35}} title={item.title} onPress = {() => this.sendBotResponse(item.title)} />
                        </Card>
                        

                    )) }
                </ScrollView>
            )
        }
        return (<Bubble {...props} textStyle={{right: {color: 'white'}, left: {color: 'white'}}} wrapperStyle={{left: {backgroundColor: '#2f3e87'}, right: {backgroundColor: '#6a377a'}}}/>)
    }

    // Driver Code
    render() {
        return (
            <View style={{flex:1, backgroundColor:'#1a243d'}}>

                <GiftedChat 
                messages = {this.state.messages} 
                onSend={(message) => this.onSend(message)} onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
                renderBubble={this.renderBubble}
                user={{_id: 1}}
                />

            </View>    
        )
    }
}

export default Chat


