import React, { Component } from 'react'
import { connect } from 'react-redux'

// アクションタイプを取り込む
import * as actions from '../actions/actions';

// 商品行
class ProductItem extends Component {
    render(){
        const {data} = this.props;
        return(
            <tr>
                <td>{data.name}</td>
                <td>{`${data.price}円`}</td>
                <td>
                    <button className="btn btn-primary" disabled={data.cart} onClick={e => {this.props.btnClick(data.id)}}>
                        カートに入れる
                    </button>
                </td>
            </tr>
        )
    }
}

// 商品リスト全体
class ProductsList extends Component {

    // カートに追加する
    btnClick(id) {
        const {dispatch} = this.props;
        dispatch(actions.moveCart(id));
    }

    // 金額でソートする条件を変更する
    sortPriceChange(flag) {
        const {dispatch} = this.props;
        dispatch(actions.changeSortPrice(flag));
    }

    render(){
        let {items, sortKey} = this.props.products;

        // storeのデータをview側で加工する際は
        // 参照渡しのものを変更しないように注意する
        // そのためitemsをコピーしたものをソートする
        let newItems = Array.apply([], items);

        // 出力前に現在のキーでソートする
        newItems.sort((a, b) => {
            if ( a[sortKey] <= b[sortKey] ) {
              return -1;
            }
            return 1;
        });

        return(
            <div>
                <table className="table">
                    <tbody>
                        {
                            newItems.map(item => <ProductItem data={item} key={item.id} btnClick={this.btnClick.bind(this)} />)
                        }
                    </tbody>
                </table>
                <button className="btn btn-default" onClick={e => {this.sortPriceChange('price')}}>安い順に並びかえる</button>&nbsp;
                <button className="btn btn-default" onClick={e => {this.sortPriceChange('id')}}>順番を最初に戻す</button>
            </div>
        )
    }
}

// ストア接続の関数でwrapしたコンポーネントにする
export default connect(state => state)(ProductsList);
