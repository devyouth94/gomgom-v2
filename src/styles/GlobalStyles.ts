import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import 'static/fonts/fonts.css';
import { FONT_M } from './textStyles';

const GlobalStyles = createGlobalStyle`
  ${reset};

  html {
    background-color: ${({ theme }) => theme.color.SUB_5};
    
    font-size: 62.5%; //1rem을 10px로 변환
    color: ${({ theme }) => theme.color.BLACK};
  }
  
  * {
    box-sizing: border-box;

    font-size: 1.6rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    letter-spacing: -0.5px;
  }
  
  body {
    @media ${({ theme }) => theme.device.PC} {
      width: 450px;
      margin: 0 auto;
    }

    position: relative;
  
    width: 100%;
    min-height: calc(var(--vh, 1vh) * 100);
    height: 100%;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.color.BG};

    font-size: 1.6rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    letter-spacing: -0.5px;

    overflow: overlay;

    cursor: default;
  }

  button {
    border: 0;
    background-color: transparent;
    color: ${({ theme }) => theme.color.BLACK};

    cursor: pointer;
  }

  textarea,
  input {
    border: none;
    background-color: transparent;
    ${FONT_M};
  }

  ::placeholder {
    color: ${({ theme }) => theme.color.SUB_2};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.BLACK};
  }
`;

export default GlobalStyles;
