import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import instance from 'app/instance';
import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import Header from 'common/components/Header';
import GlobalButton from 'common/elements/GlobalButton';
import GlobalInput from 'common/elements/GlobalInput';
import SignModalState from 'domains/sign/components/SignModalState';
import useSignUpInput from 'domains/sign/hooks/useValidate';
import { IconBack } from 'static/Icons/Icons';
import { FONT_BOLD, FONT_S } from 'styles/textStyles';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { signUpInfo, validateInfo, handleOnChange } = useSignUpInput();

  const handleClickSignUp = async () => {
    try {
      await instance.post('/user/signup', signUpInfo);
      dispatch(toggleModal({ type: 'signup' }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { errMsg?: string }).errMsg;
        dispatch(toggleModal({ type: 'basic', message }));
      }
    }
  };

  return (
    <>
      <SignModalState />

      <Header>
        <IconBack handleClick={() => navigate(-1)} />
        <h1>회원가입</h1>
      </Header>

      <StContainer>
        <StInnerContainer validate={`${validateInfo.userId?.includes('가능한')}`}>
          <h2>아이디</h2>
          <GlobalInput
            name="userId"
            type="text"
            placeholder="아이디 입력"
            minLength={6}
            maxLength={12}
            onChange={handleOnChange}
          />
          {validateInfo.userId && <span>{validateInfo.userId}</span>}
        </StInnerContainer>

        <StInnerContainer validate={`${validateInfo.password?.includes('가능한')}`}>
          <h2>비밀번호</h2>
          <GlobalInput
            name="password"
            type="password"
            placeholder="영문,숫자로만 6자리 이상"
            minLength={6}
            maxLength={20}
            onChange={handleOnChange}
          />
          {validateInfo.password && <span>{validateInfo.password}</span>}

          <GlobalInput
            name="confirm"
            type="password"
            placeholder="비밀번호 재입력"
            minLength={6}
            maxLength={20}
            onChange={handleOnChange}
          />
          {validateInfo.confirm && <span>{validateInfo.confirm}</span>}
        </StInnerContainer>

        <StInnerContainer
          validate={`${
            validateInfo.nickname?.includes('가능한') || validateInfo.nickname?.includes('익명')
          }`}
        >
          <h2>닉네임</h2>
          <GlobalInput
            name="nickname"
            type="text"
            placeholder="최소 2자 입력"
            minLength={2}
            maxLength={10}
            onChange={handleOnChange}
          />
          <span>{validateInfo.nickname}</span>
        </StInnerContainer>

        <GlobalButton onClick={handleClickSignUp}>가입하기</GlobalButton>
      </StContainer>
    </>
  );
};

export default SignUp;

interface ValidateProps {
  validate: string;
}

const StContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  padding: 2rem;
`;

const StInnerContainer = styled.section<ValidateProps>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  h2 {
    ${FONT_BOLD};
    line-height: 2.4rem;
  }

  span {
    margin-top: -1.2rem;
    margin-left: 1.2rem;

    ${FONT_S};
    line-height: 2rem;
    color: ${(props) =>
      props.validate === 'true' ? props.theme.color.SUB_2 : props.theme.color.WARN};
  }
`;
