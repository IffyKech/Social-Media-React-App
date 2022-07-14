/**
 * Renders Discover page
 * @param {Function} signOut - Signout function from App
 * @param {Array} navigation - Stack Navigator
 */
import React from "react";
import {Pressable, View, StyleSheet, SafeAreaView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import TagFlatlist from "../flatlists/TagFlatlist";
import GridFlatlist from "../flatlists/GridFlatlist";
import SignOut from "../buttons/SignOut";

export default function Discover({signOut, navigation}) {
    // relocate page to the upload page
    const navigatePage = () => {
        navigation.push("Upload");
    }

    const [filter, setFilter] = React.useState(undefined); // initialize filter state
    // update filter state with new filter selected
    const handleFilter = (newFilter) => {
        if (newFilter === filter) { // if the same filter is selected
            setFilter(undefined); // reset filter value
        }
        else {
            setFilter(newFilter); // set filter value to new filter selected
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <SignOut signOut={signOut} />
            <View style={styles.tagFlatlistContainer}>
                <TagFlatlist updateFilter={handleFilter} activeFilter={filter}  />
            </View>

            <View style={styles.contentGridContainer}>
                <GridFlatlist activeFilter={filter} navigation={navigation} />

                <View style={styles.postButtonContainer}>
                    <Pressable onPress={navigatePage}>
                        <AntDesign name="pluscircle" size={54} color="#fff" />
                    </Pressable>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#393E42"
    },
    tagFlatlistContainer: {
        backgroundColor: "#303337",
        marginVertical: 5
    },
    contentGridContainer: {
        flex: 1
    },
    postButtonContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        position: "absolute",
        bottom: 30,
        left: 310
    }
})
