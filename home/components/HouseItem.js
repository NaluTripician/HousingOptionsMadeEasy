import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Modal, Image } from "react-native";
import { Card } from "react-native-elements";
import FilterSelector from "./FilterSelector";
import ValueField from "./ValueField";
// import * as firebase from "firebase";
import styles from "./FilterView.style.js";
import RateAttributes from "./RateAtributes";
import Icon from "react-native-vector-icons/MaterialIcons";
import HouseDetailModal from "./HouseDetailModal";
import firebase from "firebase/app";
import "firebase/storage";

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

function HouseItem(props) {
  const [displayModal, setDisplayModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
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

  function downloadViaUrl() {
    console.log(" GOT INTO DOWNLOAD VIA URL");
    const storageRef = firebase.storage().ref();
    storageRef
      .child(house["name"].replace(/\s/g, "_") + ".jpeg")
      .getDownloadURL()
      .then((url) => {
        setDownloadUrl(url);
      })
      .catch((error) => {
        setDownloadUrl("");
        // Handle any errors
      });
  }

  downloadViaUrl();
  console.log("downloadUrl after calling function is:", downloadUrl);

  const ordered = Object.keys(house)
    .sort()
    .reduce((obj, key) => {
      obj[key] = house[key];
      return obj;
    }, {});

  return (
    <>
      <Pressable
        onPress={() => {
          setDisplayModal(!displayModal);
        }}
      >
        <Card containerStyle={styles.houseCard}>
          <View style={styles.editIcon}>
            <Icon
              styles={styles.editIcon}
              name="edit"
              color="#517fa4"
              size={20}
            />
          </View>
          <Card.Title style={styles.cardTitle}>{house["name"]}</Card.Title>
          <View style={styles.centerImage}>
            <Image
              style={styles.image}
              source={{
                uri: downloadUrl,
              }}
            ></Image>
          </View>

          <View style={styles.fieldsContainer}>
            {/* {Object.keys(house) */}
            {Object.keys(ordered)
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
