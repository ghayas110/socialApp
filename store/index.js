import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import RegisterUserReducer from "./reducers/UserRegister/index";
import OtpVerificationReducer from "./reducers/OptVerification";
import LoginReducer from "./reducers/UserLogin";


const reducers = combineReducers({
  RegisterUserReducer,
  OtpVerificationReducer,
  LoginReducer
});

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));
export default store;

