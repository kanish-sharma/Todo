import { combineReducers } from "redux";
import * as types from "./actionTypes";

const initialState = {
  todo: [],
  error: null,
  loading: false,
};

const addTodo = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TODO_START:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_TODO_SUCCESS:
      return {
        ...state,
        todo: action.payload,
        loading: false,
      };
    case types.FETCH_TODO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.POST_TODO_START:
      return {
        ...state,
        loading: true,
      };
    case types.POST_TODO_SUCCESS:
      return {
        ...state,
        todo: [action.payload,...state.todo],
        loading: false,
      };
    case types.POST_TODO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.UPDATE_TODO_START:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_TODO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.DELETE_TODO_START:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todo: state.todo.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case types.DELETE_TODO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      default:
        return state;
  }
};

const rootReducer = combineReducers({
    data: addTodo,
})

export default rootReducer;
