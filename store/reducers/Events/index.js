import {
    TASK_GET_ALLEVENTS_START,
    TASK_GET_ALLEVENTS_END,
} from '../../actions/types'


const initState = {
    data: [],
    loading: false,
}

const AllEventReducer = (state = initState, action) => {
    switch (action.type) {
        case TASK_GET_ALLEVENTS_START:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case TASK_GET_ALLEVENTS_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        default:
            return state;
    }
};


export { AllEventReducer }