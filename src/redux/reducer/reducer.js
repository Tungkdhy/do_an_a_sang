const { GET_IMAGE_CCCD, GET_IMAGE_FACE } = require("../actions/actions")

const initialState = {
    base64cccd:'',
    base64face:''
};

const userReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case GET_IMAGE_CCCD:
            return {
                ...state,
                base64cccd: action.payload
            }
        case GET_IMAGE_FACE:
            return {
                ...state,
                base64face: action.payload
            }
        default:
            return state
    }
}

export default userReducer;