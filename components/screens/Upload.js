/**
 * Renders Upload page
 */
import React from "react";
import { StyleSheet, Text, View, Pressable, Image, TextInput, Platform, KeyboardAvoidingView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import UploadImage from "../../api/media/UploadImage";
import MyTagInput from "../buttons/Tags";
import Separator from "../views/Separator";
import Post from "../buttons/Post";
import AlertModal from "../modals/AlertModal";
import ActivityIndicatorModal from "../modals/ActivityIndicatorModal";
import UploadToBucket from "../../api/gcloud/UploadToBucket";

export default function Upload() {
    const [alertModalVisible, setAlertModalVisible] = React.useState(false); // initialize alertModal state
    const [activityModalVisible, setActivityModalVisible] = React.useState(false); // initialize activityModal state
    const [image, setImage] = React.useState(null); // initialize image state variable
    const [title, setTitle] = React.useState(""); // initialize title state variable
    const [tag, setTag] = React.useState("");  // initialize tag state variable

    return(
        <View style={styles.container}>
            <AlertModal modalVisible={alertModalVisible} onRequestClose={() => setAlertModalVisible(!alertModalVisible) } />
            <ActivityIndicatorModal modalVisible={activityModalVisible} onRequestClose={() => setActivityModalVisible(!activityModalVisible)} />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.uploadSection}>
                    <Pressable onPress={() => UploadImage(setImage)}>
                        <View style={styles.uploadContainer}>
                            {image == null ? (
                                <View style={styles.imageContainer}>
                                    <FontAwesome name="file-picture-o" size={54} color="#000" />
                                    <Text style={{ paddingVertical: 10, color: "#fff" }}>Choose a file from your device</Text>
                                </View>
                            ): (
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: image }} style={{ width: 125, height: 125 }} />
                                </View>
                            )}
                        </View>
                    </Pressable>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={{ fontSize: 25, color: "#fff" }}>Title:</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} placeholder="Title..." placeholderTextColor="#fff" value={title}
                                   onChangeText={setTitle} maxLength={50} />
                    </View>

                    <Separator height={1} bg="black" />

                    <View style={{paddingLeft: 10, marginTop: 5}}>
                        <Text style={{ color: "#fff" }}>tags:</Text>
                    </View>
                    <MyTagInput setTag={setTag} />
                </View>
            </KeyboardAvoidingView>

            <Post onPress={ () => UploadToBucket(image, tag, title, setAlertModalVisible, setActivityModalVisible) } />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#393E42"
    },
    uploadSection: {
        height: "40%",
        padding: 10
    },
    uploadContainer: {
        borderWidth: 2,
        borderColor: "#000",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "gray",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    imageContainer: {
        alignItems: "center"
    },
    formContainer: {
        marginHorizontal: 10
    },
    labelContainer: {
        marginVertical: 5,
        alignItems: "center"
    },
    inputContainer: {
        marginVertical: 5
    },
    input: {
        height: 50,
        backgroundColor: "#303337",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: "#fff"
    }
})