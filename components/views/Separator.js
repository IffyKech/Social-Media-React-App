/**
 * Renders blank view for space
 * @param {Number} height - height of the separator view
 * @param {String} bg - background color of the separator view
 */
import React from "react";
import { View } from "react-native";

const Separator = (props) => {
    return(
        <View style={{height: props.height, backgroundColor: props.bg, marginVertical: 7}}>
        </View>
    )
}

export default Separator;