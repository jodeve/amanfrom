import React from 'react'
import App from './App.tsx'
import './index.css'
import { render } from "react-dom";

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
