/**
 * Database query to create a post
 * @param {String} title - title of the post to create
 * @param {String} uri - uri of the image location
 * @param {String} tag - tag name of the tag to append
 */

import * as SQLite from 'expo-sqlite';
import CreateTag from "./CreateTag";
import * as SecureStorage from 'expo-secure-store';


export default async function CreatePost(title, uri, tag) {
    let userID = await SecureStorage.getItemAsync("userToken"); // retrieve userID from secure storage
    CreateTag(tag); // create the tag if it does not already exist
    let date = `${new Date().getUTCDay()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}`; // current date in: DD/MM/YYYY

    /*
    * Creates a database transaction call to query a database
    */
    const db = SQLite.openDatabase("videotest3.db");
    db.transaction(tx => {
        tx.executeSql(
            "SELECT tag_id FROM Tag WHERE tag_name = (?)",
            [tag],
            async (txObj, results) => {
                let tagID = results.rows._array[0].tag_id;
                tx.executeSql(
                    "INSERT INTO POSTS(post_title, post_date, post_img_src, user_id, tag_id) VALUES (?, ?, ?, ?, ?)",
                    [title, date, uri, userID, tagID],
                    (txObj, results) => {console.log("Post Created")},
                    (transaction, error) => {console.log("Error: ", error)}
                );
            },
            (transaction, error) => {console.log("Error: ", error)}
        );
    });
}