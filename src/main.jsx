// TODO: this increase bundle size
import 'chart.js/auto';
import './style/minerva.scss'

import { Route, Routes } from 'react-router';

import About from './pages/About.jsx';
import App from './pages/App.jsx'
import { BrowserRouter } from "react-router";
import ChartsPage from './pages/ChartsPage.jsx';
import { DataRawContext } from './contexts/DataContext.js';
import Home from './pages/Home.jsx';
import Menu from './components/Menu/Menu.jsx';
import ReactDOM from "react-dom/client";
import { loadData } from './services/config.js';

const root = document.getElementById("root");

const data = loadData();

console.log('main data', data)

ReactDOM.createRoot(root).render(
  <BrowserRouter basename='/minerva'>
    <DataRawContext.Provider value={data}>
      <Menu />
      <section>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/charts" element={<ChartsPage />} />

          <Route index path="/about" element={<About />} />
          <Route index path="/app" element={<App />} />
        </Routes>
      </section>
    </DataRawContext.Provider>
  </BrowserRouter>,
)
