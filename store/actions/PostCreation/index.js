import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    TASK_GET_CONNECTION_SEARCH_START,
    TASK_GET_CONNECTION_SEARCH_END,
    TASK_GET_CONNECTION_SEARCH_ERROR,
    TASK_INCLUDE_CONNECTION,
    TASK_POST_COMMNET_OFF,
    TASK_POST_COMMNET_COUNT_OFF,
    TASK_POST_LIKE_COUNT_OFF
} from '../types'
import baseUrl from '../../config.json'



export const SearchConnection = (body) => async (dispatch) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        dispatch({
            type: TASK_GET_CONNECTION_SEARCH_END,
        });
        dispatch({
            type: TASK_GET_CONNECTION_SEARCH_START,
            searchConnectionLoading: true,
            searchConnectionError: false
        });
        const response = await fetch(`${baseUrl.baseUrl}/connect/get-my-connections?search=${body}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`

            },
        });
        if (response.ok) {
            const res = await response.json()
            dispatch({
                type: TASK_GET_CONNECTION_SEARCH_END,
                searchConnectionLoading: false,
            });
            return res?.connections;
        }
        else {
            dispatch({
                type: TASK_GET_CONNECTION_SEARCH_ERROR,
                searchConnectionLoading: false,
                searchConnectionError: true
            });
        }
    }
    catch (error) {
        dispatch({
            type: TASK_GET_CONNECTION_SEARCH_ERROR,
            searchConnectionLoading: false,
            searchConnectionError: true
        });
        console.log(error)
    }
}
export const InclideConnection = (body) => async (dispatch) => {
    dispatch({
        type: TASK_INCLUDE_CONNECTION,
        searchConnectionData: body,
    });
}
export const ExludeConnection = (body) => async (dispatch, getState) => {
    const { searchConnectionData } = getState()?.PostCreationReducer;
    objectsArray = searchConnectionData.filter(obj => obj.user_id !== body?.user_id);
    dispatch({
        type: TASK_INCLUDE_CONNECTION,
        searchConnectionData: objectsArray,
    });
}
export const CommentSwitch = (body) => async (dispatch, getState) => {
    dispatch({
        type: TASK_POST_COMMNET_OFF,
        isCommentOff: body,
    });
}
export const CommentCountSwitch = (body) => async (dispatch, getState) => {
    dispatch({
        type: TASK_POST_COMMNET_COUNT_OFF,
        isCommentCount: body,
    });
}
export const LikeCountSwitch = (body) => async (dispatch, getState) => {
    dispatch({
        type: TASK_POST_LIKE_COUNT_OFF,
        isLikeCount: body,
    });
}

export const CreatePostFunction = (FormData) => async (dispatch) => {
    const Token = await AsyncStorage.getItem('Token');
    console.log(Token,FormData?.post_attachments);
    try {
        const response = await fetch(`${baseUrl.baseUrl}/events/create-event`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
            body: FormData
        });
        console.log(response,'beeelastic');
    }
    catch (error) {
        console.log(error,"oken")
        return "Internal Server Error"
    }
}