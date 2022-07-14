/**
 * Renders Dropdown Picker for list of tags
 * @param {Array} items - array of objects of tags: {name, value}
 * @param {Function} updateFilter - set state function to update state variable with selected tag value
 */
import React from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const DropdownFilter = (props) => {
    const [open, updateOpen] = React.useState(false);
    const [value, updateValue] = React.useState(null);
    const [items, updateItems] = React.useState(props.items);

    return(
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={updateOpen}
            setValue={updateValue}
            setItems={updateItems}
            onPress={() => updateItems(props.items)}
            onSelectItem={(item) => props.updateFilter(item.value) }
            style={styles.container}
            dropDownContainerStyle={styles.container}
            textStyle={{ color: "#fff" }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#303337",
    }
})

export default DropdownFilter;
