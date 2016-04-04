import React, { Component } from 'react'
import { connect } from 'react-redux'

// アクションタイプを取り込む
import * as actions from '../actions/actions';

// カート内商品コンポーネント
class CartItem extends Component {
    render(){
        const {data} = this.props;
        return(
            <tr>
                <td>{data.name}</td>
                <td>{`${data.price}円`}</td>
                <td>
                    <button className="btn btn-danger" onClick={e => {this.props.btnClick(data.id)}}>
                        カートから削除
                    </button>
                </td>
            </tr>
        )
    }
}

// カート一覧
class CartList extends Component {

    // カートから削除する
    btnClick(id) {
        const {dispatch} = this.props;
        dispatch(actions.deleteCart(id));
    }

    render(){
        let {items} = this.props.products;

        // カートに入っているデータでフィルターする
        items = items.filter(item => item.cart);

        // データがない場合表示
        if (items.length) {
            return(
                <table className="table">
                    <tbody>
                        {
                            items.map(item => <CartItem data={item} btnClick={this.btnClick.bind(this)} key={item.id} />)
                        }
                    </tbody>
                </table>
            )
        }

        return(
            <p style={{marginTop : "10px"}}>カートにはまだ何も追加されていません。</p>
        )

  }
}

// ストア接続の関数でwrapしたコンポーネントにする
export default connect(state => state)(CartList);
