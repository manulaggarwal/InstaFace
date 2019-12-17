import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Home, Account, Login } from './containers';
import { PageNotFound } from './components';
import { storeInstaAccessToken } from './util/instaUtil';

export default (store) => {

    const requireAuth = () => store.getState().userReducer.userDetails.isLogged ? true : false;

    const handleInstaAuth = routeProps => storeInstaAccessToken(routeProps.location.search);

    return (
        <Switch>
            <Route exact path="/" render={() => requireAuth() ? <Redirect to="/home"></Redirect> : <Redirect to="/login"></Redirect>}></Route>
            <Route path="/login" render={() => requireAuth() ? <Redirect to="/home"></Redirect> : <Login></Login>}></Route>
            <Route exact path="/account/:id" render={() => requireAuth() ? <Account></Account> : <Redirect to="/login"></Redirect>}></Route>
            <Route path="/home" render={() => requireAuth() ? <Home></Home> : <Redirect to="/login"></Redirect>} ></Route>
            <Route path="/auth/" render={routeProps => handleInstaAuth(routeProps) ? <Redirect to="/home"></Redirect> : null}></Route>
            <Route path="*" render={() => <PageNotFound></PageNotFound>}></Route>
        </Switch>
    );
}