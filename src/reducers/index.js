import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import Web3Reducer from "./Web3Reducer"
import ProfileReducer from "./ProfileReducer"
import WinnerReducer from "./WinnerReducer"

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  Web3Reducer,
  ProfileReducer,
  WinnerReducer
});
