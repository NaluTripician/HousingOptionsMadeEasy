import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import FilterSelector from "./FilterSelector";
import { Rating } from "react-native-ratings";
import styles from "./FilterView.style.js";
// import * as firebase from "firebase";
// import "firebase/firestore";

function ValueField(props) {
  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  var ratingsKeys = [
    "location",
    "kitchen",
    "outdoorSpace",
    "partyVenue",
    "overall",
  ];
  var myKey = props.myKey;
  //   myKeyDisplay = myKey
  //     .replace("outdoorSpace", "Outdoor Space")
  //     .replace("numberOfReviews", "Number of Reviews")
  //     .replace("partyVenue", "Party Venue")
  //     .replace("partyVenue", "Party Venue");
  console.log(myKey);
  if (myKey == "name") {
    return <></>;
  } else if (ratingsKeys.includes(myKey)) {
    return (
      <View>
        <Text style={styles.fieldTitle}>
          {Capitalize(
            myKey
              .replace("numberOfReviews", "Number of Reviews")
              .replace("outdoorSpace", "Outdoor Space")
              .replace("partyVenue", "Party Venue")
          )}
        </Text>
        <Rating
          style={styles.rating}
          readonly={true}
          startingValue={props.house[myKey]}
          name={props.house["name"]}
          imageSize={15}
          ratingCount={5}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.fieldTitle}>
          {Capitalize(
            myKey
              .replace("multipleUnits", "Number of Units")
              .replace("numberOfReviews", "Number of Reviews")
              .replace("fullBeds", "Number of Full Beds")
              .replace("quiet", "Quiet or Loud Street")
          )}
        </Text>
        <Text>{props.house[myKey]}</Text>
      </View>
    );
  }
}

export default ValueField;
