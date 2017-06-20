import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

///// testing imports
/////

document.addEventListener('DOMContentLoaded', () => {

let store;
if (window.currentUser) {
  const preloadedState = { session: { currentUser: window.currentUser } };
  store = configureStore(preloadedState);
  delete window.currentUser;
} else {
  store = configureStore();
}

//Window Testing Area
window.dispatch = store.dispatch;
window.getState = store.getState;
////////////////////

const root = document.getElementById('root');
ReactDOM.render(<Root store={store} />, root);
});
