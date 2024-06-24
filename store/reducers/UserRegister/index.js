import {
    TASK_REGISTER_START,
    TASK_REGISTER_COMPLETE,
    TASK_REGISTER_END,
} from '../../actions/types'


const initState = {
    data: "",
    loading: false,
}

const registerUserReducer = (state = initState, action) => {
    switch (action.type) {
        case TASK_REGISTER_START:
            return {
                ...state,
                loading: action.loading,
                data: action.payload,
            };
        case TASK_REGISTER_COMPLETE:
            return {
                ...state,
                loading: action.loading,
                data: action.payload,
            };
        case TASK_REGISTER_END:
            return {
                ...state,
                loading: action.loading,
                data: action.payload,
            };
        default:
            return state;
    }
};

export default registerUserReducer