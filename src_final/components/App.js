import React, {Component} from 'react';
import {Router, Route, Redirect} from 'react-router';

import Navigation from './Navigation';
import ProductsList from './ProductsList';
import CartList from './CartList';

// アプリケーション全体
export default class App extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <Router>
                    <Route path="index" component={ProductsList} />
                    <Route path="cart" component={CartList} />
                    <Redirect from="*" to="index" />
                </Router>
            </div>
        )
    }
}
