import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {BrowserRouter} from "react-router-dom";


const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
const Theme = {
    colors: {
        dark: "#090923",
        middle: "#262633",
        light:"white",

    }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <ThemeProvider theme={Theme}>
                <Global/>
                <App/>
            </ThemeProvider>
        </React.StrictMode>
    </BrowserRouter>
);


