import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import RegisterUserReducer from "./reducers/UserRegister/index";

const reducers = combineReducers({
  RegisterUserReducer,
});

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));
export default store;

