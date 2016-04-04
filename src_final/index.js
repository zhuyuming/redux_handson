import React, {Component} from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers/reducers'; // reducer
import App from './components/App'; // Components

// middleware(logger)を利用する場合のStore
// import logger from 'redux-logger';
// const middleware = [ logger() ];
// const finalCreateStore = compose(
//     applyMiddleware(...middleware)
// )(createStore);
// const store = finalCreateStore(reducer);

// 通常のStore
const store = createStore(reducer);

// アプリ全体を<Provider>でwrapし
// storeのデータをpropsで渡す
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
