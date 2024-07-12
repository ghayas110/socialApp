import {
    TASK_GET_PROFILE_DETAIL_START,
    TASK_GET_PROFILE_DETAIL_END,
    TASK_GET_PROFILE_DETAIL_ERROR,
} from '../../actions/types'


const userProfile = {
    loading: false,
    data: [],
    networkError: false
}

const GetUserProfile = (state = userProfile, action) => {
    switch (action.type) {
        case TASK_GET_PROFILE_DETAIL_START:
            return {
                ...state,
                loading: action.loading,
                networkError: action.networkError,
            };
        case TASK_GET_PROFILE_DETAIL_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case TASK_GET_PROFILE_DETAIL_ERROR:
            return {
                ...state,
                networkError: action.networkError,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export { GetUserProfile }