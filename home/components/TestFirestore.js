import React from "react";
import { Text, View } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBebWuH7osJsfklBZvzzaAPP-Eh5M0Dhdo",
  authDomain: "housingoptionsmadeeasy.firebaseapp.com",
  projectId: "housingoptionsmadeeasy",
  storageBucket: "housingoptionsmadeeasy.appspot.com",
  messagingSenderId: "252883817571",
  appId: "1:252883817571:web:c75158a40c5fecf71e5456",
  measurementId: "G-13PEBSKEJJ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const dbh = firebase.firestore();

async function TestFirestore(props) {
  // Initialize Firebase

  // firebase.firestore().collection("test").add({ hello: "world" });

  console.log("hello");
  const usersCollection = await dbh.doc("test/test1").get();
  console.log("ahhh");

  // const testData = usersCollection.data();
  // console.log("testdata is:", testData);
  console.log("USERS COLLECTION IS:", usersCollection.data());
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

export default TestFirestore;
