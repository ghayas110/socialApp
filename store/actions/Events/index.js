import { useEffect } from 'react';
import baseUrl from '../../config.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    TASK_GET_ALLEVENTS_START,
    TASK_GET_ALLEVENTS_END,
} from '../types'



export const getAllEvents = (body) => async (dispatch) => {
    const Token = await AsyncStorage.getItem('Token');
    try {
        dispatch({
            type: TASK_GET_ALLEVENTS_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/events/get-all-events`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken': `Bearer ${Token}`
            },
            body: JSON.stringify(body)
        });
        const res = await response.json()
        if (res.data) {
            dispatch({
                type: TASK_GET_ALLEVENTS_END,
                payload: res?.data,
                loading: false,
            });
            return response.ok
        }
        else{
            dispatch({
                type: TASK_GET_ALLEVENTS_END,
                payload: [],
                loading: false,
            });
        }
    }
    catch (error) {
        dispatch({
            type: TASK_GET_ALLEVENTS_END,
            loading: false,
        });
        console.log(error)
    }
}
