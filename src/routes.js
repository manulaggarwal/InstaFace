import React from 'react';
import { Route, Redirect } from 'react-router';
import { Home, Account, Login } from './containers';

export default (store) => {

    const requireAuth = () => store.getState().userReducer.userDetails.isLogged ? true : false;

    return (
        <div>
            <Route exact path="/" render={() => requireAuth() ? <Redirect to="/home"></Redirect> : <Redirect to="/login"></Redirect>}></Route>
            <Route path="/login" render={() => requireAuth() ? <Redirect to="/home"></Redirect> : <Login></Login>}></Route>
            <Route exact path="/account/:id" render={() => requireAuth() ? <Account></Account> : <Redirect to="/login"></Redirect>}></Route>
            <Route path="/home" render={() => requireAuth() ? <Home></Home> : <Redirect to="/login"></Redirect>} ></Route>
        </div>
    );
}