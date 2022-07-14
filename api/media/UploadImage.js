/**
 * Opens media gallery for users to upload a single image
 * @param {function} setImage - update state function that updates image uri
 */
import * as ImagePicker from 'expo-image-picker';

export default async function UploadImage(setImage) {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
    }); // holds location URI of an image picked

    if (!result.cancelled) { // if user cancels selection
        setImage(result.uri); // update the state function with the location uri of image
    }
}