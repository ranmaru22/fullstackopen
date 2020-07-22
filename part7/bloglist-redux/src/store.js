import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

import rootSaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    blogs: blogsReducer,
    user: userReducer,
    notification: notificationReducer
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
