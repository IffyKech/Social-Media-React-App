/**
 * Renders grid flatlist on Discover page
 * @param {String} activeFilter - tag name to filter posts by
 * @param {Array} data - array of objects of post data pulled from database
 * @param {Array} navigation - Stack navigator
 */
import React from 'react';
import * as SQLite from 'expo-sqlite';
import {FlatList, View, StyleSheet, Image, Pressable } from "react-native";

const FlatlistItem = ({data, navigation}) => {
    // relocate to the post page
    const navigatePage = () => {
        navigation.push("Post", { data: data });
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={navigatePage}>
                <Image style={{ width: "100%", height: "100%" }} source={{
                    uri: data.post_img_src
                }} />
            </Pressable>
        </View>
    );
}

const GridFlatlist = (props) => {
    const [gridData, updateGridData] = React.useState(null); // initialize grid data state

    // query post data from database
    const queryPosts = (filter) => {
        const db = SQLite.openDatabase("videotest3.db");

        if (filter !== undefined) {
           db.transaction(tx => {
               tx.executeSql(
                   "SELECT tag_id FROM Tag WHERE tag_name = (?)",
                   [filter],
                   (txObj, results) => {
                       tx.executeSql(
                           "SELECT * FROM Posts WHERE tag_id = (?)",
                           [results.rows._array[0].tag_id],
                           (txObj, results) => {updateGridData(results.rows._array)},
                           (transaction, error) => {console.log("Transaction: ", transaction, "\nError: ", error)}
                       );
                   },
                   (transaction, error) => {console.log("Transaction: ", transaction, "\nError: ", error)}
               );
           });
        } else {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM POSTS",
                    [],
                    (txObj, results) => {updateGridData(results.rows._array)}
                );
            });
        }
    }

    queryPosts(props.activeFilter); // update state variable with post data

    return(
        <FlatList data={gridData} renderItem={({item}) => (
            <FlatlistItem data={item} navigation={props.navigation} />
        )} keyExtractor={(item) => item.post_id} numColumns={3} />

    );
}

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: "32.3%",
        borderWidth: 0.5,
        borderColor: "#000",
        margin: 2,
    }
})

export default GridFlatlist;