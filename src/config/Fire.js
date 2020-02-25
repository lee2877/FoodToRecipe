import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyDKbAowC7BuIAguDRqSWnnitJo9GmX2pjI",
    authDomain: "foodtorecipe-a913a.firebaseapp.com",
    databaseURL: "https://foodtorecipe-a913a.firebaseio.com",
    projectId: "foodtorecipe-a913a",
    storageBucket: "foodtorecipe-a913a.appspot.com",
    messagingSenderId: "949836574291",
    appId: "1:949836574291:web:fa1e54cc181afcd891a0a6",
    measurementId: "G-0FHSBYXNPR"
};
const fire = firebase.initializeApp(config);



/* Taehoon Kim -> email reset sending method*/ 
passwordReset: email=>{
    return firebase.auth().sendPasswordResetEmail(email)
            .then(function(user){
                alert('Please check your email...')
            }).catch(function (e){
                console.log(e)
            })       
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });




export default fire;
