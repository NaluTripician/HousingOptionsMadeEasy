import React, { Component } from "react";
import { Rating } from "react-native-ratings";
import { Text, View, Button, SafeAreaView, TextInput } from "react-native";
import { styles } from "../styles";
import * as firebase from "firebase";
import "firebase/firestore";

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

class RateAtributes extends Component {
  constructor(name, props) {
    super(props);
    this.state = {
      overall: 0,
      outdoorSpace: 0,
      location: 0,
      partyVenue: 0,
      kitchen: 0,
      comment: "",
    };
    this.name = name;
  }
  overallR(rating) {
    console.log("over");
    this.setState({
      overall: rating,
    });
  }

  outdoorSpaceR(rating) {
    console.log("out");
    this.setState({
      outdoorSpace: rating,
    });
  }

  locationR(rating) {
    console.log("loc");
    this.setState({
      location: rating,
    });
  }

  partyVenueR(rating) {
    console.log("party");
    this.setState({
      partyVenue: rating,
    });
  }

  kitchenR(rating) {
    console.log("kitchen");
    this.setState({
      kitchen: rating,
    });
  }

  setComment(comment) {
    console.log("text AHH");
    this.setState({ comment: comment });
  }

  submitReview() {
    var house = dbh.collection("houses").doc(String(this.name["name"]));
    var over = this.state.overall;
    var out = this.state.outdoorSpace;
    var loc = this.state.location;
    var party = this.state.partyVenue;
    var kitch = this.state.kitchen;
    var comm = this.state.comment;
    house
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var oldRatings = doc.data();
          house.set(
            {
              ratings: {
                overall:
                  (oldRatings["ratings"]["overall"] *
                    oldRatings["ratings"]["numberOfReviews"] +
                    over) /
                  (oldRatings["ratings"]["numberOfReviews"] + 1),
                outdoorSpace:
                  (oldRatings["ratings"]["outdoorSpace"] *
                    oldRatings["ratings"]["numberOfReviews"] +
                    out) /
                  (oldRatings["ratings"]["numberOfReviews"] + 1),
                location:
                  (oldRatings["ratings"]["location"] *
                    oldRatings["ratings"]["numberOfReviews"] +
                    loc) /
                  (oldRatings["ratings"]["numberOfReviews"] + 1),
                partyVenue:
                  (oldRatings["ratings"]["partyVenue"] *
                    oldRatings["ratings"]["numberOfReviews"] +
                    party) /
                  (oldRatings["ratings"]["numberOfReviews"] + 1),
                kitchen:
                  (oldRatings["ratings"]["kitchen"] *
                    oldRatings["ratings"]["numberOfReviews"] +
                    kitch) /
                  (oldRatings["ratings"]["numberOfReviews"] + 1),
                numberOfReviews: oldRatings["ratings"]["numberOfReviews"] + 1,
              },
            },
            { merge: true }
          );
          console.log(oldRatings["comments"]);
          var newArr = oldRatings["comments"];
          newArr.push(comm);
          console.log(newArr);
          house.set({ comments: newArr }, { merge: true });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    console.log("BUTTON");
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={styles.centerView}>
            <Text style={styles.titleText}>{String(this.name["name"])}</Text>
          </View>

          <Text style={styles.instructions}>
            How is the overall quality of this house?
          </Text>
          <Rating
            startingValue={0}
            fractions={1}
            style={{ paddingVertical: 10 }}
            showRating
            onStartRating={(rating) => this.overallR(rating)}
            ratingBackgroundColor="#ECEFF2"
          />
          <Text style={styles.instructions}>
            How good are the outdoor spaces?
          </Text>
          <Rating
            startingValue={0}
            fractions={1}
            style={{ paddingVertical: 10 }}
            showRating
            onStartRating={(rating) => this.outdoorSpaceR(rating)}
            ratingBackgroundColor="#ECEFF2"
          />
          <Text style={styles.instructions}>
            How is the location of this house?
          </Text>
          <Rating
            startingValue={0}
            fractions={1}
            style={{ paddingVertical: 10 }}
            showRating
            onStartRating={(rating) => this.locationR(rating)}
            ratingBackgroundColor="#ECEFF2"
          />
          <Text style={styles.instructions}>How nice is the kitchen?</Text>
          <Rating
            startingValue={0}
            fractions={1}
            style={{ paddingVertical: 10 }}
            showRating
            onStartRating={(rating) => this.kitchenR(rating)}
            ratingBackgroundColor="#ECEFF2"
          />
          <Text style={styles.instructions}>
            How is good of a party venue is this house?
          </Text>
          <Rating
            startingValue={0}
            fractions={1}
            style={{ paddingVertical: 10 }}
            showRating
            onStartRating={(rating) => this.partyVenueR(rating)}
            ratingBackgroundColor="#ECEFF2"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter additional comments here"
            onChangeText={(words) => this.setComment(words)}
          />
          <Button
            onPress={() => this.submitReview()}
            title="Submit Review"
            color="#9f0404"
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default RateAtributes;

// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { Image, Text, Pressable, View } from 'react-native';
// import {styles} from './styles';
// import RateAtributes from './components/RateAtributes'
// //stupid
// export default function App() {
//
//   return (
//     <View>
//       <RateAtributes />
//     </View>
//   );
// }
