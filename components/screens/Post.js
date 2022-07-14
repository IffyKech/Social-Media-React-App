/**
 * Render post page
 * @param {Object} route - Object of route path details
 */
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import * as SQLite from 'expo-sqlite';
import { AntDesign } from '@expo/vector-icons';

export default function Post({route}) {
    const [data, setData] = React.useState(route.params.data); // set post data sent from route
    const [tag, setTag] = React.useState(); // initialize tag state
    const [username, setUsername] = React.useState(); // initialize username state

    // On page load
    React.useEffect(() => { // query currently logged in user and tag name of the post passed from route
        const db = SQLite.openDatabase("videotest3.db");
        db.transaction(tx => {
            tx.executeSql(
                "SELECT user_name FROM Users WHERE user_id = (?)",
                [data.user_id],
                (txObj, results) => {setUsername(results.rows._array[0].user_name)},
                (transaction, error) => {console.log("Error: ",error)}
            );
            tx.executeSql(
                "SELECT tag_name FROM Tag WHERE tag_id = (?)",
                [data.tag_id],
                (txObj, results) => {setTag(results.rows._array[0].tag_name)},
                (transaction, error) => {console.log("Error: ",error)}
            );
        });
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.usernameContainer}>
                <AntDesign name="user" size={24} color="#000" />
                <Text style={{ fontSize: 20, paddingHorizontal: 10, color: "#F8F8FF" }}>{username}</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{
                    uri: data.post_img_src
                }} />
            </View>

            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 32, fontWeight: "bold", color: "#F8F8FF" }}>{data.post_title}</Text>
            </View>

            <View style={styles.tag}>
                <Text>{tag}</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#393E42"
    },
    usernameContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderWidth: 0.5,
        backgroundColor: "#303337",
        height: "10%",
        justifyContent: "center"
    },
    imageContainer: {
        marginTop: 5,
        width: "100%"
    },
    image: {
        aspectRatio: 1.5,
        resizeMode: "contain"
    },
    titleContainer: {
        width: "100%",
        marginTop: 10,
        marginHorizontal: 10
    },
    tag: {
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: "center",
        alignSelf: "flex-start",
        backgroundColor: "#e0e0e0",
        borderRadius: 16,
        paddingHorizontal: 20,
        height: 32,
        margin: 4,
        opacity: 1
    }
});
