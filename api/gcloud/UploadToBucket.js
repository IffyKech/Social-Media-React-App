/**
 * Creates an API call to gcloud to upload image to storage
 * @constructor
 * @param {string} uri - the uri of the image picked from expo-image-picker
 * @param {string} tags - the tag associated with the post being made
 * @param {string} title - the title of the post being made
 * @param {function} setAlertModalVisible - state update function to update modal
 * @param {function} setActivityModalVisible - state update function to update modal
 */
import uuid from 'react-native-uuid';
import React from "react";
import encodeImage from "../media/EncodeImage";
import CreatePost from "../../data/db/CreatePost";

const UploadToBucket = async(uri, tags, title, setAlertModalVisible, setActivityModalVisible) => {
    // if any of the values passed are null
    if (uri == null || tags === "" || title === "") {
        setAlertModalVisible(true); // display the alert modal
    } else {
        const file = await encodeImage(uri); // convert image to blob
        const objectName = uuid.v4(); // unique identifier

        try {
            setActivityModalVisible(true); // display the activity modal
            // API request to cloud storage to upload image
            let request = await fetch("https://storage.googleapis.com/upload/storage/v1/b/fyp-test-images/o?uploadType=media&name=" + objectName, {
                method: "POST",
                headers: {
                    "Content-type": "image/png",
                    "Authorization": "Bearer ya29.a0ARrdaM8E34YAjRvA9BDRjzM4BxkfSU7T90iPe6Qm3KIaKBXGyLpIA6fyXgKW8pkWM5TCLt9Dh3BZ71pF6kTT6TYalzfMVZcMSf2Y1CZvch9lrA7-Q8nkJl4-1afDFCHGCbytCdohWWap1YbzXJaVAvc1GETY"
                },
                body: file
            });

            let response = await request;
            let jsonResponse = await request.json();
            let statusCode = response.status;

            if (statusCode === 200) { // successful request
                const bucketUri = "https://storage.googleapis.com/fyp-test-images/" + jsonResponse.name; // location of the newly uploaded image
                CreatePost(title, bucketUri, tags[0]);
                setActivityModalVisible(false);
                alert("Post Created!");
            }
            else {
                setActivityModalVisible(false);
                alert(`Error: ${statusCode} ${jsonResponse.error.message}`);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

export default UploadToBucket;