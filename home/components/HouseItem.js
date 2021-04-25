import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { Card } from "react-native-elements";
import FilterSelector from "./FilterSelector";
import ValueField from "./ValueField";
// import * as firebase from "firebase";
import styles from "./FilterView.style.js";
import RateAttributes from "./RateAtributes";
import Icon from "react-native-vector-icons/MaterialIcons";

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
          setDisplayModal(true);
        }}
      >
        <Card containerStyle={styles.houseCard}>
          <Card.Title style={styles.cardTitle}>{house["name"]}</Card.Title>
          {Object.keys(house).map((key) => (
            <ValueField myKey={key} house={house} />
          ))}
        </Card>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={displayModal}
        onRequestClose={() => {
          setDisplayModal(!displayModal);
        }}
      >
        <View style={styles.modalStyles}>
          <Pressable
            onPress={() => {
              setDisplayModal(false);
            }}
            style={styles.modalClose}
          >
            <Icon name="close" color="#517fa4" size={30} />
          </Pressable>
          <RateAttributes name={house["name"]} />
        </View>
      </Modal>
      {/* <HouseDetailModal displayModal={displayModal} /> */}
    </>
  );
}

export default HouseItem;
