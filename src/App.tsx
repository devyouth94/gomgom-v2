import { useCallback, useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';

import Router from 'router/Router';

import { useAppSelector } from 'app/config/hooks';
import useAppQueryClient from 'common/hooks/useAppQueryClient';
import { userStorage } from 'lib/utils/storage';
import { refreshTokenAPI } from 'lib/utils/refreshTokenAPI';
import GlobalStyles from 'styles/GlobalStyles';
import { darkTheme, defaultTheme } from 'styles/theme';

const App = () => {
  const queryClient = useAppQueryClient();
  const { theme } = useAppSelector((state) => state.theme);

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

  useEffect(() => {
    if (!userStorage.getToken('access')) return;

    refreshTokenAPI();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : defaultTheme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
