import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconJoin } from 'static/Icons/Icons';
import { FONT_S } from 'styles/textStyles';

const SignUpNavi = () => {
  const navigate = useNavigate();

  return (
    <StSignUpNavi>
      <span>아직 회원이 아닌가요?</span>
      <button onClick={() => navigate('/signup')}>
        회원가입
        <IconJoin />
      </button>
    </StSignUpNavi>
  );
};

export default SignUpNavi;

const StSignUpNavi = styled.article`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  span {
    ${FONT_S};
    color: ${({ theme }) => theme.color.SUB_2};
  }

  button {
    display: flex;
    align-items: center;

    ${FONT_S};
  }
`;
