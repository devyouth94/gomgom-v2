import { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import Router from 'router/Router';
import useThemeStore from 'stores/useThemeStore';
import GlobalStyles from 'styles/GlobalStyles';
import { darkTheme, defaultTheme } from 'styles/theme';

const App = () => {
  const theme = useThemeStore((state) => state.theme);

  const [vh, setVh] = useState(window.innerHeight * 0.01);
  const screenSize = useCallback(() => {
    setVh(window.innerHeight * 0.01);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [vh]);

  useEffect(() => {
    screenSize();
    window.addEventListener('resize', screenSize);

    return () => window.removeEventListener('resize', screenSize);
  }, [screenSize]);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : defaultTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;
