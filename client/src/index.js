import { AppContainer } from 'react-hot-loader';
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import './assets/style/main.scss'
import configureStore from './configureStore'
import { PersistGate } from 'redux-persist/integration/react'
const {store, persistor} = configureStore();
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </AppContainer>
    ,
     document.getElementById('root')
);

if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept();
}