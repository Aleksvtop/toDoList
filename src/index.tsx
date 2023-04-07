import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createRoot} from "react-dom/client";
import AppWithReducers from "./AppWithReducers";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./components/state/store";

//ReactDOM.render(<App />,  document.getElementById('root'));
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<Provider store={store}><AppWithRedux/></Provider>)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
