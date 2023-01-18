import styled, { useTheme } from 'styled-components';
import { useNavigate } from 'react-router';
import FullLogo from 'common/components/FullLogo';
import GlobalButton from 'common/elements/GlobalButton';

const LastSlide = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <StContainer>
      <FullLogo />

      <StButtonContainer>
        <GlobalButton onClick={() => navigate('/signin')}>시작하기</GlobalButton>
        <GlobalButton
          onClick={() => navigate('/vote')}
          bgc={theme.color.WHITE}
          font={theme.color.MAIN_2}
        >
          서비스 둘러보기
        </GlobalButton>
      </StButtonContainer>
    </StContainer>
  );
};

export default LastSlide;

const StContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

const StButtonContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
  padding: 0 2rem;
  margin-top: 10rem;
`;
