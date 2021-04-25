import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, Text, Pressable, View } from "react-native";
import { styles } from "./styles";
//import FilterView from "./components/FilterView";
import Home from "./components/Home";
import RateAtributes from "./components/RateAtributes";
import Login from "./components/Login";

export default function App() {
  return (
    <View>
      <Home />
    </View>
  );
}
