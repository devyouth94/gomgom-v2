import { useState } from 'react';
import styled from 'styled-components';

import Main from 'common/components/Main';
import UserContainer from 'domains/mypage/components/UserContainer';
import GradeContainer from 'domains/mypage/components/GradeContainer';
import LoginContainer from 'domains/mypage/components/LoginContainer';
import Nav from 'common/components/Nav';

import useGetMyInfo from 'domains/mypage/hooks/useGetMyInfo';
import { userStorage } from 'lib/utils/storage';
import { FONT_EXTRABOLD, FONT_L } from 'styles/textStyles';

const MyPage = () => {
  const { data } = useGetMyInfo();

  const [selectedGrade, setSelectedGrade] = useState(0);
  const handleSelectGrade = (idx: number) => {
    setSelectedGrade(idx + 1);
  };

  return (
    <>
      <StMain>
        <StHeaderTop>
          {userStorage.getToken('access') ? (
            <UserContainer point={data?.point} />
          ) : (
            <h1>
              로그인하고 곰곰의 <br />
              고민해결 서비스를 경험해보세요.
            </h1>
          )}
        </StHeaderTop>

        <StHeaderBottom>
          {userStorage.getToken('access') ? (
            <GradeContainer
              point={data?.point}
              selectedGrade={selectedGrade}
              handleSelectGrade={handleSelectGrade}
            />
          ) : (
            <LoginContainer />
          )}
        </StHeaderBottom>

        <Nav />
      </StMain>
    </>
  );
};

export default MyPage;

const StMain = styled(Main)`
  padding-bottom: 10rem;
`;

const StHeaderTop = styled.section`
  display: flex;
  align-items: center;

  margin: 0 -2rem;
  padding: 0 2rem;
  height: 11.3rem;
  background-color: ${({ theme }) => theme.color.WHITE};

  h1 {
    ${FONT_L};
    ${FONT_EXTRABOLD};
    line-height: 3rem;
  }
`;

const StHeaderBottom = styled.section`
  margin: 0 -2rem;
  padding: 0 2rem 2.4rem 2rem;
  background-color: ${({ theme }) => theme.color.WHITE};
  border-radius: 0 0 2rem 2rem;
`;
