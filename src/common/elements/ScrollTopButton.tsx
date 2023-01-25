import styled from 'styled-components';
import { FONT_M } from 'styles/textStyles';

const ScrollTopButton = () => {
  return (
    <StContainer>
      <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>맨위로</span>
    </StContainer>
  );
};

export default ScrollTopButton;

const StContainer = styled.button`
  position: fixed;
  bottom: 9.6rem;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 9.3rem;
  height: 3.7rem;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.color.MAIN_2};

  border-radius: 1.85rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

  span {
    ${FONT_M};
    color: ${({ theme }) => theme.color.WHITE};
  }
`;
