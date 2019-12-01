import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDWzvaJIm_wZ3HzO3Vy3PKQ9ZRCSHybHFY",
    authDomain: "firstproject-b9c4b.firebaseapp.com",
    databaseURL: "https://firstproject-b9c4b.firebaseio.com",
    projectId: "firstproject-b9c4b",
    storageBucket: "firstproject-b9c4b.appspot.com",
    messagingSenderId: "871685663017",
    appId: "1:871685663017:web:cd7b1639ff1195531bef38"
  };
  // Initialize Firebase
   export default firebase.initializeApp(firebaseConfig);
