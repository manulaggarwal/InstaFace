import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducers";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(initialState = {}) {
    console.log("Initial ", initialState);
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
}
