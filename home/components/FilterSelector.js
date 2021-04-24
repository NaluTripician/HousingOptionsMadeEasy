import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";

function FilterSelector(props) {
  const [myDefault, setDefaultValue] = useState(props.items[0].toString());
  //   {label: item, value: item, icon: () => <Icon name="flag" size={18} color="#900" />}
  const items = props.items.map((item) => {
    return {
      label: item.toString(),
      value: item.toString(),
      icon: () => <Icon name="flag" size={18} color="#900" />,
    };
  });

  console.log("items is:", items);

  return (
    <View>
      <DropDownPicker
        items={items}
        // items={[
        //   {
        //     label: "USA",
        //     value: "usa",
        //     icon: () => <Icon name="flag" size={18} color="#900" />,
        //     hidden: true,
        //   },
        //   {
        //     label: "UK",
        //     value: "uk",
        //     icon: () => <Icon name="flag" size={18} color="#900" />,
        //   },
        //   {
        //     label: "France",
        //     value: "france",
        //     icon: () => <Icon name="flag" size={18} color="#900" />,
        //   },
        // ]}
        defaultValue={myDefault}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: "#fafafa" }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={(item) => {
          props.setFilter(item.value);
          setDefaultValue(item.value);
          console.log(item.value);
        }}
      />
    </View>
  );
}
export default FilterSelector;
