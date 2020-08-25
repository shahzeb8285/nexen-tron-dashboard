
export const USER_FETCHED = 'USER_FETCHED';
export const INCOME_FETCHED = 'INCOME_FETCHED';
export const LEVEL_UPDATED = 'LEVEL_UPDATED';

export function incomeFetched(income) {
    return (dispatch) => {
        dispatch({
            type: INCOME_FETCHED,
            income,

        });

    }
}

export function userFetched(user) {
    return (dispatch) => {
        dispatch({
            type: USER_FETCHED,
            user,

        });

    }
}



export function onLevelUpdated(levels) {
    return (dispatch) => {
        dispatch({
            type: LEVEL_UPDATED,
            levels

        });

    }
}