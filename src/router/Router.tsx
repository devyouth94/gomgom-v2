import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'domains/home/Home';
import Welcome from 'domains/welcome/Welcome';
import SignIn from 'domains/sign/SignIn';
import SignUp from 'domains/sign/SignUp';
import Select from 'domains/select/Select';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/select" element={<Select />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
