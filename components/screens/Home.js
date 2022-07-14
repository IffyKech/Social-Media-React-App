/**
 * Page handler for the Discover and Search pages
 * @param {Function} signOut - Signout function from App
 * @param {Array} navigation - Stack Navigator
 */
import React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Discover from './Discover'
import Search from './Search'
import * as SQLite from 'expo-sqlite';

const Tabs = createMaterialBottomTabNavigator(); // initiate tabs for the screen

export default function Home({signOut, navigation}) {
    const [data, updateData] = React.useState(); // initalize post data state
    const [tags, updateTags] = React.useState(); // initialize tag data state

    // On page load
    React.useEffect(() => { // query post + tag data from database
        const db = SQLite.openDatabase("videotest3.db");
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Posts",
                [],
                (txObj, results) => {
                    updateData(results.rows._array)
                },
                (transaction, error) => {
                    console.log("Error: ", error)
                }
            );
            tx.executeSql(
                "SELECT * FROM Tag",
                [],
                (txObj, results) => {
                    updateTags(results.rows._array)
                },
                (transaction, error) => {
                    console.log("Error: ", error)
                }
            );
        });
    }, []);

    return(
        <Tabs.Navigator barStyle={{ backgroundColor: "#303337" }}>

            <Tabs.Screen name="Discover"
                         options={{tabBarIcon: ({color}) => (<Ionicons name="grid-outline" size={24} color={color} />)}} >
                { () => <Discover signOut={signOut} navigation={navigation} /> }
            </Tabs.Screen>

            <Tabs.Screen name="Search"
                         options={{tabBarIcon: ({color}) => (<FontAwesome name="list" size={24} color={color} />)}}>
                { () => <Search data={data} tags={tags} navigiation={navigation} /> }

            </Tabs.Screen>
        </Tabs.Navigator>
    )
}
