import { DataRawContext, TagsContext } from './contexts/DataContext.js';
import { Route, Routes } from 'react-router';

import About from './pages/About.jsx';
// import App from './pages/bkpApp.jsx'
import { BrowserRouter } from "react-router";
import ChartsPage from './pages/ChartsPage.jsx';
import Home from './pages/Home.jsx';
import Menu from './components/Menu/Menu.jsx';
import ReactDOM from "react-dom/client";
import TagsPage from './pages/TagsPage.jsx';
import { loadData } from './services/config.js';
import { useState } from 'react';

function App() {
  const data = loadData();
  const [tags, setTags] = useState([
    { label: "Amazon", match: "amazon" },
    { label: "Uber", match: "uber" },
    { label: 'Riacheulo', match: 'riachuelo' },
    { label: 'Ifood', match: 'ifood' },
    { label: 'Docelandia', match: 'docelandia' },
    { label: 'Kitanda', match: 'antoniaelisangela' },
    { label: 'Mercadinho', match: 'lvconveniencia' },
    { label: 'Cachorro Quente', match: 'betellanches' },
    { label: "Padaria", match: "delicia de pao" },
    { label: "Iskisita", match: "cirne irmaos" },
    { label: "Pizzaria", match: "house paraibano" },
    { label: "Kitanda 2", match: "kitanda" }
    // { label: "Outros", match: "" },
  ]);

  // 
  console.log('main data', data)


  return (
    <BrowserRouter basename='/minerva'>
      <DataRawContext.Provider value={data}>
        <TagsContext.Provider value={{ tags, setTags }}>
          <Menu />
          <section>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route index path="/charts" element={<ChartsPage />} />
              <Route index path="/tags" element={<TagsPage />} />

              <Route index path="/about" element={<About />} />
              <Route index path="/app" element={<App />} />
            </Routes>
          </section>
        </TagsContext.Provider>
      </DataRawContext.Provider>
    </BrowserRouter >
  )
}

export default App
