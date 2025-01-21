import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/Component/Home';
import Instraction from './assets/Component/Instraction';
import Capture from './assets/Component/Capture';
import SubmitOrRetake from './assets/Component/SubmitOrRetake';
import Avatar from './assets/Component/Avatar';
import Preview from './assets/Component/Preview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/instruction" element={<Instraction />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/submitorretake" element={<SubmitOrRetake />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
      
    </Router>
    // <>
    // <Home />
    // <Instraction />
    // <Capture />
    // <SubmitOrRetake />
    // <Avatar />
    // <Preview />
    // </>
  );
}

export default App;
