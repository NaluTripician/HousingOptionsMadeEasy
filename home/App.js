import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, Pressable, View } from "react-native";
import { styles } from "./styles";
import FilterView from "./components/FilterView";
import Home from "./components/Home";
import RateAtributes from './components/RateAtributes'

export default function App() {
  return (
    <View>
      <RateAtributes name='2 Fountain'/>
    </View>
  );
}
