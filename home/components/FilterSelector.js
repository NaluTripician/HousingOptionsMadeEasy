import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/MaterialIcons";

function FilterSelector(props) {
  const [myDefault, setDefaultValue] = useState(props.items[0].toString());
  const [zInverse, setZInverse] = useState(6000);
  //   {label: item, value: item, icon: () => <Icon name="flag" size={18} color="#900" />}
  const items = props.items.map((item) => {
    return {
      label: item.toString(),
      value: item,
      icon: () => <Icon name={props.icon} size={18} color="#900" />,
    };
  });
  const category = props.category;

  console.log("items for filter for category", props.category, "is:", items);

  return (
    <DropDownPicker
      items={items}
      zIndex={props.zIndex}
      zIndexInverse={zInverse}
      defaultValue={myDefault}
      placeholder={category}
      containerStyle={{ height: 40 }}
      onOpen={() => {
        setZInverse(6000);
      }}
      onClose={() => {
        setZInverse(100);
      }}
      style={{
        backgroundColor: "#fafafa",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
      itemStyle={{
        justifyContent: "flex-start",
      }}
      dropDownMaxHeight={165}
      dropDownStyle={{ backgroundColor: "#fafafa" }}
      onChangeItem={(item) => {
        props.setFilter(item.value);
        setDefaultValue(item.value);
        console.log(
          "item value in onchangeitem in filter selector is:",
          item.value
        );
      }}
    />
  );
}
export default FilterSelector;
