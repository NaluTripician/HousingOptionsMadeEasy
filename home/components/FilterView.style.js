import { StyleSheet } from "react-native";
import { getPendingResultAsync } from "expo-image-picker";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ECEFF2",
    paddingVertical: 70,
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
  madeBy: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    textDecorationLine: "underline",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  modalStyles: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 40,
    backgroundColor: "white",
    height: "100%",
  },
  modalClose: {
    alignItems: "flex-end",
  },
  fieldTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#363636",
  },
  fieldsView: {
    flex: 1,
    minWidth: "30%",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  fieldsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  rating: {
    paddingLeft: 0,
    marginLeft: -30,
  },
  logoImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  centerImage: {
    // width: 50,
    height: 100,
    minWidth: "70%",
    // minHeight: "10%",

    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  editIcon: {
    alignItems: "flex-end",
  },
});
