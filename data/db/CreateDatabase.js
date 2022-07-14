/*
 * Database query to create the database if not already existing
 */
import * as SQLite from 'expo-sqlite';

/*
* Creates a database transaction call to query a database
 */
export default function CreateDatabase() {
    const db = SQLite.openDatabase("videotest3.db"); // open the database file (creates if not already exists)
    const createUsersTable = "CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, user_password TEXT)";
    const createTagsTable = "CREATE TABLE IF NOT EXISTS Tag(tag_id INTEGER PRIMARY KEY AUTOINCREMENT, tag_name TEXT, UNIQUE(tag_name) )";
    const createPostsTable = "CREATE TABLE IF NOT EXISTS Posts(post_id INTEGER PRIMARY KEY AUTOINCREMENT, post_title TEXT, post_date TEXT, post_img_src TEXT, user_id INT, tag_id INTEGER," +
        "FOREIGN KEY(user_id) REFERENCES Users(user_id)," + "FOREIGN KEY(tag_id) REFERENCES Tag(tag_id) )";

    db.transaction(tx => {
        tx.executeSql(createUsersTable, null, () => {console.log("Initializing Users Table")}, (transaction, error) => {console.log("Error with Users:", error)},);
        tx.executeSql(createTagsTable, null, () => {console.log("Initializing Tags Table")}, (transaction, error) => {console.log("Error with Tags:", error)},);
        tx.executeSql(createPostsTable, null, () => {console.log("Initializing Posts Table")}, (transaction, error) => {console.log("Error with Posts:", error)},);
    });
}
