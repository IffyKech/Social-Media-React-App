/**
 * Database query to register a new user
 * @param {String} username - username to insert into the Users Table
 * @param {String} password - password to insert into the Users Table
 */
import * as SQLite from "expo-sqlite";

export default function Register(username, password) {
    const db = SQLite.openDatabase("videotest3.db");
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Users(user_name, user_password) VALUES (?, ?)',
            [username, password],
            (txObj, data) => {console.log(data)},
            (transaction, error) => {console.log(error)}
        );
    });
}