import React, { useState, useEffect } from "react";
import { View,Text,Dimensions, ScrollView, StatusBar, Button } from "react-native";
import socketIOClient from "socket.io-client";
import firebase from 'firebase'

import {
  LineChart,
} from "react-native-chart-kit";

const ENDPOINT = "http://192.168.1.111:4001";

function Feed() {


  const [response, setResponse] = useState({});

  const [heartRate, setHeartRate] = useState([70, 70, 70, 70, 70, 70, 70]);
  const [oxy, setOxy] = useState([95,95,95,95,95,95,95])
  const [bodyTemp, setBodyTemp] = useState([97, 97, 97, 97, 97, 97 ,97])
  const [sysbp, setSysbp] = useState([100, 100, 100, 100, 100, 100, 100])
  const [diasbp, setDiasbp] = useState([80, 80, 80, 80, 80, 80, 80])
  const [resp, setResp] = useState([14, 14, 14, 14, 14, 14, 14])
  const [gluc, setGluc] = useState([100, 100,100,100,100,100,100])
  const [cardio, setCardio] = useState([150, 150, 150, 150, 150, 150, 150])

  const [resxor, setResxor] = useState("")
  

  useEffect(() => {
    
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {

        for(var i=0;i<6;i++){
            heartRate[i] = heartRate[i+1]
            oxy[i] = oxy[i+1]
            bodyTemp[i] = bodyTemp[i+1]
            sysbp[i] = sysbp[i+1]
            diasbp[i] = diasbp[i+1]
            resp[i] = resp[i+1]
            gluc[i] = gluc[i+1]
            cardio[i] = cardio[i+1]
        }

        heartRate[6] = data.heart_rate
        oxy[6] = data.oxygen_sat
        bodyTemp[6] = data.body_temp
        sysbp[6] = data.high_bp
        diasbp[6] = data.low_bp
        resp[6] = data.respiration
        gluc[6] = data.glucose
        cardio[i] = data.electro

        setResponse(data);

        // Also We need to upload this data to our database
        firebase.firestore().collection('Health Parameters').doc(firebase.auth().currentUser.uid).collection('Heart Rate').add({Rate: data.heart_rate, creation: new Date()})
        firebase.firestore().collection('Health Parameters').doc(firebase.auth().currentUser.uid).collection('Oxygen Saturation').add({Rate: data.oxygen_sat, creation: new Date()})
        firebase.firestore().collection('Health Parameters').doc(firebase.auth().currentUser.uid).collection('Body Temperature').add({Rate: data.body_temp, creation: new Date()})
        firebase.firestore().collection('Health Parameters').doc(firebase.auth().currentUser.uid).collection('High Blood Pressure').add({Rate: data.high_bp, creation: new Date()})
        firebase.firestore().collection('Health Parameters').doc(firebase.auth().currentUser.uid).collection('Low Blood Pressure').add({Rate: data.low_bp, creation: new Date()})
        firebase.firestore().collection('Health Parameters').doc(firebase.auth().currentUser.uid).collection('Respiration').add({Rate: data.respiration, creation: new Date()})
        firebase.firestore().collection('Health Parameters').doc(firebase.auth().currentUser.uid).collection('Glucose').add({Rate: data.glucose, creation: new Date()})
        firebase.firestore().collection('Health Parameters').doc(firebase.auth().currentUser.uid).collection('Electro Cardiogram').add({Rate: data.electro, creation: new Date()})


        
    });

    return () => socket.disconnect();
  }, []);

  return (
    <View style={{flex:1, justifyContent: 'center', backgroundColor: '#1a243d', paddingHorizontal: 20, borderWidth:2, borderColor: '#f4a460', }}>
      <StatusBar/>
      <ScrollView style={{marginTop: 20}}>

        <LineChart
          data={{         
            datasets: [
              {
                data : oxy
              }
            ],
            legend: ["Oxygen Saturation(mm)"]
          }}

            width={310}
            height={160}
            
            yAxisLabel=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: "#2d335e",
            backgroundGradientFrom: "#2d335e",
            backgroundGradientTo: "#2d335e",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 12,
          borderColor: '#DDDDDD',
          borderWidth: 2
          }}

        />

        <LineChart

        data={{
          datasets: [
            {
              data : heartRate
            }
          ],
          legend: ["Heart Rate(per second)"]
        }}
        width={310}
        height={160}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
          backgroundColor: "#2d335e",
          backgroundGradientFrom: "#2d335e",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 12,
          borderColor: '#DDDDDD',
          borderWidth: 2
        }}

        />

        <LineChart
          data={{
            datasets: [
              {
                data : bodyTemp
              }
            ],
            legend:['Body Temperature(°C)']
          }}
          width={310}
          height={160}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: "#2d335e",
            backgroundGradientFrom: "#2d335e",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 12,
          borderColor: '#DDDDDD',
          borderWidth: 2
        }}

        />

        <LineChart

        data={{
        datasets: [
        {
        data : resp
        }
        ],
        legend:['Breath Rate']
        }}
        width={310}
        height={160}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
        backgroundColor: "#2d335e",
        backgroundGradientFrom: "#2d335e",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
        borderRadius: 16
        },
        propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
        }
        }}
        bezier
        style={{
        marginVertical: 8,
        borderRadius: 12,
          borderColor: '#DDDDDD',
          borderWidth: 2
        }}

        />


        <LineChart

          data={{
            datasets: [
              {
                data : gluc
              }
            ],
            legend:['Glucose Level']
          }}
          width={310}
          height={160}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: "#2d335e",
            backgroundGradientFrom: "#2d335e",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 12,
          borderColor: '#DDDDDD',
          borderWidth: 2
        }}

        />

        <LineChart

        data={{
        datasets: [
        {
        data : cardio
        }
        ],
        legend:['Cardio']
        }}
        width={310}
        height={160}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
        backgroundColor: "#2d335e",
        backgroundGradientFrom: "#2d335e",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
        borderRadius: 16
        },
        propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
        }
        }}
        bezier
        style={{
        marginVertical: 8,
        borderRadius: 12,
          borderColor: '#DDDDDD',
          borderWidth: 2
        }}

        />
  
      </ScrollView>
    </View>
      
  );
}

export default Feed;

