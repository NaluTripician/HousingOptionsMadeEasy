import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { Card } from "react-native-elements";
import FilterSelector from "./FilterSelector";
import ValueField from "./ValueField";
// import * as firebase from "firebase";
import styles from "./FilterView.style.js";
import RateAttributes from "./RateAtributes";
import Icon from "react-native-vector-icons/MaterialIcons";

function HouseDetailModal(props) {
  if (props.displayModal) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.displayModal}
        onRequestClose={() => {
          props.setDisplayModal(false);
        }}
      >
        <View style={styles.modalStyles}>
          <Pressable
            onPress={() => {
              props.setDisplayModal(false);
            }}
            style={styles.modalClose}
          >
            <Icon name="close" color="#517fa4" size={30} />
          </Pressable>
          <RateAttributes
            setDisplayModal={props.setDisplayModal}
            name={props.house["name"]}
          />
        </View>
      </Modal>
    );
  } else {
    return <View></View>;
  }
}

export default HouseDetailModal;
