import { StyleSheet } from "react-native";
import { getPendingResultAsync } from "expo-image-picker";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ECEFF2",
    paddingTop: 100,
    paddingHorizontal: 25,
    // alignItems: "center",
    // justifyContent: "center",
  },
  houseCard: {
    borderRadius: 10,
    elevation: 0,
    shadowOpacity: 0,
    marginHorizontal: 0,
  },
  cardTitle: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 20,
    color: "#363636",
  },
  titleText: {
    fontSize: 35,
  },
});
