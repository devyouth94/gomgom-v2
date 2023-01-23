import styled from 'styled-components';
import { FONT_BOLD, FONT_M } from 'styles/textStyles';

const StTitleContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5.6rem;
  background-color: ${({ theme }) => theme.color.MAIN_2};

  border-radius: 2rem 2rem 0 0;

  ${FONT_BOLD};
  color: ${({ theme }) => theme.color.WHITE};
`;

const StTextContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  min-height: 7.2rem;
  padding: 1rem;

  span {
    ${FONT_M};
    text-align: center;
    line-height: 2.5rem;
  }

  span:nth-child(2) {
    color: ${({ theme }) => theme.color.SUB_2};
  }
`;

const StButtonContainer = styled.section`
  display: flex;
  align-items: center;

  height: 5.6rem;
  border-top: 1px solid ${({ theme }) => theme.color.SUB_4};

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    ${FONT_M};
  }

  button:nth-child(2) {
    border-left: 1px solid ${({ theme }) => theme.color.SUB_4};
  }
`;

const StWindow = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 29rem;
  background-color: #fff;
  border-radius: 2rem;

  line-height: 2.1rem;
`;

const StBackground = styled.article`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
`;

const StModalContainer = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    width: 450px;
  }

  position: fixed;

  width: 100%;
  height: 100%;
  z-index: 9999;
`;

export {
  StTitleContainer,
  StTextContainer,
  StButtonContainer,
  StWindow,
  StBackground,
  StModalContainer,
};
