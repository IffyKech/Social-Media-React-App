/**
 * Database query to insert a new tag if not already exists
 */
import * as SQLite from 'expo-sqlite';

export default function CreateTag(tagName) {
    /*
    * Creates a database transaction call to query a database
    */
    const db = SQLite.openDatabase("videotest3.db");
    db.transaction(tx => {
        tx.executeSql(
            'INSERT OR IGNORE INTO Tag(tag_name) VALUES (?)',
            [tagName],
            (txObj, data) => {console.log(data)},
            (transaction, error) => {console.log(error)}
        )
    })
}