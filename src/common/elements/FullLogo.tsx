import Logo from 'static/images/Logo';
import styled from 'styled-components';
import { FONT_EXTRABOLD, FONT_M } from 'styles/textStyles';

const FullLogo = () => {
  return (
    <StLogo>
      <Logo />
      <span>같이 고민해요, 곰곰</span>
    </StLogo>
  );
};

export default FullLogo;

const StLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    margin-top: 0.7rem;

    ${FONT_M};
    ${FONT_EXTRABOLD};
    color: ${({ theme }) => theme.color.MAIN_2};
  }
`;
