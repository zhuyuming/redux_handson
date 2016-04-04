# View(React)への反映

## 1.StoreとViewの接続

前のステップでReducerは完成しました。次はView側でStoreを作成し、コンポーネントに接続します。  
Storeの作成とコンポーネントへの接続はアプリの最上位のコンポーネントをwrapする形で行います。

- **index.js** を下記のように変更します。

```js
import React, {Component} from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux'; // 追加
import { Provider } from 'react-redux'; // 追加

import App from './components/App';
import reducer from './reducers/reducers'; // 追加

// Storeの定義
const store = createStore(reducer); // 追加

// Providerコンポーネントを、Appの上位に追加
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

- ** const store = createStore(reducer); **
 - 前のステップで作成したReducer(combineReducers関数で定義)をimportします。
 - importしたReducerをReduxの'createStore'関数に通します。

- ** &lt;Provider store={store}&gt;...&lt;/Provider&gt; **
 - 最上位のコンポーネントをProviderコンポーネントでwrapし、store={store}で先ほど定義したstoreを渡します。
 - Providerコンポーネントは'react-redux'というReactとReduxを接続するプラグインであり、Reduxには含まれていません。

## 2.コンポーネントのpropsへStoreのデータを渡す

1.の手順でReactとReduxの接続は出来ましたが、コンポーネントへデータを渡すにはコンポーネントを'react-redux'のconnect関数に通します。  
これでコンポーネントのpropsに、Storeのデータが渡ってくるようになります。

- ** components/ProductsList.js ** の変更点

```js
export default class ProductsList extends Component {
```

を

```js
class ProductsList extends Component {
```

に変更し、それぞれProductsListクラスの前と後に追加。

ProductsListクラスの前に追加

```js
import { connect } from 'react-redux'
```

ProductsListクラスの後に追加

```js
export default connect(state => state)(ProductsList);
```

- - -

- ** components/CartList.js ** の変更点

```js
export default class CartList extends Component {
```

を

```js
class CartList extends Component {
```

に変更し、それぞれCartListクラスの前と後に追加。

CartListクラスの前に追加

```js
import { connect } from 'react-redux'
```

CartListクラスの後に追加

```js
export default connect(state => state)(CartList);
```

** 解説 **
- ** connect関数 **
 - 最下部に追加したconnect関数は'react-redux'プラグインの機能です。
 - state => state とアロー関数で stateをそのままreturnしてコンポーネントに渡しています。
 - stateのreturnをカスタマイズする事により、Storeの一部のデータを渡したり、キー名を変更して渡すなどが可能です。
 - (CartList)の部分に、コンポーネントのClassを指定します。

## 3.propsからデータを受け取る

2.で渡したStoreのデータをprops経由で受け取ります。  
先ほど connect関数で state => state と渡したので、Reducerの関数名(products)でコンポーネント側で受け取ります。  



//
