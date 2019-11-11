import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore, Reducer, StoreEnhancer} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {refHandlerMiddleware} from "./referenceStoreConfiguration";
import rootSaga from "../redux/sagas";
import {ReduxStore} from "../utils/ReduxUtils";

export const configureStore = (reducer: Reducer) => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [thunkMiddleware, sagaMiddleware, refHandlerMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers: StoreEnhancer = composeWithDevTools(...enhancers);

    const store = createStore(reducer, undefined, composedEnhancers);

    const reduxStore = store.getState() as ReduxStore;

    sagaMiddleware.run(rootSaga, reduxStore);

    return store;
};