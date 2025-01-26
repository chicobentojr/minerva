// import './style/main.css'
import './style/minerva.scss'

import { Route, Routes } from 'react-router';

import About from './pages/About.jsx';
import App from './pages/App.jsx'
import { BrowserRouter } from "react-router";
import Home from './pages/Home.jsx';
import Menu from './components/Menu/Menu.jsx';
import ReactDOM from "react-dom/client";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter basename='/minerva'>
    <Menu />
    <section>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/about" element={<About />} />


        <Route index path="/app" element={<App />} />
      </Routes>
    </section>
  </BrowserRouter>,
)
