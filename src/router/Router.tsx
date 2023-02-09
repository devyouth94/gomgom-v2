import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'domains/home/Home';
import Welcome from 'domains/welcome/Welcome';

import SignIn from 'domains/sign/SignIn';
import SignUp from 'domains/sign/SignUp';
import GoogleRedirect from 'domains/sign/GoogleRedirect';

import Select from 'domains/select/Select';
import Detail from 'domains/select/Detail';
import Write from 'domains/select/Write';

import Room from 'domains/room/Room';
import Create from 'domains/room/Create';

import Answer from 'domains/answer/Answer';

import MyPage from 'domains/mypage/MyPage';
import MySelectContents from 'domains/mypage/MySelectContents';
import MyRoomContents from 'domains/mypage/MyRoomContents';
import KakaoRedirect from 'domains/sign/KakaoRedirect';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/api/auth/google/callback" element={<GoogleRedirect />} />
        <Route path="/api/auth/kakao/callback" element={<KakaoRedirect />} />

        <Route path="/select" element={<Select />} />
        <Route path="/select/:selectKey" element={<Detail />} />
        <Route path="/select/write" element={<Write />} />

        <Route path="/room" element={<Room />} />
        <Route path="/room/create" element={<Create />} />

        <Route path="/answer" element={<Answer />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/postvoted" element={<MySelectContents />} />
        <Route path="/mypage/voted" element={<MySelectContents />} />
        <Route path="/mypage/maderoom" element={<MyRoomContents />} />
        <Route path="/mypage/operatingroom" element={<MyRoomContents />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
