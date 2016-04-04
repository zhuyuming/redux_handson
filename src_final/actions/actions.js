// ActionTypes定数の参照
import * as types from '../ActionTypes/ActionTypes'

/*
 * Acttion Creators
 */

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

// 安い順にソートするか否かを切り替える
export function changeSortPrice(sortKey) {
    return {
        type : types.CHANGE_SORTPRICE,
        sortKey
    }
}
