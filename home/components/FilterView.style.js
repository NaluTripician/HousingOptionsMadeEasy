import { StyleSheet } from "react-native";
import { getPendingResultAsync } from "expo-image-picker";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ECEFF2",
    paddingTop: 70,
    paddingHorizontal: 25,
    height: "100%",
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
    fontWeight: "700",
    fontSize: 20,
    color: "#363636",
  },
  titleText: {
    paddingVertical: 10,
    fontSize: 35,
  },
  inputLabel: {
    fontWeight: "500",
    paddingVertical: 10,
    fontSize: 20,
  },
});
