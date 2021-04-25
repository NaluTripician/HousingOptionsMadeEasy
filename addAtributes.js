const rp = require('request-promise');
const $ = require('cheerio');

const fs = require("fs");

//const functions = require("firebase-functions");
const admin = require("firebase-admin");

const houses = require("./addAtributes.js");


var serviceAccount = require("./housingoptionsmadeeasy-firebase-adminsdk-g4fg7-20baf7ca30.json");

if (admin.apps.length == 0){
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://housingoptionsmadeeasy.firebaseio.com/",
});
}

const dbh = admin.firestore();

dbh
      .collection("houses")
      .get()
      .then(async (querySnapshot) => {
        await querySnapshot.forEach((doc) => {
          console.log("running foreach");
          dbh.collection("houses").doc(doc.data()['name']).set({ratings:{
            overall: 0,
            outdoorSpace: 0,
            location: 0,
            partyVenue: 0,
            kitchen: 0,
            numberOfReviews: 0
          }},{merge:true});
          dbh.collection("houses").doc(doc.data()['name']).set({comments:[]},{merge:true});
          console.log("doc.data() is:", doc.data()['name']);
          //console.log("After push");
        });
        // console.log("houseList in then is:", houseList);
        console.log("after foreach");
      });
