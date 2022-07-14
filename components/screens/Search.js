/**
 * Renders search page
 * @param {Array} data - Post data sent from parent component
 * @param {Object} tags - Tags data sent from parent component
 * @param {Array} navigation - Stack Navigator
 */
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import * as SQLite from "expo-sqlite";
import SearchBarComponent from "../buttons/SearchBarComponent";


export default function Search({data, tags, navigiation}) {
    const [items, setItems] = React.useState([]); // initalize dropdown items state
    const [filter, setFilter] = React.useState(null); // initalize filter state
    const [newTags, setNewTags] = React.useState(tags); // set newTags state from parent component
    const [originalData, updateOriginalData] = React.useState(data); // set post data state from parent component
    const [refresh, setRefresh] = React.useState(false); // initialize refresh state

    // update filter state with new filter selected
    const handleFilter = (newFilter) => {
        if (newFilter === filter) { // if the same filter is selected
            setFilter(null); // reset filter state
        }
        else {
            setFilter(newFilter); // update filter with selected filter
        }
    }

    // Initialize dropdown items
    const processItems = (results) => {
        setNewTags(results); // set tags state with tag data from database

        let temp = [{ label: "", value: null}]; // set blank item
        for (let i=0; i < results.length; i++) {
            temp.push({label: String(results[i].tag_name), value: String(results[i].tag_name) }); // set item label and value
        }
        setItems(temp); // update item state with tag data
    }

    // reload data from database
    const reloadData = () => {
        const db = SQLite.openDatabase("videotest3.db");
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Posts",
                [],
                (txObj, results) => {updateOriginalData(results.rows._array)},
                (transaction, error) => {console.log("Error: ", error)}
            );
            tx.executeSql(
                "SELECT * FROM Tag",
                [],
                (txObj, results) => {processItems(results.rows._array)},
                (transaction, error) => {console.log("Error: ", error)}
            );
        });

    }

    // On press of refresh
    if (refresh) {
        setRefresh(false); // reset refresh
        reloadData();
    }

    // On page load
    React.useEffect(() => { // pull data
        reloadData();
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <SearchBarComponent newFilter={filter} items={items} handleFilter={handleFilter}
                                data={originalData} tags={newTags} navigation={navigiation} setRefresh={setRefresh}  />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#393E42"
    }
})