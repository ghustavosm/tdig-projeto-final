import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCX11uUG_PMzB8Kg4aE4Y7TK953SDBY82w",
    authDomain: "tdig-projeto.firebaseapp.com",
    projectId: "tdig-projeto",
    storageBucket: "tdig-projeto.appspot.com",
    messagingSenderId: "47921250652",
    appId: "1:47921250652:web:7f25aea420bf5c13394199"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();