import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import FilterSelector from "./FilterSelector";
import { Rating } from "react-native-ratings";

// import * as firebase from "firebase";
// import "firebase/firestore";

function ValueField(props) {
  ratingsKeys = [
    "location",
    "kitchen",
    "outdoorSpace",
    "partyVenue",
    "overall",
  ];
  console.log(props.myKey);
  if (props.myKey == "name") {
    return <View></View>;
  } else if (ratingsKeys.includes(props.myKey)) {
    return (
      <View>
        <Text>{props.myKey}</Text>
        <Rating
          readonly={true}
          ratingCount={props.house[props.myKey]}
          name={props.house["name"]}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>{props.myKey}</Text>
        <Text>{props.house[props.myKey]}</Text>
      </View>
    );
  }
}

export default ValueField;
