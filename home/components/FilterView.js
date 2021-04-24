import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
// import * as firebase from "firebase";
import firebase from "@firebase/app";
import "@firebase/firestore";
// import "firebase/firestore";

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

function FilterView(props) {
  const [houses, setHouses] = useState([]);
  const [housesQueried, setHousesQueried] = useState(false);
  var houseList = [];
  console.log("houses queried is:", housesQueried);

  useEffect(() => {
    dbh
      .collection("houses")
      .get()
      .then(async (querySnapshot) => {
        await querySnapshot.forEach((doc) => {
          console.log("running foreach");
          houseList.push(doc.data());
          // console.log(doc.data());
        });
        console.log("houseList in then is:", houseList);
        setHouses(houseList);
        setHousesQueried(true);
      });
  }, [housesQueried]);

  //   async function getHouses() {
  //     if (housesQueried == false) {
  //       await dbh
  //         .collection("houses")
  //         .get()
  //         .then(async (querySnapshot) => {
  //           await querySnapshot.forEach((doc) => {
  //             console.log("running foreach");
  //             houseList.push(doc.data());
  //             // console.log(doc.data());
  //           });
  //           console.log("houseList in then is:", houseList);
  //           // setHouses(houseList);
  //           // setHousesQueried(true);
  //         });
  //     }

  //     console.log("houseList is:", houseList);
  //     setHouses(houseList);
  //     setHousesQueried(true);
  //   }

  //   getHouses();

  console.log("houses is:", houses);
  return (
    <View>
      <Text>
        {houses.map((house) => (
          <Text>{houseList[0]}</Text>
        ))}
      </Text>
    </View>
  );
}

export default FilterView;
