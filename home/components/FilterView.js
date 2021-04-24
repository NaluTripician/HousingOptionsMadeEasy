import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import FilterSelector from "./FilterSelector";
// import * as firebase from "firebase";
import firebase from "@firebase/app";
import "@firebase/firestore";
import styles from "./FilterView.style.js";
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
  const [filters, setFilters] = useState({ bathrooms: 1 });
  const [bathroomFilter, setBathroomFilter] = useState(1);
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
      <FilterSelector
        items={[4, 3, 2, 1]}
        category={"bathrooms"}
        setFilter={setBathroomFilter}
      />

      {houses
        .filter((house) => house["bathroom"] == { bathroomFilter })
        .map((house) => (
          <Text> {house["bathrooms"]}</Text>
        ))}
    </View>
  );
}

export default FilterView;
