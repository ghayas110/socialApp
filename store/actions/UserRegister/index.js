import baseUrl from '../../config.json'
import {
    TASK_REGISTER_START,
    TASK_REGISTER_COMPLETE,
    TASK_REGISTER_END,
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
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
            },
            body: JSON.stringify(body)
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


