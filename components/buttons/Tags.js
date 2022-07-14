/**
 * Renders Tag view on UploadPage
 * @param {Function} setTag - update state function to update state variable with new tag selected
 */
import React from "react";
import {TouchableOpacity, Text, StyleSheet, View, Keyboard } from "react-native";
import Tags from "react-native-tags";

const MyTagInput = ({setTag}) => (
    <Tags
        initialText=""
        textInputProps={{
            placeholder: "e.g., Jordan-6-Retro-Bordeaux",
            placeholderTextColor: "#fff",
            onPressOut: () => Keyboard.dismiss()
        }}
        onChangeTags={tags => setTag(tags)}
        onTagPress={(index, tagLabel, event) =>
            console.log(index, tagLabel, event)
        }
        maxNumberOfTags={1}
        containerStyle={{ justifyContent: "center" }}
        inputStyle={styles.input}
        renderTag={({ tag, index, onPress, deleteTagOnPress, readOnly}) => (

                <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                    <View style={styles.tagContainer}>
                        <Text>{tag}</Text>
                    </View>

                </TouchableOpacity>

        )}
    />
);

const styles = StyleSheet.create({
    input: {
        backgroundColor: "gray",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 20,
    },
    tagContainer: {
        justifyContent: "center",
        backgroundColor: "#e0e0e0",
        borderRadius: 16,
        paddingHorizontal: 12,
        height: 32,
        margin: 4,
        opacity: 1
    }
})

export default MyTagInput;