import {takeLatest, call, all, fork, put} from "redux-saga/effects";
import * as types from "./actionTypes";
import { apiDelete, apiGet, apiPost, apiUpdate } from "./api";

//Worker
export function* loadTodoAsync(){
    try{
        const response = yield call(apiGet);
        yield put({ type: types.FETCH_TODO_SUCCESS, payload: response.data})
    }catch (error) {
        yield put ({type: types.FETCH_TODO_FAIL, payload: error});
    }
}

export function* postTodoAsync({payload}){
    try{
        const response = yield call(apiPost, payload);
        yield put({ type: types.POST_TODO_SUCCESS, payload: response.data})
    }catch (error) {
        yield put ({type: types.POST_TODO_FAIL, payload: error});
    }
}

export function* updateTodoAsync({payload}){
    try{
        const response = yield call(apiUpdate, payload);
        yield put({ type: types.UPDATE_TODO_SUCCESS, payload: response.data})
        yield call(loadTodoAsync);
    }catch (error) {
        yield put ({type: types.UPDATE_TODO_FAIL, payload: error});
    }
}

export function* deleteTodoAsync({payload}){
    try{
        const response = yield call(apiDelete, payload.id);
        yield put({ type: types.DELETE_TODO_SUCCESS, payload: response.data});
        yield call(loadTodoAsync);
    }catch (error) {
        yield put ({type: types.DELETE_TODO_FAIL, payload: error});
    }
}

export function* loadTodo() {
    yield takeLatest(types.FETCH_TODO_START,loadTodoAsync);
    yield takeLatest(types.POST_TODO_START, postTodoAsync);
    yield takeLatest(types.UPDATE_TODO_START, updateTodoAsync);
    yield takeLatest(types.DELETE_TODO_START,deleteTodoAsync);
}

const todoSaga = [fork(loadTodo)];

export default function* rootSaga(){
    yield all([...todoSaga]);
}
