import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import blogService from "../services/blogs";
import loginService from "../services/login";

const delay = ms => new Promise(res => setTimeout(res, ms));

function* fetchAllBlogs() {
    try {
        const payload = yield call(blogService.getAll);
        yield put({ type: "INIT_SUCCESS", payload });
    } catch (err) {
        yield put({ type: "INIT_ERROR", message: err.message });
    }
}

function* watchInitialize() {
    yield takeLatest("INIT", fetchAllBlogs);
}

function* setUser(action) {
    try {
        const payload = yield call(loginService.login, action.credentials);
        window.localStorage.setItem("loggedInUser", JSON.stringify(payload));
        yield put({ type: "SET_USER_SUCCESS", payload });
    } catch (err) {
        yield put({ type: "SET_USER_ERROR", message: err.message });
    }
}

function* watchLogin() {
    yield takeEvery("SET_USER", setUser);
}

function* setNotification(action) {
    if (action.payload.isError) {
        yield put({ type: "SHOW_ERROR", msg: action.payload.msg });
    } else {
        yield put({ type: "SHOW_INFO", msg: action.payload.msg });
    }
    yield delay(action.payload.duration);
    yield put({ type: "HIDE" });
}

function* watchNotification() {
    yield takeEvery("SHOW_NOTIFICATION", setNotification);
}

export default function* rootSaga() {
    yield all([watchLogin(), watchInitialize(), watchNotification()]);
}
