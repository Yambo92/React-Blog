import { createStore, applyMiddleware, compose } from 'redux'
import {persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();
const middlewares = [];

let storeEnhancers;
if(process.env.NODE_ENV==="prodiction"){
    storeEnhancers = compose(
        applyMiddleware(...middlewares, sagaMiddleware)
    )
}else{
    storeEnhancers = compose(
        applyMiddleware(...middlewares, sagaMiddleware),
        (window && window.devToolsExtension) ? window.devToolsExtension() : (f) => f
    );
}

export default function configureStore(initialState={}) {
    const store = createStore(persistedReducer, initialState, storeEnhancers);
    let persistor = persistStore(store)
    sagaMiddleware.run(rootSaga);
    if(module.hot && process.env.NODE_ENV!== 'production'){
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer)
        })
    }
    return {store, persistor};
}