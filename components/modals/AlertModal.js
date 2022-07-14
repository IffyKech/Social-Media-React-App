/**
 * Renders invalid details modal for Upload Page
 * @param {Boolean} modalVisible - boolean state variable to display modal
 * @param {Function} onRequestClose - Updates modalVisible on user close request
 */
import React from "react";
import {Modal, Pressable, StyleSheet, Text, View} from "react-native";

export default function AlertModal({modalVisible, onRequestClose}) {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onRequestClose}>

            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Please enter all values before creating a post</Text>
                    <Pressable style={[styles.button, styles.buttonClose]}
                               onPress={onRequestClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </Pressable>
                </View>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    modalView: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "blue"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
    }
});
