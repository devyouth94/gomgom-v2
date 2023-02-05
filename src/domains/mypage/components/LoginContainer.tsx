import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import GlobalButton from 'common/elements/GlobalButton';

const LoginContainer = () => {
  const navigate = useNavigate();

  return (
    <StContainer>
      <StGlobalButton onClick={() => navigate('/signin')}>로그인</StGlobalButton>
      <StGlobalButton onClick={() => navigate('/signup')}>회원가입</StGlobalButton>
    </StContainer>
  );
};

const StContainer = styled.article`
  display: flex;
  gap: 0.8rem;
`;

const StGlobalButton = styled(GlobalButton)`
  height: 4.4rem;

  font-size: 1.4rem;
`;

export default LoginContainer;
