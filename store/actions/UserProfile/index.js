import baseUrl from '../../config.json'
import {
    TASK_GET_PROFILE_DETAIL_START,
    TASK_GET_PROFILE_DETAIL_END,
    TASK_GET_PROFILE_DETAIL_ERROR
} from '../types'


export const GetProfileData = () => async (dispatch) => {
    try {
        dispatch({
            type: TASK_GET_PROFILE_DETAIL_START,
            loading: true,
        });
        const response = await fetch(`${baseUrl.baseUrl}/users/user-details`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': baseUrl.apiKey,
            },
            body: JSON.stringify(body)
        });
        const res = await response.json()
        dispatch({
            type: TASK_GET_PROFILE_DETAIL_END,
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
