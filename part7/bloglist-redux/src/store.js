import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import userlistReducer from "./reducers/userlistReducer";
import notificationReducer from "./reducers/notificationReducer";

import rootSaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    blogs: blogsReducer,
    user: userReducer,
    userlist: userlistReducer,
    notification: notificationReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
