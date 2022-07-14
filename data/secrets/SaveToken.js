/**
 * Upload a new object to Secure Store
 * @param {String} key - key to upload
 * @param {String} value - value of the key to upload
 */
import * as SecureStore from 'expo-secure-store';

export default async function SaveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
}