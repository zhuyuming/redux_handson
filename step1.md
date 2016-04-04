# Viewの作成


## 1.はじめてのReact
まずはじめに、ビルドするディレクトリを変更します。webpack.config.jsの6行目を下記に変更してください。

```js
'./src/index'
```

変更したら、Ctrl+C で現在のサーバと監視状態を終了し、もう一度

```
npm start
```

を実行します。ページをリロードすると「はじめてのReact」とだけ出ていると思います。  
現在'src'ディレクトリの中身は'index.js'しか記述されておらず、残りは全て空ファイルの状態です。


## 2.主要な部品を配置していく
アプリの主要な部品として下記の4つがあります。

- 全体の部品を配置するコンポーネント
- ナビゲーションコンポーネント
- 一覧コンポーネント
- カートコンポーネント

この4つの部品を'components'配下にファイル別に記述していきます。

- **components/App.js**
 - アプリの部品を配置する役目を果たします。  
 - ナビゲーション、一覧、カートのコンポーネントをimportし、render()内にタグとして配置しています。  
 - Reactのrenderメソッドでは必ず単一のノードを返さなければいけないため、全体をdivでまとめます。また、タグの閉じ忘れに注意してください。

```js
import React, {Component} from 'react';

import Navigation from './Navigation'; // ナビゲーション
import ProductsList from './ProductsList'; // 商品リスト
import CartList from './CartList'; // カートリスト

// アプリケーション全体
export default class App extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <ProductsList />
                <CartList />
            </div>
        )
    }
}
```

- **components/Navigation.js**
 - アプリの表示を切り替えるナビゲーションです。後からhrefの中身は変更していきます。

```js
import React, { Component } from 'react'

// ナビゲーション
export default class Navigation extends Component {
    render(){
        return(
            <ul className="nav nav-tabs">
                <li><a href="#">一覧を見る</a></li>
                <li><a href="#">カートを見る</a></li>
            </ul>
        )
    }
}
```

- **components/ProductsList.js**
 - 商品一覧を表示します。後からここはReduxのデータと連携させます。

```js
import React, { Component } from 'react'

// 商品リスト全体
export default class ProductsList extends Component {
    render(){
        return(
            <table className="table">
                <tbody>
                    <tr>
                        <td>商品名1</td>
                        <td>1000円</td>
                        <td>
                            <button className="btn btn-primary">
                                カートに入れる
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>商品名2</td>
                        <td>1000円</td>
                        <td>
                            <button className="btn btn-primary">
                                カートに入れる
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
```

- **components/CartList.js**
 - カートを表示します。後からここはReduxのデータと連携させます。

```js
import React, { Component } from 'react'

// カート一覧
export default class CartList extends Component {
    render(){
        return(
            <table className="table">
                <tbody>
                    <tr>
                        <td>カート商品名1</td>
                        <td>1000円</td>
                        <td>
                            <button className="btn btn-danger">
                                カートから削除
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>カート商品名2</td>
                        <td>1000円</td>
                        <td>
                            <button className="btn btn-danger">
                                カートから削除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
  }
}
```

最後に、index.jsからは、部品全体を配置しているApp.jsをimportして表示します。
この状態では、アプリのデータは全てベタ書きの状態です。

- **index.js**
 - Appコンポーネントをインポートします。
 - 先ほど「はじめてのReact」と表示していた部分をAppコンポーネントに置き換えます。

```js
import React, {Component} from 'react';
import { render } from 'react-dom';

import App from './components/App'; // 追加

render(
    <App />, // 変更
    document.getElementById('root')
);
```


## 3.ルーティングを設定しよう

現在のレイアウトでは、1つのページに通常の一覧とカートの一覧が表示されています。  
この表示をURLによって切り替え、ナビゲーションからも操作が出来るようにしましょう。

- **components/App.js**
 - Reactのルーティングプラグイン、react-routerをインポートします。
 - 'ProductsList'と'CartList'のコンポーネントをタグでそのまま配置していたところを、react-routerの'Route'タグを使って指定します。
 - 'Navigation'はルーティングの条件に関係なく表示したいので、'Router'タグの外に記述します。
 - 'Redirect'タグではそのルーティングの範囲にてリダイレクトされる条件を指定できます。

```js
import React, {Component} from 'react';
import {Router, Route, Redirect} from 'react-router'; // 追加

import Navigation from './Navigation';
import ProductsList from './ProductsList';
import CartList from './CartList';

// アプリケーション全体
export default class App extends Component {
    render() {
        return (
            <div>
                {/* 変更ここから */}
                <Navigation />
                <Router>
                    <Route path="index" component={ProductsList} />
                    <Route path="cart" component={CartList} />
                    <Redirect from="*" to="index" />
                </Router>
                {/* 変更ここまで */}
            </div>
        )
    }
}
```

- **components/Navigation.js**
 - ナビゲーションを押下した時にもルーティングの変更が発生するよう、ナビゲーションのhref属性を変更します。

```js
import React, { Component } from 'react'

// ナビゲーション
export default class Navigation extends Component {
    render(){
        return(
            <ul className="nav nav-tabs">
                <li><a href="#/index">一覧を見る</a></li>{/* href内変更 */}
                <li><a href="#/cart">カートを見る</a></li>{/* href内変更 */}
            </ul>
        )
    }
}
```

- - -

[前のステップへ](README.md)｜[次のステップへ](step2.md)
