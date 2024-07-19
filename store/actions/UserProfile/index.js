import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../config.json'
import {
    TASK_GET_PROFILE_DETAIL_START,
    TASK_GET_PROFILE_DETAIL_END,
    TASK_GET_PROFILE_DETAIL_ERROR
} from '../types'


export const GetProfileData = () => async (dispatch) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        dispatch({
            type: TASK_GET_PROFILE_DETAIL_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/users/user-details`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
        });
        const res = await response.json()
        console.log(res)
        dispatch({
            type: TASK_GET_PROFILE_DETAIL_END,
            payload: res?.data,
            loading: false,
        });
        return res
    }
    catch (error) {
        dispatch({
            type: TASK_GET_PROFILE_DETAIL_ERROR,
            loading: false,
        });
        console.log(error)
    }
}


export const UpdateProfileData = (data) => async (dispatch) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        const response = await fetch(`${baseUrl.baseUrl}/users/update/profile-info`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
            body: JSON.stringify(data)
        });
        const res = await response.json()
        console.log(res,'ok')
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export const UpdateProfile = (data) => async (dispatch) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        const response = await fetch(`${baseUrl.baseUrl}/users/update/profile-picture`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
            body: data
        });
        const res = await response.json()
        console.log(res,'ok')
        return res
    }
    catch (error) {
        console.log(error)
    }
}