/**
 * Developer function to delete a tag
 * @param {Number} tagIDToDelete - ID of the tag to delete
 */
import * as SQLite from 'expo-sqlite';

export default function DeleteTag(tagIDToDelete) {
    const db = SQLite.openDatabase("videotest3.db");
    db.transaction(tx => {
        tx.executeSql(
            "DELETE FROM Tag WHERE tag_id = (?)",
            [tagIDToDelete],
            (txObj, results) => {console.log("Transaction: ", txObj, "\nResults: ", results)},
            (transaction, error) => {console.log("Error: ", error)}
        );
    });
}