import { WINNERS_UPDATED } from '../actions/winnerActions';

export default function WinnerReducer(state = {
    winners: null,
}, action) {
    switch (action.type) {
        case WINNERS_UPDATED:
            return Object.assign({}, state, {
                winners: action.data
            });

        default:
            return state;
    }
}
