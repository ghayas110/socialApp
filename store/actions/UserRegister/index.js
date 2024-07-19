import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../config.json'
import {
    TASK_REGISTER_START,
    TASK_REGISTER_COMPLETE,
    TASK_REGISTER_END,
    TASK_AIRLINE_LOAD_START,
    TASK_AIRLINE_LOAD_END,
} from '../types'


export const insertUser = (body) => async (dispatch) => {
    try {
        dispatch({
            type: TASK_REGISTER_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-api-key': baseUrl.apiKey,
            },
            body: body
        });
        const res = await response.json()
        dispatch({
            type: TASK_REGISTER_COMPLETE,
            loading: false,
        });
        return res.message
    }
    catch (error) {
        dispatch({
            type: TASK_REGISTER_END,
            loading: false,
        });
        console.log(error)
    }
}

export const getAllAirline = () => async (dispatch) => {
    try {
        dispatch({
            type: TASK_AIRLINE_LOAD_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/airline/GetAllAirlines`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        dispatch({
            type: TASK_AIRLINE_LOAD_END,
            loading: false,
        });
        return res
    }
    catch (error) {
        dispatch({
            type: TASK_AIRLINE_LOAD_END,
            loading: false,
        });
        console.log(error)
    }
}


export const changePassword = (body) => async (dispatch) => {
    const Token = await AsyncStorage.getItem('Token');
    console.log(body)
    try {
        const response = await fetch(`${baseUrl.baseUrl}/users/change-password`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
            body: JSON.stringify(body)
        });
        const res = await response.json()
        console.log(res)
        return res?.message
    }
    catch (error) {
        console.log(error)
    }
}


