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