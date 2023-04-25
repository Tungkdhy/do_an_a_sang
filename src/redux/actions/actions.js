export const GET_IMAGE_CCCD = "GET_IMAGE_CCCD";
export const GET_IMAGE_FACE = 'GET_IMAGE_FACE';
export const getImageCCCD = (payload) => {
    return {
        type: GET_IMAGE_CCCD,
        payload: payload,
    };
};
export const getImageFace = (payload) => {
    return {
        type: GET_IMAGE_FACE,
        payload: payload,
    };
};