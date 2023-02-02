import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'domains/home/Home';
import Welcome from 'domains/welcome/Welcome';

import SignIn from 'domains/sign/SignIn';
import SignUp from 'domains/sign/SignUp';

import Select from 'domains/select/Select';
import Detail from 'domains/select/Detail';
import Write from 'domains/select/Write';

import Room from 'domains/room/Room';
import Create from 'domains/room/Create';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/select" element={<Select />} />
        <Route path="/select/:selectKey" element={<Detail />} />
        <Route path="/select/write" element={<Write />} />

        <Route path="/room" element={<Room />} />
        <Route path="/room/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
