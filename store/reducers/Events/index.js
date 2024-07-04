import {
    TASK_GET_ALLEVENTS_START,
    TASK_GET_ALLEVENTS_END,
    TASK_GET_ALLEVENTS_END_ERROR,
    TASK_GET_JOINED_EVENTS_START,
    TASK_GET_JOINED_EVENTS_END,
    TASK_GET_JOINED_EVENTS_END_ERROR,
    TASK_GET_MY_EVENT_START,
    TASK_GET_MY_EVENT_END,
    TASK_GET_MY_EVENT_END_ERROR,
    TASK_DELETE_EVENT_START,
    TASK_DELETE_EVENT_END,
    TASK_CREATE_EVENT_START,
    TASK_CREATE_EVENT_END
} from '../../actions/types'


const allEvent = {
    data: [],
    deleteEventLoading: false,
    EventCreateLoading: false,
    loading: false,
}

const joinedEvent = {
    data: [],
    loading: false,
}

const myEvent = {
    data: [],
    loading: false,
}

const AllEventReducer = (state = allEvent, action) => {
    switch (action.type) {
        case TASK_GET_ALLEVENTS_START:
            return {
                ...state,
                loading: action.loading,
            };

        case TASK_GET_ALLEVENTS_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case TASK_GET_ALLEVENTS_END_ERROR:
            return {
                ...state,
                loading: action.loading,
            };
        case TASK_DELETE_EVENT_START:
            return {
                ...state,
                deleteEventLoading: action.loading,
            };
        case TASK_DELETE_EVENT_END:
            return {
                ...state,
                deleteEventLoading: action.loading,
            };

        case TASK_CREATE_EVENT_START:
            return {
                ...state,
                EventCreateLoading: action.loading,
            };
        case TASK_CREATE_EVENT_END:
            return {
                ...state,
                EventCreateLoading: action.loading,
            };
        default:
            return state;
    }
};
const JoinedEventReducer = (state = joinedEvent, action) => {
    switch (action.type) {
        case TASK_GET_JOINED_EVENTS_START:
            return {
                ...state,
                loading: action.loading,
            };

        case TASK_GET_JOINED_EVENTS_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case TASK_GET_JOINED_EVENTS_END_ERROR:
            return {
                ...state,
                loading: action.loading,
            };
        default:
            return state;
    }
};
const MyEventReducer = (state = myEvent, action) => {
    switch (action.type) {
        case TASK_GET_MY_EVENT_START:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };

        case TASK_GET_MY_EVENT_END:
            return {
                ...state,
                data: action.payload,
                loading: action.loading,
            };
        case TASK_GET_MY_EVENT_END_ERROR:
            return {
                ...state,
                loading: action.loading,
            };

        default:
            return state;
    }
};

export { AllEventReducer, JoinedEventReducer, MyEventReducer }