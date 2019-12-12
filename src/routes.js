import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './App';
import { Home, Account } from './containers';
export default (store) => {
    const requireAuth = () => {
        const isLoggedIn = store.getState().userReducer.userDetails.isLogged || false;
        if (isLoggedIn) {
            return true;
        }
        return false;
    };
    return (
        <Route path="/" component={App}>
            <Route path="/" component={App}></Route>
            <Route path="/home" render={() => requireAuth() ? <Home></Home> : <Redirect to="/"></Redirect>} ></Route>
            <Route path="/account" render={() => requireAuth() ? <Account></Account> : <Redirect to="/"></Redirect>}></Route>
        </Route>
    );
}