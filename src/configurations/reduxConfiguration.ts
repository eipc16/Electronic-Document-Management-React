import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore, Reducer, StoreEnhancer} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

export const configureStore = (reducer: Reducer) => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [thunkMiddleware, sagaMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers: StoreEnhancer = composeWithDevTools(...enhancers);

    return createStore(reducer, undefined, composedEnhancers);
};