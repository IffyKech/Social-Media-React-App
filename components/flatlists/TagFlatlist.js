/**
 * Renders tag flatlist on Discover page
 * @param {Function} updateFilter - Updates state variable with filter selected {String}
 * @param {String} activeFilter - Tag name of the current filter selected
 */
import React from "react";
import * as SQLite from 'expo-sqlite';
import {StyleSheet, Text, View, FlatList, Pressable} from "react-native";

const FlatlistItem = ({tag, updateFilter, activeFilter}) => {
    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Pressable onPress={() => updateFilter(tag)}>
                    {activeFilter === tag ? (
                        <Text style={styles.activeFilterText}>{tag}</Text>
                    ): (
                        <Text style={styles.inactiveFilterText}>{tag}</Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

const TagFlatlist = (props) => {
    const [tagData, setTagData] = React.useState(null); // initialize tag data state

    // query tag data from database
    const db = SQLite.openDatabase("videotest3.db");
    db.transaction(tx => {
        tx.executeSql(
            "SELECT * FROM Tag",
            [],
            (txObj, results) => {setTagData(results.rows._array)},
            (transaction, error) => {console.log("Error: ", error)}
        );
    });

    return(
        <FlatList data={tagData} renderItem={({item}) => (
            <FlatlistItem tag={item.tag_name} updateFilter={props.updateFilter} activeFilter={props.activeFilter} />
        )} keyExtractor={(item) => item.tag_id} horizontal={true} />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 25
    },
    textContainer: {
        justifyContent: "center",
        textAlign: "center",
        paddingVertical: 15
    },
    inactiveFilterText: {
        color: "#fff",
        fontSize: 20
    },
    activeFilterText: {
        color: "red",
        fontSize: 20
    }
});

export default TagFlatlist;