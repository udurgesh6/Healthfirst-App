import firebase from 'firebase'
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, CLEAR_DATA } from "../constants/index"


export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser() {
    return ((dispatch)=> {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot)=> {
            if(snapshot.exists){
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }else{
                console.log('Does not exist')
            }
        })
    })
}


export function fetchUserReports(){
    return ((dispatch) => {
        firebase.firestore()
        .collection('reports')
        .doc(firebase.auth().currentUser.uid)
        .collection('userReports')
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
            let reports = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data}
            })
            console.log(reports)
            dispatch({type: USER_POSTS_STATE_CHANGE, reports })
        })
    })
}