import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Image,
  Platform,
} from "react-native";
import FilterSelector from "./FilterSelector";
// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import styles from "./FilterView.style.js";
import HouseItem from "./HouseItem";
import { FIREBASE_API_KEY } from "@env";

// import "firebase/firestore";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
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
  const [multipleUnitsFilter, setMultipleUnitsFilter] = useState(noFilter);
  const [fullBedsFilter, setFullBedsFilter] = useState(noFilter);

  const [houses, setHouses] = useState([]);
  const [housesQueried, setHousesQueried] = useState(false);
  const filters = [
    "bathrooms",
    "quiet",
    "street",
    "overall",
    "occupancy",
    "multipleUnits",
    "fullBeds",
  ];
  var houseList = [];
  var streets = [
    "Brainerd",
    "Church",
    "College",
    "Court",
    "Cross",
    "Fountain",
    "High",
    "Home",
    "Knowles",
    "Lawn",
    "Miles",
    "Pearl",
    "Pine",
    "Vine",
    "Sesame",
    "Warren",
    "Williams",
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
    if (
      (filter == "bathrooms") |
      (filter == "overall") |
      (filter == "fullBeds")
    ) {
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
  console.log("HELLO");
  console.log(
    "house filter is:",
    houses.filter((house) => house["bathrooms"] == bathroomsFilter)
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.centerImage}>
        <Image
          style={styles.logoImage}
          source={require("../assets/HOME-logo.png")}
        />
      </View>
      <Text style={styles.inputLabel}>Occupancy</Text>
      <FilterSelector
        zIndex={5000}
        items={[noFilter, 6, 5, 4, 3, 2]}
        icon={"person"}
        category={"occupancy"}
        setFilter={setOccupancyFilter}
      />
      <Text style={styles.inputLabel}>Street</Text>

      <FilterSelector
        zIndex={4000}
        items={[noFilter, ...streets]}
        icon={"house"}
        category={"street"}
        setFilter={setStreetFilter}
      />
      <Text style={styles.inputLabel}>Quiet or Loud Street</Text>

      <FilterSelector
        zIndex={3000}
        items={[noFilter, "quiet", "loud"]}
        icon={"hotel"}
        category={"quiet"}
        setFilter={setQuietFilter}
      />

      <Text style={styles.inputLabel}>Number of Bathrooms</Text>
      <FilterSelector
        zIndex={2000}
        items={[noFilter, 3, 2, 1]}
        icon={"bathtub"}
        category={"bathrooms"}
        setFilter={setBathroomsFilter}
      />
      <Text style={styles.inputLabel}>Single or Multiple Units</Text>
      <FilterSelector
        zIndex={1500}
        items={[noFilter, "Single Unit", "Multiple Units"]}
        icon={"apartment"}
        category={"multiple units"}
        setFilter={setMultipleUnitsFilter}
      />
      <Text style={styles.inputLabel}>Number of Full Beds</Text>
      <FilterSelector
        zIndex={1200}
        items={[noFilter, 6, 5, 4, 3, 2, 1]}
        icon={"king-bed"}
        category={"full beds"}
        setFilter={setFullBedsFilter}
      />
      <Text style={styles.inputLabel}>Overall Rating</Text>
      <FilterSelector
        zIndex={1100}
        items={[noFilter, 5, 4, 3, 2, 1]}
        icon={"star"}
        category={"overall"}
        setFilter={setOverallFilter}
      />

      <View style={styles.madeBy}>
        <Text>
          Made By:{" "}
          <Text
            style={styles.linkText}
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/isabel-armour-garb/")
            }
          >
            Isabel Armour-Garb,
          </Text>{" "}
          <Text
            style={styles.linkText}
            onPress={() =>
              Linking.openURL(
                "https://www.linkedin.com/in/jack-canavan-gosselin/"
              )
            }
          >
            Jack Canavan-Gosselin,
          </Text>{" "}
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL("https://www.danielknopf.com")}
          >
            Daniel Knopf,
          </Text>{" "}
          and{" "}
          <Text
            style={styles.linkText}
            onPress={() =>
              Linking.openURL(
                "https://www.linkedin.com/in/nalu-tripician-8b3691174/"
              )
            }
          >
            Nalu Tripician
          </Text>
        </Text>
      </View>
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
            // console.log("AAAA", eval(filter + "Filter"));
            var myRegex = new RegExp(eval(filter + "Filter"));
            // const filterContent = toString(house[filter]);
            // console.log(
            //   "filtercontent is:",
            //   filterContent,
            //   "and eval filter is:",
            //   eval(filter + "Filter")
            // );
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
