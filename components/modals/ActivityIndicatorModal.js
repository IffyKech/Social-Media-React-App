/**
 * Renders loading modal for Upload Page
 * @param {Boolean} modalVisible - boolean state variable to display modal
 * @param {Function} onRequestClose - Updates modalVisible on user close request
 */
import React from "react";
import {Modal, ActivityIndicator, StyleSheet, View, Text } from "react-native";

export default function ActivityIndicatorModal({modalVisible, onRequestClose}) {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onRequestClose}>

            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text>Uploading...</Text>
                   <ActivityIndicator size="large" />
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
    }
});
