// TODO: this increase bundle size
import 'chart.js/auto';
import './style/minerva.scss'

import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { loadData } from './services/config.js';
import { useState } from 'react';

const root = document.getElementById("root");

// const data = loadData();

// console.log('main data', data)


// const [tags, setTags] = useState([]);
// const value = { tags, setTags };

ReactDOM.createRoot(root).render(<App />)
