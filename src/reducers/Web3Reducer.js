import { INCOME_FETCHED,USER_FETCHED,LEVEL_UPDATED } from '../actions/web3Actions';

export default function Web3Reducer(state = {
    user: {name:"",},
}, action) {
    switch (action.type) {
        case INCOME_FETCHED:
            return Object.assign({}, state, {
                incomes:action.income
            });
        case USER_FETCHED:
            console.log("redueeeee",action.user)            
            return {
                user:action.user,
            }
            case LEVEL_UPDATED:
                console.log("levelssss",action.levels)            
                return {
                    levels:action.levels
                }
        default:
            return state; 
    }
}
