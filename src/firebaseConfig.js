import firebase from 'firebase';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDaP0fjI4UNWQesTJrEpO65xQbKKhwTZUA",
    authDomain: "aggrio-8b3d3.firebaseapp.com",
    databaseURL: "https://aggrio-8b3d3.firebaseio.com",
    projectId: "aggrio-8b3d3",
    storageBucket: "aggrio-8b3d3.appspot.com",
    messagingSenderId: "1062840173553",
    appId: "1:1062840173553:web:6bc1653ddd1b0d2883fa50",
    measurementId: "G-DYXC9LJGXS"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage();

export { storage, firebase };

