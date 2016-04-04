# Reducer

## 1.Reducerの基本

いよいよReduxの肝であるReducerです。Reducerは従来のStore(データモデル)とは少し違った性質を持っています。

- Reducerはactionから処理を受け、前のデータとactionのデータから、新しいデータを返す関数として実装します。
- Reducerは関数を分割する事により、アプリ内で複数存在できるが、最終的にcombineReducers関数で統合し、それがアプリのStoreとなります。
- Storeはアプリ内では必ず1つだけです。

実際にコードを見た方が理解が早いので、早速Reducerを作ってみましょう。

- **reducers/reducers.js** を下記のように変更します。

```js
import { combineReducers } from 'redux';
import * as types from '../ActionTypes/ActionTypes';

// productsの初期データ
const initialData = {
    items   : []
};

// 商品データ
function products(data = initialData, action) {

    let newData = Object.assign({}, data); // 新しいdataを返すために最初にコピー

    // action.typeで処理をフィルタする
    switch (action.type) {

        // ここにaction.typeごとにnewDataに対して処理を行い
        // newDataを返却する

        default:
            return data;
    }
}

// アプリで利用するReducerを全て統合、現状はproductsのみ
export default combineReducers({
    products
});
```

** 解説 **
- **const initialData = {...};**
 - products関数(Reducer)の data 引数に対する初期データです。
 - Reducer関数では必ず第1引数のデータに対する初期値が必要となります。

- **function products(){...}**
 - 商品データのReducer関数本体です。
 - 第1引数 → 変更前のデータ(初期値が必須)。第2引数 → actionのデータ。typeが必ずあり、それ以外はactionにより異なる。
 - dataは、一部だけ変更しても変更が検知されないので、Object.assign();などを使いコピーしたものを、次のswitch文の処理で返却する。
 - switch文で、action.typeごとに必要な処理を行い、最終的に新しいデータ(newData)をreturnで返却する。

- **export default combineReducers({...});***
 - Reducer関数を全てこの関数へ統合し、アプリのStoreとして定義します。(ここではproductsのみ)
 - この関数をexportしておき、最上位のコンポーネント(index.js)から後ほど呼び出します。


## 2.actionによるデータ処理を実装してReducerを完成させる

1.にて、Reducerのベースを作りましたが、actionを受け取り、新しいデータを変更する処理がまだ実装されていません。  
reducer.jsに追加で下記の変更を加えてください。

** 1.、商品一覧データをimport **

products関数の前に、下記の2行を追加してください。

```js
// 商品一覧のデータを外部jsから参照する
import productItems from '../data/initialItems';
```

** 2.actionの実装 **

products関数内のswitch内のこちらのコメント

```js
// ここにaction.typeごとにnewDataに対して処理を行い
// newDataを返却する
```

の部分を、下記に変更してください。

```js
// 商品一覧を取得
case types.GET_PRODUCTS:
    newData.items = productItems;
    return newData;

// カートへ移動する
case types.MOVE_CART:
    newData.items.forEach((item, i) => {
        if (action.id === item.id) {
            item.cart = true;
        }
    });
    return newData;

// カートから削除する
case types.DELETE_CART:
    newData.items.forEach((item, i) => {
        if (action.id === item.id) {
            item.cart = false;
        }
    });
    return newData;
```

** 解説 **

- ** 商品一覧を取得 **
 - ページが表示された際に一番最初に必要になるのが一覧のデータです。items配列に外部から取得した一覧データ'productItems'を設定しています。

- ** カートへ移動する **
 - 商品をカートへ移動します。このactionは商品を識別するために'action.id'があります。これを利用し、対象のデータの'cart'を'true'に変更します。

- ** カートから削除する **
 - 商品をカートから削除します。このactionは商品を識別するために'action.id'があります。これを利用し、対象のデータの'cart'を'false'に変更します。

- - -

これで必要なデータの準備が出来ました、次はView(見た目)との結合です。

[前のステップへ](step2.md)｜[次のステップへ](step4.md)
