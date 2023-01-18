import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BasicModal from 'common/modal/BasicModal';
import { detectInAppBrowser, detectIphone } from 'lib/utils/deviceDetector';
import { userStorage } from 'lib/utils/storage';
import FullLogo from 'common/elements/FullLogo';

const Home = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (detectInAppBrowser(window.navigator.userAgent)) {
      //인앱일때
      //1. 아이폰이면 인앱 브라우저는 지원이 안된다는 모달을 띄운다.
      //2. 안드로이드라면 크롬으로 우회한다.
      if (detectIphone(window.navigator.userAgent)) {
        setModal(true);
      } else {
        window.location.href =
          'intent://www.gomgom.site#Intent;scheme=http;package=com.android.chrome;end)';
      }
    } else {
      //인앱이 아닐때
      //1. 로그인 상태라면 메인 화면으로 이동한다.
      //2. 비로그인 상태라면 온보딩 화면으로 이동한다.
      setTimeout(() => {
        if (userStorage.getToken()) {
          navigate('/select');
        } else {
          navigate('/welcome');
        }
      }, 1000);
    }
  }, []);

  return (
    <>
      {modal && (
        <BasicModal handleClick={() => setModal(false)}>
          아쉽게도 인앱브라우저는 지원이 안됩니다. <br />
          Safari 또는 Chrome으로 접속해주세요!
        </BasicModal>
      )}

      <StContainer>
        <FullLogo />
      </StContainer>
    </>
  );
};

export default Home;

const StContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;
