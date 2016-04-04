# Store設計とActionの定義

## 1.Storeのデータ設計
ActionとReducerを作る前に、Storeのデータを設計する事を推奨します。  
下記の2点に考慮してStoreのデータ構造を考えます。

- View(Reactコンポーネント)は、このデータを使って表示する。
- Actionは、このデータに対して変更の処理を行う。

今回の一覧の場合だと、扱うデータが一覧の商品情報しかないので、現段階では下記のような構造を考えます。

```
{
    items : [
        {
            id    : 1,
            name  : "速習ECMAScript6: 次世代の標準JavaScriptを今すぐマスター！",
            price : 1500,
            cart  : false
        },
        ...個数分だけ繰り返す
    ]
}
```

**商品個別のデータ詳細**

key | 型 | 役割
--- | --- | ---
id | Number | Actionなどにおいて対象を識別する主キーとしての役割を果たす。リスト内で一意である必要がる。
name | String | 商品の名称を定義
price | Number | 商品の金額を定義
cart | Boolean | 商品がカートに入っている場合にtrue。デフォルトはfalse。


## 2.ActionTypes定数の作成

次に、このアプリに必要なデータ操作を洗い出します。これがアクションです。

- データを取得する(初回のみ)
- 商品をカートに移動する
- 商品をカートから削除する

これらのアクションを定数化(ActionTypes)しておきます。  
これは'Reducer'がアクションを受け取る時、どの'Action'が発行されたのか識別する為に利用します。  
この定数は、ストア内で一意である必要があります。

- **ActionTypes/ActionTypes.js** を下記のように変更します。

```js
export const GET_PRODUCTS      = 'GET_PRODUCTS'; // データを取得する(初回のみ)
export const MOVE_CART         = 'MOVE_CART'; // 商品をカートに移動する
export const DELETE_CART       = 'DELETE_CART'; // 商品をカートから削除する
```


## 3. Actionの作成

いよいよアクションの作成です。actionで一番重要な事は、データの変更は行わない、ただのオブジェクトだという事です。  
先ほど定義したアクションのtype定数と、actionが行う処理に必要なデータ、これらをオブジェクト形式で表したものがactionであり、そのオブジェクトを返却する関数をActionCreatorsと呼ぶようですが、実際にはあまり区別する事なくactionと呼んでしまう事が多いです。

- **actionの形式**
 - type属性は必須。それ以外は自由。(key1...はいくつあっても、なくても良い)

```js
{
  type : ActionTypes定数,
  key1 : data1,
  key2 : data2
  ...
}
```

- **actions/actions.js** を下記のように変更します。

```js
// ActionTypes定数の参照
import * as types from '../ActionTypes/ActionTypes'

// 商品一覧の取得
export function getAllProducts() {
    return {
        type : types.GET_PRODUCTS
    }
}

// 商品をカートへ移動する
export function moveCart(id) {
    return {
        type : types.MOVE_CART,
        id
  }
}

// 商品をカートから削除する
export function deleteCart(id) {
    return {
        type : types.DELETE_CART,
        id
  }
}
```

** 解説 **
- **import...(省略)...ActionTypes'**
 - 先ほど定義した'ActionTypes'定数のファイルをimportしておきます。
- **getAllProducts関数**
 - 商品一覧のデータを取得するアクションです。このアクションでは処理に必要な追加データがありません(一覧が欲しいという事だけ分かればOK)ので、type定数だけを返します。
- **moveCart関数**
 - 商品をカートへ移動するアクションです。このアクションではどの商品を移動したいのかという情報が必要になるので、商品の'id'も追加で返します。
- **deleteCart関数**
 - 商品をカートから削除するアクションです。このアクションも同様に、どの商品を削除したいのかという情報が必要になるので、商品の'id'も追加で返します。

- - -

[前のステップへ](step1.md)｜[次のステップへ](step3.md)
