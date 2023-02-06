import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
//import { store } from './app/store';
import myConfigureStore from './app/myStore';
//import App from './App';
import MyRecipeApp from './components/MyRecipeApp/MyRecipeApp';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = myConfigureStore();

// myConfigureStore

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyRecipeApp />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
