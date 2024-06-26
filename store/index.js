import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import RegisterUserReducer from "./reducers/UserRegister/index";
import OtpVerificationReducer from "./reducers/OptVerification";
import LoginReducer from "./reducers/UserLogin";
import { CheckInReducer, CityReducer,CountryReducer,StatesReducer} from "./reducers/Country";



const reducers = combineReducers({
  RegisterUserReducer,
  OtpVerificationReducer,
  LoginReducer,
  CountryReducer,
  StatesReducer,
  CityReducer,
  CheckInReducer
});

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));
export default store;

