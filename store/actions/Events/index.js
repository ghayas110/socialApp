import baseUrl from '../../config.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    TASK_CREATE_EVENT_END,
    TASK_JOIN_EVENT_START,
    TASK_JOIN_EVENT_END,
    TASK_LEAVE_EVENT_START,
    TASK_LEAVE_EVENT_END
} from '../types'



export const getAllEvents = ({ page, refreash }) => async (dispatch, getState) => {
    const Token = await AsyncStorage.getItem('Token');
    const state = getState();
    try {
        if (page <= 1) {
            dispatch({
                type: TASK_GET_ALLEVENTS_START,
                loading: true,
            });
        }
        const response = await fetch(`${baseUrl.baseUrl}/events/get-all-events/${page}/10`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
        });
        const res = await response.json()
        if (res?.data) {
            const combinedArray = [...state?.AllEventReducer?.data, ...res?.data].reduce((acc, current) => {
                const x = acc.find(item => item?.event_id === current?.event_id);
                if (!x) {
                    acc.push(current);
                }
                return acc;
            }, []);
            if (refreash == true) {
                dispatch({
                    type: TASK_GET_ALLEVENTS_END,
                    payload: res?.data,
                    loading: false,
                });
                return response.ok
            }
            else if (refreash == false) {
                dispatch({
                    type: TASK_GET_ALLEVENTS_END,
                    payload: combinedArray,
                    loading: false,
                });
                return response.ok
            }
        }
        else if (res.message == 'No Events Found') {
            dispatch({
                type: TASK_GET_ALLEVENTS_END,
                payload:[],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: TASK_GET_ALLEVENTS_END_ERROR,
            loading: false,
        });
        console.log(error)
    }
}

export const getJoinedEvents = ({ page, refreash }) => async (dispatch, getState) => {
    const Token = await AsyncStorage.getItem('Token');
    const state = getState();
    try {
        if (page <= 1) {
            dispatch({
                type: TASK_GET_JOINED_EVENTS_START,
                loading: true,
            });
        }
        const response = await fetch(`${baseUrl.baseUrl}/events/events-joined-by-user/${page}/10`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
        });
        const res = await response.json()
        if (res?.events) {
            const combinedArray = [...state?.JoinedEventReducer?.data, ...res?.events].reduce((acc, current) => {
                const x = acc.find(item => item?.event_id === current?.event_id);
                if (!x) {
                    acc.push(current);
                }
                return acc;
            }, []);
            if (refreash == true) {
                dispatch({
                    type: TASK_GET_JOINED_EVENTS_END,
                    payload: res?.events,
                    loading: false,
                });
                return response.ok
            }
            else if (refreash == false) {
                dispatch({
                    type: TASK_GET_JOINED_EVENTS_END,
                    payload: combinedArray,
                    loading: false,
                });
                return response.ok
            }
        }
        else {
            dispatch({
                type: TASK_GET_JOINED_EVENTS_END_ERROR,
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: TASK_GET_JOINED_EVENTS_END_ERROR,
            loading: false,
        });
        console.log(error)
    }
}

export const getMyEvents = ({ page, refreash }) => async (dispatch, getState) => {
    const Token = await AsyncStorage.getItem('Token');
    const state = getState();
    try {
        if (page <= 1) {
            dispatch({
                type: TASK_GET_MY_EVENT_START,
                loading: true,
            });
        }
        const response = await fetch(`${baseUrl.baseUrl}/events/get-events-created-by-user/${page}/10`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
        });
        const res = await response.json()
        if (res?.data) {
            const combinedArray = [...state?.MyEventReducer?.data, ...res?.data].reduce((acc, current) => {
                const x = acc.find(item => item?.event_id === current?.event_id);
                if (!x) {
                    acc.push(current);
                }
                return acc;
            }, []);
            if (refreash == true) {
                dispatch({
                    type: TASK_GET_MY_EVENT_END,
                    payload: res?.data,
                    loading: false,
                });
                return response.ok
            }
            else if (refreash == false) {
                dispatch({
                    type: TASK_GET_MY_EVENT_END,
                    payload: combinedArray,
                    loading: false,
                });
                return response.ok
            }
        }
        else if (res.message == 'No Events Found') {
            dispatch({
                type: TASK_GET_MY_EVENT_END,
                payload:[],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: TASK_GET_MY_EVENT_END_ERROR,
            loading: false,
        });
        console.log(error)
    }
}

export const getEventDetail = ({ id }) => async (dispatch, getState) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        const response = await fetch(`${baseUrl.baseUrl}/events/get-event-details/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
        });
        const res = await response.json()
        if (res?.data) {
            return res?.data
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const DeleteEvent = (id) => async (dispatch, getState) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        dispatch({
            type: TASK_DELETE_EVENT_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/events/delete-event/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
        });
        const res = await response.json()
        if (res.message == "Event deleted successfully") {
            dispatch({
                type: TASK_DELETE_EVENT_END,
                loading: false,
            });
            return true
        }
        return false
    }
    catch (error) {
        dispatch({
            type: TASK_DELETE_EVENT_END,
            loading: false,
        });
        console.log(error)
    }
}

export const CreateEvent = (FormData) => async (dispatch, getState) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        dispatch({
            type: TASK_CREATE_EVENT_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/events/create-event`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
            body: FormData
        });
        const res = await response.json()
        if (res.message == "Event created successfully") {
            dispatch({
                type: TASK_CREATE_EVENT_END,
                loading: false,
            });
            return true
        }
        else {
            dispatch({
                type: TASK_CREATE_EVENT_END,
                loading: false,
            });
            return false
        }
    }
    catch (error) {
        dispatch({
            type: TASK_CREATE_EVENT_END,
            loading: false,
        });
        console.log(error)
    }
}

export const JoinEvents = (body) => async (dispatch, getState) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        dispatch({
            type: TASK_JOIN_EVENT_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/events/join-event`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
            body: JSON.stringify(body)
        });
        const res = await response.json()
        if (res.message == "Event joined successfully") {
            dispatch({
                type: TASK_JOIN_EVENT_END,
                loading: false,
            });
            return true
        }
        return false
    }
    catch (error) {
        dispatch({
            type: TASK_JOIN_EVENT_END,
            loading: false,
        });
        console.log(error)
    }
}

export const LeaveEvents = (body) => async (dispatch, getState) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        dispatch({
            type: TASK_LEAVE_EVENT_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/events/leave-event`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
            body: JSON.stringify(body)
        });
        const res = await response.json()
        if (res.message == "Event Left successfully") {
            dispatch({
                type: TASK_LEAVE_EVENT_END,
                loading: false,
            });
            return true
        }
        return false
    }
    catch (error) {
        dispatch({
            type: TASK_LEAVE_EVENT_END,
            loading: false,
        });
        console.log(error)
    }
}


