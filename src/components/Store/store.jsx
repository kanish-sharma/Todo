import { createLogger } from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import rootSaga from "./saga";



const loggerMiddleware = createLogger();

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, loggerMiddleware];

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;