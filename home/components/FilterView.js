import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FilterSelector from "./FilterSelector";
// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/firestore";
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
  const [overallFilter, setOverallFilter] = useState(noFilter);
  const [occupancyFilter, setOccupancyFilter] = useState(noFilter);
  const [houses, setHouses] = useState([]);
  const [housesQueried, setHousesQueried] = useState(false);
  const filters = ["bathrooms", "quiet", "street", "overall", "occupancy"];
  var houseList = [];
  var streets = [
    "Home",
    "Fountain",
    "Church",
    "Warren",
    "Pine",
    "Lawn",
    "Brainerd",
    "Cross",
  ];
  console.log("houses queried is:", housesQueried);
  console.log("bathroomn filter is:", typeof bathroomsFilter);

  useEffect(() => {
    dbh
      .collection("houses")
      .get()
      .then(async (querySnapshot) => {
        await querySnapshot.forEach((doc) => {
          console.log("running foreach");
          // console.log("doc.data() is:", doc.data());
          houseList.push(doc.data());
          console.log("After push");
        });
        // console.log("houseList in then is:", houseList);
        console.log("after foreach");
        setHouses(houseList);
        setHousesQueried(true);
      });
  }, [housesQueried]);

  function greaterFilter(filter, house) {
    if ((filter == "bathrooms") | (filter == "overall")) {
      console.log("Filter is bathgroom or ratings. Value is:", house[filter]);
      if (house[filter] >= eval(filter + "Filter")) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("FILTER IS NOT BATHROOM OR RATINGS");
      return false;
    }
  }

  console.log("houses is:", houses);
  console.log(
    "house filter is:",
    houses.filter((house) => house["bathrooms"] == bathroomsFilter)
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.inputLabel}>Number of Bathrooms</Text>
      <FilterSelector
        zIndex={5000}
        items={[noFilter, 3, 2, 1]}
        icon={"bathtub"}
        category={"bathrooms"}
        setFilter={setBathroomsFilter}
      />
      <Text style={styles.inputLabel}>Quiet or Loud Street</Text>

      <FilterSelector
        zIndex={4000}
        items={[noFilter, "true", "false"]}
        icon={"hotel"}
        category={"quiet"}
        setFilter={setQuietFilter}
      />
      <Text style={styles.inputLabel}>Street</Text>

      <FilterSelector
        zIndex={3000}
        items={[noFilter, ...streets]}
        icon={"house"}
        category={"street"}
        setFilter={setStreetFilter}
      />
      <Text style={styles.inputLabel}>Overall Rating</Text>

      <FilterSelector
        zIndex={2000}
        items={[noFilter, 5, 4, 3, 2, 1]}
        icon={"star"}
        category={"overall"}
        setFilter={setOverallFilter}
      />
      <Text style={styles.inputLabel}>Occupancy</Text>
      <FilterSelector
        zIndex={1000}
        items={[noFilter, 6, 5, 4, 3, 2]}
        icon={"person"}
        category={"occupancy"}
        setFilter={setOccupancyFilter}
      />
      <View
        style={{
          paddingTop: 30,
          borderBottomColor: "gray",
          borderBottomWidth: 1,
        }}
      />

      {houses
        .filter((house) => {
          // Flatten house so that all fields can be reached with house[field]
          house = Object.assign(
            {},
            ...(function _flatten(o) {
              return [].concat(
                ...Object.keys(o).map((k) =>
                  typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
                )
              );
            })(house)
          );
          var isTrue = true;
          for (const filter of { filters }["filters"]) {
            isTrue =
              isTrue &&
              (house[filter] == eval(filter + "Filter")) |
                (eval(filter + "Filter") == noFilter) |
                greaterFilter(filter, house);
          }
          return isTrue;
        })
        .map((house) => (
          <HouseItem house={house} />
        ))}
    </ScrollView>
  );
}

export default FilterView;
