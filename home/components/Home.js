import React, { useState, useEffect } from "react";

import { Text, View } from "react-native";
import FilterView from "./FilterView";
import FilterSelector from "./FilterSelector";
import Login from "./Login";

function Home(props) {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  if (!loggedInStatus) {
    return (
      <View>
        <Login setLoggedInStatus={setLoggedInStatus} />
      </View>
    );
  } else {
    return (
      <View>
        <FilterView setLoggedInStatus={setLoggedInStatus} />
      </View>
    );
  }
}
export default Home;
