/**
 * Renders Sign Out button
 * @param {Function} signOut - sign out function from App
 */
import React from "react";
import {Pressable, Text, View, StyleSheet} from "react-native";

export default function SignOut({signOut}) {
    return(
        <View style={styles.signOutContainer}>
            <Pressable style={ ({pressed}) => [
                {
                    backgroundColor: pressed ? "#ff3333" : "#007AFF",
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingVertical: 15,
                    width: "25%",
                    alignItems: "center"
                }
            ]} onPress={signOut}>
                <Text style={{ color: "#fff" }}>Sign Out</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    signOutContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 5
    }
})