import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'domains/home/Home';
import Welcome from 'domains/welcome/Welcome';
import SignIn from 'domains/sign/SignIn';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
