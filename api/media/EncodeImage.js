/**
 * Image Encoder for any image file -> Blob
 * @param {string} file - uri path of the image to convert
 * @return {Promise} - Blob
 *
 */

const encodeImage = async (file) => {
    const response = await fetch(file);
    return await response.blob();
}

export default encodeImage;