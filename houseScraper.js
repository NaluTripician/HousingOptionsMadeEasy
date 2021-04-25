// TO UPDATE BEDS, ADD fullBeds: numFull TO AMENITIES
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.wesleyan.edu/reslife/ugrad_housing/woodframes.html';
const houseList = [];
const noDotsHouseList = [];
const allUrls = [];
var amenityDict = {};
var beginningUrl = 'https://www.wesleyan.edu/reslife';

const fs = require("fs");

//const functions = require("firebase-functions");
const admin = require("firebase-admin");

const houses = require("./houseScrape.js");


var serviceAccount = require("./housingoptionsmadeeasy-firebase-adminsdk-g4fg7-20baf7ca30.json");

if (admin.apps.length == 0){
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://housingoptionsmadeeasy.firebaseio.com/",
});
}

const dbh = admin.firestore();


var regex = new RegExp(
  '../housing/woodframe/.+'
);
return rp(url)
  .then(async function (html) {
      var houses = $('a', html)

      for (const house of houses){
        try{

        if (($(house).attr('href')).match(regex)){
            houseList.push(($(house).attr('href')))
            }

        }
        catch(error) {}
    }
    for (house of houseList){
    noDotsHouseList.push(house.replace('..', ''));
            }
    for (houseUrl of noDotsHouseList){
        allUrls.push(beginningUrl + houseUrl);
    }

    for (const houseUrl of allUrls){

        rp(houseUrl)
        .then(async function (html2) {

            try{
                var amenities = $('ul > li', html2);

                var bedrooms = $('p', html2);

                var moreBedrooms = $('h3', html2);

                var moreBedroomText = moreBedrooms.text()

                var bedroomText = bedrooms.text().replace(' The University recognizes that any housing built prior to 1978 may contain lead-based paint and/or lead-based paint hazards.  By accepting your housing contract, you are affirming that you have reviewed the pamphlet Protect Your Family from Lead In Your Home.', '');
                var bedroomText = bedroomText.replace('All Wesleyan housing was built before 1978 with the exception of the following:  Bennet Hall, Fauver Apartments, 19 Fountain Avenue, 20 Fountain Avenue, 25 Fountain Avenue, 231 Pine Street, and 14 Warren Street.', '');
                var bedroomText = bedroomText.replace('Bed type in each room is as follows:', '')
                var bedroomText = bedroomText.replace('Housing built before 1978 may contain lead-based paint.', '')
                var bedroomText = bedroomText.replace('Lead from paint, paint chips, and dust can pose health hazards if not taken care of properly.', '')
                var bedroomText = bedroomText.replace('Lead exposure is especially harmful to young children and pregnant women.', '')
                var bedroomText = bedroomText.replace('Before renting pre-1978 housing, landlords must disclose the presence of known lead-based paint and lead-based paint hazards in the dwelling.', '')
                var bedroomText = bedroomText.replace('Tenants must also receive a Federally approved pamphlet on lead poisoning prevention.', '')
                var bedroomText = bedroomText.replace('The pamphlet may be viewed at:', '')
                var bedroomText = bedroomText.replace('http://www.hud.gov/offices/lead/library/enforcement/pyf_eng.pdf.', '')
                var bedroomText = bedroomText.replace('House furnishings:', '')
                var bedroomText = bedroomText.replace('Furnishing includes:', '')
                var bedroomText = bedroomText.replace('2016','')
                var bedroomText = bedroomText.replace('The newly constructed wood frame houses were built with sustainability and energy conservation in mind. It is hoped that the residents who chose to live in these houses are energy conscious, and will respect the measures that have been incorporated into its design, rather than negate them. Such measures include high efficiency boiler and hot water heaters, thermostats that can be programmed differently for when the house is not occupied, energy efficient windows, energy star appliances, water conserving fixtures, and fluorescent interior light fixtures, to name just a few. 14 Warren and 25 Fountain use geothermal heating. To reduce carbon footprint, air conditioning will not be functional during the academic year, just as in all the older wood frames.', '')

                var removeRegex = new RegExp('.+ is a .+');
                var removeRegex2 = new RegExp('.+ are .+ units');
                var yearRegex = new RegExp('.+ GRS 2011')
                var undergradRegex = new RegExp('Undergrad .+')
                var bedroomText = bedroomText.replace(removeRegex, '')
                var bedroomText = bedroomText.replace(removeRegex2, '')
                var bedroomText = bedroomText.replace(yearRegex, '')
                var bedroomText = bedroomText.replace(undergradRegex, '')

                 //need to add number of bedrooms and number of full beds
                var numBeds = 2
                var six = new RegExp('6')
                var five = new RegExp('5')
                var four = new RegExp('4')
                var three = new RegExp('3')
                var two = new RegExp('2')

                if (moreBedroomText.match(three)){numBeds = 3}
                if (moreBedroomText.match(four)){numBeds = 4}
                if (moreBedroomText.match(five)){numBeds = 5}
                if (moreBedroomText.match(six)){numBeds = 6}


                if (bedroomText.match(three)){numBeds = 3}
                if (bedroomText.match(four)){numBeds = 4}
                if (bedroomText.match(five)){numBeds = 5}
                if (bedroomText.match(six)){numBeds = 6}

                var numFull = numBeds
                var twinRegex = new RegExp('twin|Twin')
                for (i = 0; i < bedroomText.length - 4; i += 1){
                    slice = bedroomText.slice(i, i+4)
                    if (slice.match(twinRegex)){
                        numFull -= 1
                        //console.log(slice)
                    };
                };

                var houseName = houseUrl.replace('https://www.wesleyan.edu/reslife/housing/woodframe/', '')
                var houseName = houseName.replace('.htm', '')
                var houseName = houseName.replace('_', ' ')
                var houseName = houseName.replace('_', ' ')

                //console.log(houseName)
                //console.log(numBeds)

                var houseName = houseName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

                // console.log(houseName)
                // console.log(numBeds)
                // console.log(numFull)

                var streetRegex = new RegExp('[0-9 ]+');
                var streetName = houseName.replace(streetRegex,'');
                var streetName = streetName.charAt(0).toUpperCase() + streetName.slice(1);
                var quietBool = 'loud';
                var houseRegex =  new RegExp('Home|Brainerd|Lawn|Huber|Knowles|Williams');
                if (streetName.match(houseRegex)){
                   quietBool = 'quiet'
               }

                 var amenityText = amenities.text().replace('Common Area: couch, chair, end table and coffee tableKitchen: kitchen table, chairs, refrigerator, stove and oven','');
                 var amenityText = amenityText.replace('Bedrooms: desk, chair, dresser and bookcase','')
                 var amenityText = amenityText.replace('Common Area: couch, chair, end table and coffee tableKitchen: kitchen table, four chairs, refrigerator, stove and ovenBedrooms: desk, chair, dresser, bookcase and full size beds','')
                 var amenityText = amenityText.replace('Common Area: couch, chair, end table and coffee tableKitchen: kitchen table, chairs, refrigerator, stove and oven','')
                 var amenityText = amenityText.replace('Common Area: couch, chair, end table and coffee table','')
                 var amenityText = amenityText.replace('Please note that the 2nd floor has a low ceiling (ceiling height is 6 feet, 2 inches).','')
                 var amenityText = amenityText.replace('Common Area: couch, chair, end table and coffee tableKitchen: kitchen table, four chairs, refrigerator, stove and ovenBedrooms: desk, chair, dresser, bookcase and twin size beds', '')
                 var amenityText = amenityText.replace('Kitchen: kitchen table, chairs, refrigerator, stove and oven', '')
                 var amenityText = amenityText.replace('Kitchen: kitchen table, four chairs, refrigerator, stove and oven', '')
                 var amenityText = amenityText.replace('Bedrooms: desk, chair, dresser, full bed and bookcase', '')
                 var amenityText = amenityText.replace('Bedrooms: desk, chair, dresser, bookcase and twin size beds', '')
                 var amenityText = amenityText.replace('Common Area(A, B, and C): couch, arm chair, end table and coffee tableCommon Area (B): Arm chair', '')
                 var amenityText = amenityText.replace('Bedrooms: desk, chair, dresser and bookcase', '')
                 var amenityText = amenityText.replace(', wardrobe','')
                 var amenityText = amenityText.replace('Bathroom(s):','')
                 var amenityText = amenityText.replace('Bed type: full','')
                 var amenityText = amenityText.replace('½','.5')

                 amenityDict[houseName] = amenityText;

                 //console.log(houseUrl)
                 //console.log(houseName)
                 //console.log(amenityDict[houseName]);

                 const housePath = 'houses';
                 houseDict = await dbh.collection(housePath).doc(houseName);
                 var bathroomNum = amenityDict[houseName]


                 var multiUnit =  'Single Unit'
                 var withD = new RegExp(' D| D,|D ')
                 var withC = new RegExp(' C| C,|C ')
                 var withB = new RegExp(' B| B,|B ')
                 var withA = new RegExp('.*A')
                 if (houseName.match(withA)){
                     multiUnit = "Multiple Units"
                 }
                 // if (houseName == '40 Home Ave'){
                 //     console.log("FOUND 40 HOME")
                 //     console.log(bedroomText)
                 //     console.log(numBeds)
                 //     console.log(moreBedrooms.text())
                 //     console.log("done with 40 HOME")
                 // }
                 var oneLoop = 1
                 if (amenities.text().match(withD)){
                     oneLoop = -1
                     multiUnit = "Multiple Units"
                     houseNameB = houseName + " B"
                     houseNameC = houseName + " C"
                     houseNameD = houseName + " D"
                     houseName = houseName + " A"

                     dbh.collection("houses").doc(houseNameD).set(
                         {occupancy: numBeds, ammenities:{bathrooms:bathroomNum}, name: houseNameD, multipleUnits:multiUnit, location:{street: streetName, quiet: quietBool}},{ merge: true })
                     .then(() => {
                         console.log("Document successfully written!");
                     })
                     dbh.collection("houses").doc(houseNameB).set(
                        {occupancy: numBeds, ammenities:{bathrooms:bathroomNum}, name: houseNameB, multipleUnits:multiUnit, location:{street: streetName, quiet: quietBool}},{ merge: true })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    dbh.collection("houses").doc(houseNameC).set(
                       {occupancy: numBeds, ammenities:{bathrooms:bathroomNum}, name: houseNameC, multipleUnits:multiUnit, location:{street: streetName, quiet: quietBool}},{ merge: true })
                   .then(() => {
                       console.log("Document successfully written!");
                   })
                 }
                 if (amenities.text().match(withC) && oneLoop == 1){
                     oneLoop = -1
                     multiUnit = "Multiple Units"
                     houseNameB = houseName + " B"
                     houseNameC = houseName + " C"
                     houseName = houseName + " A"

                     dbh.collection("houses").doc(houseNameB).set(
                        {occupancy: numBeds, ammenities:{bathrooms:bathroomNum}, name: houseNameB, multipleUnits:multiUnit, location:{street: streetName, quiet: quietBool}},{ merge: true })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    dbh.collection("houses").doc(houseNameC).set(
                       {occupancy: numBeds, ammenities:{bathrooms:bathroomNum}, name: houseNameC, multipleUnits:multiUnit, location:{street: streetName, quiet: quietBool}},{ merge: true })
                   .then(() => {
                       console.log("Document successfully written!");
                   })
                 }
                 if (amenities.text().match(withB) && oneLoop == 1){
                     multiUnit = "Multiple Units"
                     houseNameB = houseName + " B"
                     houseName = houseName + " A"

                     dbh.collection("houses").doc(houseNameB).set(
                        {occupancy: numBeds, ammenities:{bathrooms:bathroomNum}, name: houseNameB, multipleUnits:multiUnit, location:{street: streetName, quiet: quietBool}},{ merge: true })
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                 }

                 dbh.collection("houses").doc(houseName).set(
                    {occupancy: numBeds, ammenities:{bathrooms:bathroomNum}, name: houseName, multipleUnits:multiUnit, location:{street: streetName, quiet: quietBool}},{ merge: true })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

             }
             catch (err) {console.log("error is:", err)}

}).catch(function(err){});
}

});
