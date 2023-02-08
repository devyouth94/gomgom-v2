import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FONT_BOLD } from 'styles/textStyles';

const StartDisplay = () => {
  const [infoText, setIntoText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntoText(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {infoText && (
        <StBackground>
          <StText>고민을 떠올리고 하단 버튼을 눌러주세요</StText>
        </StBackground>
      )}
    </>
  );
};

export default StartDisplay;

const StText = styled.div`
  ${FONT_BOLD};
  color: ${({ theme }) => theme.color.MAIN_2};
`;

const StBackground = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};

    width: ${({ theme }) => theme.style.WIDTH};
  }

  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 99;
`;
