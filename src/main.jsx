// import './style/main.css'
import './style/minerva.scss'

import { Route, Routes } from 'react-router';

import About from './pages/About.jsx';
import App from './pages/App.jsx'
import { BrowserRouter } from "react-router";
import { DataRawContext } from './contexts/DataContext.js';
import Home from './pages/Home.jsx';
import Menu from './components/Menu/Menu.jsx';
import ReactDOM from "react-dom/client";
import { loadData } from './services/config.js';

const root = document.getElementById("root");

const data = loadData();

ReactDOM.createRoot(root).render(
  <BrowserRouter basename='/minerva'>
    <DataRawContext.Provider value={data}>
      <Menu />
      <section>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/about" element={<About />} />
          <Route index path="/app" element={<App />} />
        </Routes>
      </section>
    </DataRawContext.Provider>
  </BrowserRouter>,
)
