/**
 * Renders Dropdown Filter and SearchBar
 * @param {Array} data -  Array of objects of post data pulled from database
 * @param {Array} tags - Array of tags pulled from database
 */
import React from "react";
import {StyleSheet, View, TextInput, Pressable, Text} from "react-native";
import SearchPostsFlatlist from "../flatlists/SearchPostsFlatlist";
import DropdownFilter from "./DropdownFilter";
import * as SQLite from "expo-sqlite";
import BestFirstSort from "../../api/BestFirstSort";


const SearchBarComponent = (props) => {
    const [search, setSearch] = React.useState("");
    const [orderedData, setOrderedData] = React.useState(props.data); // set post data passed from parent component
    const [originalDataCopy, setOriginalDataCopy] = React.useState(orderedData); // copy of data
    const [activeFilter, setActiveFilter] = React.useState(null); // set active filter state
    const [tags, setTags] = React.useState(props.tags); // set tag data passed from parent component

    // onChangeText function for searchBar
    const searchOrder = (text) => {
        if (text) { // if text is inputted
            let newData = orderedData; // create copy of data
            assignTagsToPosts(tags, newData); // append tag name to posts
            newData = BestFirstSort(text, newData); // sort the data
            setOrderedData(newData); // update data state with sorted data
            setSearch(text); // update searchBar value with current text
        } else {
            setOrderedData(originalDataCopy); // reset the data to the original data copy
            setSearch(text);
        }
    }

    // retrieve posts from database
    const queryPosts = (filter) => {
        const db = SQLite.openDatabase("videotest3.db");

        if (filter === null || filter === undefined) {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM Posts",
                    [],
                    (txObj, results) => {setOrderedData(results.rows._array)},
                    (transaction, error) => {console.log("Error: ", error)}
                );
            });
        } else {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT tag_id FROM Tag WHERE tag_name = (?)",
                    [filter],
                    (txObj, results) => {
                        tx.executeSql(
                            "SELECT * FROM Posts WHERE tag_id = (?)",
                            [results.rows._array[0].tag_id],
                            (txObj, results) => {setOrderedData(results.rows._array)},
                            (transaction, error) => {console.log("Transaction: ", transaction, "\nError: ", error)}
                        );
                    },
                    (transaction, error) => {console.log("Transaction: ", transaction, "\nError: ", error)}
                );
            });
        }
    }

    // append tag names to posts data
    const assignTagsToPosts = (tags, posts) => {
        for (let p=0; p < posts.length; p++) {
            for (let t=0; t < tags.length; t++) {
                if (posts[p].tag_id === tags[t].tag_id) {
                    posts[p].tag_name = tags[t].tag_name;
                }
            }
        }
    }

    if (props.newFilter !== activeFilter) { // if a new filter is selected
        setActiveFilter(props.newFilter); // update filter value
        queryPosts(props.newFilter); // update posts data with new filter selected
    }

    // rerender page data
    const rerender = () => {
        const db = SQLite.openDatabase("videotest3.db");
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Posts",
                [],
                (txObj, results) => {setOrderedData(results.rows._array)},
                (transaction, error) => {console.log("Error: ", error)}
            );
        });
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Tag",
                [],
                (txObj, results) => {setTags(results.rows._array)},
                (transaction, error) => {console.log("Error: ", error)}
            );
        });
        props.setRefresh(true); // update state variable to reload component
    }

    return(
        <View>
            <View style={styles.flatlistContainer}>
                <View style={styles.searchFlatlist}>
                    <SearchPostsFlatlist data={orderedData} navigation={props.navigation} />
                </View>
            </View>

            <View style={styles.searchRow}>
                <View style={styles.filterContainer}>
                    <DropdownFilter items={props.items} updateFilter={props.handleFilter}  />
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.search}>
                        <TextInput placeholder="Type here..." style={styles.searchBar} placeholderTextColor="#7C8893"
                                   onChangeText={(text) => searchOrder(text) } value={search}
                        />
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Pressable onPress={rerender}>
                            <Text style={{color: "#fff"}}>Refresh</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchRow : {
        flexDirection: "row",
        position: "absolute",
        width: "100%"
    },
    filterContainer: {
        width: "30%",
        justifyContent: "center",
        marginLeft: 5
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginRight: 5,
        width: "70%"
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#303337",
        margin: 10
    },
    searchBar: {
        justifyContent: "center",
        height: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: "#fff"
    },
    flatlistContainer: {
        top: 60
    },
    searchFlatlist: {
        marginBottom: 50
    }
});

export default SearchBarComponent;