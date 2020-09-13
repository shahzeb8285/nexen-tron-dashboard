import { PROFILE_UPDATED } from '../actions/profileActions';

export default function ProfileReducer(state = {
    profile: {},
}, action) {
    switch (action.type) {
        case PROFILE_UPDATED:
            return Object.assign({}, state, {
                profile: action.data
            });

        default:
            return state;
    }
}
