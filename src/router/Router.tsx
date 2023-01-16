import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'domains/home/Home';
import Welcome from 'domains/welcome/Welcome';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
