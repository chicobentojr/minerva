import { DataRawContext, TagsContext } from './contexts/DataContext.js';
import { Route, Routes } from 'react-router';
import { loadData, loadTags } from './services/config.js';

import About from './pages/About.jsx';
import { BrowserRouter } from "react-router";
import ChartsPage from './pages/ChartsPage.jsx';
import Home from './pages/Home.jsx';
import Menu from './components/Menu/Menu.jsx';
import TagsPage from './pages/TagsPage.jsx';
import { useState } from 'react';

function App() {
  // const data = loadData();
  const [tags, setTags] = useState(loadTags());
  const [data, setData] = useState(loadData());

  console.log('main data', data)


  return (
    <BrowserRouter basename='/minerva'>
      <DataRawContext.Provider value={{ data, setData }}>
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
