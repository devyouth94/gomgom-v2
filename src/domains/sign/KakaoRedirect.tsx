import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import GlobalInput from 'common/elements/GlobalInput';
import GlobalButton from 'common/elements/GlobalButton';
import Main from 'common/components/Main';
import FullLogo from 'common/elements/FullLogo';
import SignModalState from 'domains/sign/components/SignModalState';

import instance from 'app/instance';
import usePutKakaoNickname from 'domains/sign/hooks/usePutKakaoNickname';
import { userStorage } from 'lib/utils/storage';
import { FONT_BOLD, FONT_L, FONT_M, FONT_S } from 'styles/textStyles';

const KakaoRedirect = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const [nickname, setNickname] = useState('');
  const { mutate: putNickname } = usePutKakaoNickname();

  const kakaoLogin = useCallback(async () => {
    try {
      const { data } = await instance.get(`/auth/kakao/callback?code=${code}`);
      userStorage.setStorage(data.user);

      if (data.user.nickname !== '') {
        window.location.replace('/');
      }
    } catch (error) {
      console.log(error);
    }
  }, [code]);

  useEffect(() => {
    kakaoLogin();
  }, [kakaoLogin]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleClickEdit = () => {
    putNickname(nickname);
  };

  if (userStorage.getNickname() !== '') {
    return (
      <StLogoMain>
        <FullLogo />
      </StLogoMain>
    );
  }

  return (
    <>
      <SignModalState />

      <Main>
        <StContainer>
          <StTitle>닉네임을 설정해주세요.</StTitle>
          <StSubTitle>닉네임 설정 완료 시 메인 페이지로 이동합니다.</StSubTitle>

          <StEditContainer>
            <GlobalInput
              type="text"
              placeholder="닉네임을 입력해주세요"
              maxLength={12}
              value={nickname}
              onChange={handleOnChange}
            />

            <GlobalButton onClick={handleClickEdit}>등록</GlobalButton>
          </StEditContainer>

          <StHelpText>*익명으로 안심하고 고민을 이야기할 수 있어요.</StHelpText>
          <StHelpText>*닉네임은 마이페이지에서 변경이 가능합니다.</StHelpText>
        </StContainer>
      </Main>
    </>
  );
};

export default KakaoRedirect;

const StLogoMain = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
`;

const StTitle = styled.h1`
  ${FONT_L};
  ${FONT_BOLD};
  line-height: 3rem;
`;

const StSubTitle = styled.span`
  ${FONT_M};
  line-height: 2.1rem;
`;

const StEditContainer = styled.div`
  display: grid;
  grid-template-columns: auto 10rem;
  gap: 0.8rem;

  width: 100%;
  margin-top: 2.4rem;
`;

const StHelpText = styled.span`
  width: 100%;
  margin-top: 0.8rem;
  margin-left: 2rem;

  ${FONT_S};
  color: ${({ theme }) => theme.color.SUB_2};
  line-height: 1.2rem;
  text-align: left;
`;
