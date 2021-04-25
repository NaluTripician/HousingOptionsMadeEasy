import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import FilterSelector from "./FilterSelector";
import ValueField from "./ValueField";
// import * as firebase from "firebase";
import styles from "./FilterView.style.js";
// import "firebase/firestore";

function HouseItem(props) {
  var house = props.house;
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

  return (
    <Card containerStyle={styles.houseCard}>
      <Card.Title style={styles.cardTitle}>{house["name"]}</Card.Title>
      {Object.keys(house).map((key) => (
        <ValueField myKey={key} house={house} />
      ))}

      {/* <Text>{house["name"]}</Text>
      <Text>Bathrooms: {house["bathrooms"]}</Text>
      <Text>Overall rating: {house["ratings"]["overall"]}</Text>
      <Text>Images</Text> */}
    </Card>
  );
}

export default HouseItem;
