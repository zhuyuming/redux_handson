import React, {Component} from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App'; // Components
import reducer from './reducers/reducers'; // reducer
import { getAllProducts } from './actions/actions'; // actions

// middleware(logger)を利用する場合のStore
// import logger from 'redux-logger';
// const middleware = [ logger() ];
// const finalCreateStore = compose(
//     applyMiddleware(...middleware)
// )(createStore);
// const store = finalCreateStore(reducer);

// 通常のStore
const store = createStore(reducer);

// 初期データを取得しておく
store.dispatch(getAllProducts());

// アプリ全体を<Provider>でwrapし
// storeのデータをpropsで渡す
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
