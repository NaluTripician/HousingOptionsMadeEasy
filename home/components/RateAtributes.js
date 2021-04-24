import React, { Component } from 'react';
import { Rating } from 'react-native-ratings';
import { Text, View, Button } from "react-native";
import {styles} from '../styles';

class RateAtributes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      overall: 0,
      outdoorSpace: 0,
      location: 0,
      partyVenue: 0
    };
  }

  overallR(rating) {
    this.setState({
      overall: rating
    });
  }

  outdoorSpaceR(rating) {
    this.setState({
      outdoorSpace: rating
    });
  }

  locationR(rating) {
    this.setState({
      location: rating
    });
  }

  partyVenueR(rating) {
    this.setState({
      partyVenue: rating
    });
  }

  printRating(rating){
    console.log("Rating: " + rating)
  }

  submit(){
    console.log("farts")
  }

  render() {
      return (
          <View>
            <Text style={styles.instructions}>
              Overall Rating.
            </Text>
            <Rating
              startingValue={0}
              fractions={1}
              style={{ paddingVertical: 10 }}
              showRating
              onStartRating={(rating) => this.printRating(rating)}
              />
            <Text style={styles.instructions}>
              Outdoor Space Rating.
            </Text>
            <Rating
              startingValue={0}
              fractions={1}
              style={{ paddingVertical: 10 }}
              showRating
              onStartRating={(rating) => this.printRating(rating)}
            />
            <Text style={styles.instructions}>
              Location Rating.
            </Text>
            <Rating
              startingValue={0}
              fractions={1}
              style={{ paddingVertical: 10 }}
              showRating
              onStartRating={(rating) => this.printRating(rating)}
            />
            <Text style={styles.instructions}>
              Party Venue Rating.
            </Text>
            <Rating
              startingValue={0}
              fractions={1}
              style={{ paddingVertical: 10 }}
              showRating
              onStartRating={(rating) => console.log("Rating: " + rating)}
            />
            <Button
              onPress={this.submit()}
              title="Submit Review"
              color="#3f0404"
            />
          </View>
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
