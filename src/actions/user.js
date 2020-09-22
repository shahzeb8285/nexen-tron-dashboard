export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin(data) {
    return {
        type: LOGIN_SUCCESS,
        data
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
    return (dispatch) => {
        localStorage.setItem('userId', creds.userId)

        dispatch(receiveLogin({userId:creds.userId}));

        // if (creds.email.length > 0 && creds.password.length > 0) {
        //     // localStorage.setItem('authenticated', true)
        //     localStorage.setItem('userId', cred.userId)

        // } else {
        //     dispatch(loginError('Something was wrong. Try again'));
        // }
    }
}
