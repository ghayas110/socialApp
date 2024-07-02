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
        console.log(body,'bodyy')
        const response = await fetch(`${baseUrl.baseUrl}/users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-api-key': baseUrl.apiKey,
            },
            body: body
        });
        console.log(response, 'pkkkk')
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
        console.log(error, "okkkk")
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