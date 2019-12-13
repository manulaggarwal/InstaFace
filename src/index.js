import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { Router } from 'react-router';
import createRoutes from './routes';
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";
import { createBrowserHistory } from 'history';
import './i18n';
import { fbInit, canUserAutoLogin, fetchUserDetails } from './util/fbInit';
import App from './App';

fbInit().then(() => {
    canUserAutoLogin().then(flag => {
        if (flag) {
            fetchUserDetails().then(initialStore => {
                load(initialStore);
            })
        } else load({});
    });
});

const load = (initialStore) => {
    const store = configureStore(initialStore);
    const routes = createRoutes(store);
    const history = createBrowserHistory();

    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <App>
                    {routes}
                </App>
            </Router>
        </Provider>,
        document.getElementById("root")
    );
};

// fbInit().then(init => {
//     console.log("Init ", init);
//     const initialStore = init;
//     console.log(initialStore);
//     const store = configureStore();
//     const routes = createRoutes(store);
//     const history = createBrowserHistory();

//     ReactDOM.render(
//         <Provider store={store}>
//             <Router history={history}>
//                 {routes}
//             </Router>
//         </Provider>,
//         document.getElementById("root")
//     );
// });



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
