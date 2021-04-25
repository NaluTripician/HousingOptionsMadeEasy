import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { Card } from "react-native-elements";
import FilterSelector from "./FilterSelector";
import ValueField from "./ValueField";
// import * as firebase from "firebase";
import styles from "./FilterView.style.js";
import RateAttributes from "./RateAtributes";
import Icon from "react-native-vector-icons/MaterialIcons";
import HouseDetailModal from "./HouseDetailModal";

// import "firebase/firestore";

function HouseItem(props) {
  const [displayModal, setDisplayModal] = useState(false);
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
    <>
      <Pressable
        onPress={() => {
          setDisplayModal(!displayModal);
        }}
      >
        <Card containerStyle={styles.houseCard}>
          <View styles={styles.editIcon}>
            <Icon
              styles={styles.editIcon}
              name="edit"
              color="#517fa4"
              size={20}
            />
          </View>
          <Card.Title style={styles.cardTitle}>{house["name"]}</Card.Title>

          <View style={styles.fieldsContainer}>
            {Object.keys(house)
              .filter((key) => {
                return key != "name" && house[key] != "";
              })
              .map((key) => (
                <View style={styles.fieldsView}>
                  <ValueField myKey={key} house={house} />
                </View>
              ))}
          </View>
        </Card>
      </Pressable>
      <View style={styles.modalContainer}>
        <HouseDetailModal
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          house={house}
        />
      </View>
    </>
  );
}

export default HouseItem;
