import React from 'react';
import { Route } from 'react-router';
import App from './App';
export default (store) => {
    const requireAuth = (nextState, replace, callback) => {
        const { user: { authenticated } } = store.getState();
        if (!authenticated) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            });
        }
        callback();
    };

    const redirectAuth = (nextState, replace, callback) => {
        const { user: { authenticated } } = store.getState();
        if (authenticated) {
            replace({
                pathname: '/'
            });
        }
        callback();
    };
    return (
        <Route path="/" component={App}>

        </Route>
    );
}