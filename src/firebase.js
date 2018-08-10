import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBvTjLqb16lbAZf-79zjFwDnEsF7jtrI2c",
    authDomain: "pokeleague-23c17.firebaseapp.com",
    databaseURL: "https://pokeleague-23c17.firebaseio.com",
    projectId: "pokeleague-23c17",
    storageBucket: "pokeleague-23c17.appspot.com",
    messagingSenderId: "699044689812"
  };
  firebase.database 
  firebase.initializeApp(config);
  export default firebase;