import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import instance from 'app/instance';
import Header from 'common/components/Header';
import GlobalInput from 'common/elements/GlobalInput';
import GlobalButton from 'common/elements/GlobalButton';
import SignUpNavi from 'domains/sign/components/SignUpNavi';
import SocialLoginButton from 'domains/sign/components/SocialLoginButton';
import { userStorage } from 'lib/utils/storage';
import { IconBack } from 'static/Icons/Icons';
import { FONT_S } from 'styles/textStyles';

const initialValue = {
  userId: '',
  password: '',
};

const SignIn = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState(initialValue);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userInfo.userId.length && !userInfo.password.length) {
      setError(false);
    }
    const { value, name } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await instance.post('/user/login', userInfo);
      userStorage.setStorage(data);
      window.location.replace('/');
    } catch (error) {
      setError(true);
      setUserInfo(initialValue);
    }
  };

  return (
    <>
      <Header>
        <IconBack handleClick={() => navigate(-1)} />
        <h1>로그인</h1>
      </Header>

      <StContainer>
        <StFormContainer onSubmit={handleClickLogin}>
          <GlobalInput
            name="userId"
            type="text"
            placeholder="아이디를 입력해주세요"
            maxLength={12}
            onChange={handleOnChange}
            isError={error}
          />
          <GlobalInput
            name="password"
            type="password"
            placeholder="패스워드를 입력해주세요"
            onChange={handleOnChange}
            isError={error}
          />
          <input type="submit" hidden />

          {error && <StErrorMsg>*아이디와 비밀번호를 확인해주세요</StErrorMsg>}
        </StFormContainer>

        <StButtonContainer>
          <GlobalButton onClick={handleClickLogin}>로그인</GlobalButton>
          <SocialLoginButton />
        </StButtonContainer>

        <SignUpNavi />
      </StContainer>
    </>
  );
};

export default SignIn;

const StContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.4rem;

  padding: 2rem;
`;

const StFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
`;

const StErrorMsg = styled.span`
  margin-left: 1.2rem;

  ${FONT_S}
  color: ${({ theme }) => theme.color.WARN};
`;

const StButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
`;
