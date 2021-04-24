import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import FilterSelector from "./FilterSelector";
// import * as firebase from "firebase";
import firebase from "@firebase/app";
import "@firebase/firestore";
import styles from "./FilterView.style.js";
import HouseItem from "./HouseItem";
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
  const noFilter = "No filter";
  const [bathroomsFilter, setBathroomsFilter] = useState(noFilter);
  const [quietFilter, setQuietFilter] = useState(noFilter);
  const [streetFilter, setStreetFilter] = useState(noFilter);
  const [houses, setHouses] = useState([]);
  const [housesQueried, setHousesQueried] = useState(false);
  const filters = ["bathrooms", "quiet", "street"];
  var houseList = [];
  var streets = ["home", "fountain", "church"];
  console.log("houses queried is:", housesQueried);
  console.log("bathroomn filter is:", typeof bathroomsFilter);

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

  //     console.log("houseList is:", houseList );
  //     setHouses(houseList);
  //     setHousesQueried(true);
  //   }

  //   getHouses();

  function moreBathrooms(filter, house) {
    if (filter == "bathrooms") {
      if (house[filter] >= eval(filter + "Filter")) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  console.log("houses is:", houses);
  console.log(
    "house filter is:",
    houses.filter((house) => house["bathrooms"] == bathroomsFilter)
  );
  return (
    <View style={styles.inputForm}>
      <Text>Bathrooms!</Text>
      <FilterSelector
        zIndex={5000}
        items={[noFilter, 4, 3, 2, 1]}
        category={"bathrooms"}
        setFilter={setBathroomsFilter}
      />
      <Text>Quiet Street?</Text>

      <FilterSelector
        zIndex={4000}
        items={[noFilter, "quiet", "loud"]}
        category={"quiet"}
        setFilter={setQuietFilter}
      />
      <Text>Street Choice</Text>

      <FilterSelector
        zIndex={3000}
        items={[noFilter, ...streets]}
        category={"street"}
        setFilter={setStreetFilter}
      />
      <Text>TESTING ABOVE MAP</Text>

      {houses
        .filter((house) => {
          var isTrue = true;
          for (const filter of { filters }["filters"]) {
            isTrue =
              isTrue &&
              (house[filter] == eval(filter + "Filter")) |
                (eval(filter + "Filter") == noFilter) |
                moreBathrooms(filter, house);
          }
          return isTrue;
        })
        .map((house) => (
          <HouseItem house={house} />
        ))}
      <Text>TESTING</Text>
    </View>
  );
}

export default FilterView;
