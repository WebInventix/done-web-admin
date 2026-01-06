import React from 'react'
import Home from './pages/Home'
import { Provider } from "react-redux";
import { RouterApp } from './config/router/RouterApp'
import store from './store/store';
import './config/i18n_config/i18n'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Provider store={store}>
            <RouterApp />
        </Provider>

    )
}

export default App