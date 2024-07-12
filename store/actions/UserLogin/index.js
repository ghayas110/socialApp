import baseUrl from '../../config.json'
import {
    TASK_LOGIN_START,
    TASK_LOGIN_END,
} from '../types'


export const loginUser = (body) => async (dispatch) => {
    try {
        dispatch({
            type: TASK_LOGIN_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
            },
            body: JSON.stringify(body)
        });
        const res = await response.json()
        console.log(res)
        dispatch({
            type: TASK_LOGIN_END,
            loading: false,
        });
        return res
    }
    catch (error) {
        dispatch({
            type: TASK_LOGIN_END,
            loading: false,
        });
        console.log(error)
    }
}

export const CheckUserStatus = (body) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl.baseUrl}/users/get-approval-status`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
                'accesstoken':`Bearer ${body.Token}`
            },
        });
        const res = await response.json()
        console.log(res)
        return res
    }
    catch (error) {
        console.log(error)
    }
}