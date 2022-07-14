/**
 * Renders submit button on UploadPage
 * @param {Function} onPress - onPress function passed from parent component
 */
import React from "react";
import {Pressable, Text, View, StyleSheet} from "react-native";

export default function Post({onPress}) {
    return(
        <View style={styles.signOutContainer}>
            <Pressable style={ ({pressed}) => [
                {
                    backgroundColor: pressed ? "green" : "#007AFF",
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingVertical: 15,
                    width: "25%",
                    alignItems: "center"
                }
            ]} onPress={onPress}>
                <Text style={{ color: "#fff" }}>Post</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    signOutContainer: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 5
    }
})