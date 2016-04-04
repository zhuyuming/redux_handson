import React, { Component } from 'react'

// ナビゲーション
export default class Navigation extends Component {
    render(){
        return(
            <ul className="nav nav-tabs">
                <li><a href="#/index">一覧を見る</a></li>
                <li><a href="#/cart">カートを見る</a></li>
            </ul>
        )
    }
}
