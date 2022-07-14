/**
 * Returns Token of the key specified in params
 * @param {String} key - key of the Token attempting to be retrieved
 * @return {Promise} - value of the key found
 */
import * as SecureStore from 'expo-secure-store';

export default async function ReturnToken(key){
    return await SecureStore.getItemAsync(key);
}