import { combineReducers } from 'redux'; // reducer関数をまとめるための関数

/*
 * Reducers
 */

// アクションタイプ定数を取り込む
import * as types from '../ActionTypes/ActionTypes';

// productsの初期データを定義
import productItems from '../data/initialItems';
const initialData = {
    items   : productItems, // 商品リスト
    sortKey : 'id' // ソートするキー
};

// 商品データ
function products(data = initialData, action) {

    let newData = Object.assign({}, data); // 新しいdataを返すために最初にコピー

    // action.typeで処理をフィルタする
    switch (action.type) {

        // 商品一覧を取得
        case types.GET_PRODUCTS:
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

        // ソートキーを変更する
        case types.CHANGE_SORTPRICE:
            newData.sortKey = action.sortKey;
            return newData;

        default:
            return data;
    }
}

// アプリケーションで利用するreducerを全て
// combineReducers関数へ渡し、管理するデータを定義
export default combineReducers({
    products
});
