import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import blogService from "../services/blogs";
import loginService from "../services/login";

const delay = ms => new Promise(res => setTimeout(res, ms));

function* fetchAllBlogs() {
    try {
        const payload = yield call(blogService.getAll);
        yield put({ type: "INIT_BLOGS_SUCCESS", payload });
    } catch (err) {
        yield put({ type: "INIT_BLOGS_ERROR", message: err.message });
    }
}

function* watchInitialize() {
    yield takeLatest("INIT_BLOGS", fetchAllBlogs);
}

function* addNewBlog(action) {
    try {
        const payload = yield call(blogService.create, action.newBlog, action.token);
        yield put({ type: "ADD_BLOG_SUCCESS", payload });
    } catch (err) {
        yield put({ type: "ADD_BLOG_ERROR", message: err.message });
    }
}

function* watchCreateBlog() {
    yield takeLatest("ADD_BLOG", addNewBlog);
}

function* deleteBlog(action) {
    try {
        yield call(blogService.destroy, action.id, action.token);
        yield put({ type: "DEL_BLOG_SUCCESS", id: action.id });
    } catch (err) {
        yield put({ type: "ADD_BLOG_ERROR", message: err.message });
    }
}

function* watchDeleteBlog() {
    yield takeLatest("DEL_BLOG", deleteBlog);
}

function* likeBlog(action) {
    try {
        const payload = yield call(blogService.update, action.id, action.patch, action.token);
        yield put({ type: "LIKE_BLOG_SUCCESS", payload });
    } catch (err) {
        yield put({ type: "LIKE_BLOG_ERROR", message: err.message });
    }
}

function* watchLikeBlog() {
    yield takeLatest("LIKE_BLOG", likeBlog);
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
    yield all([
        watchLogin(),
        watchInitialize(),
        watchCreateBlog(),
        watchDeleteBlog(),
        watchLikeBlog(),
        watchNotification()
    ]);
}
