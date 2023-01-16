import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};

  html {
    font-size: 62.5%; //1rem을 10px로 변환
  }

  * {
    font-size: 1.6rem;
  }

  body {
    font-size: 1.6rem;

    background-color: ${({ theme }) => theme.color.BG};

    color: ${({ theme }) => theme.color.BLACK};
  }
`;

export default GlobalStyles;
