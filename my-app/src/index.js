import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/State';

let reRender = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} dispatch={store.dispatch.bind(store)} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

reRender(store.getState());
store.subscribe(reRender);