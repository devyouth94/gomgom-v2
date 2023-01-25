import { useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';

import { useAppSelector } from 'app/config/hooks';
import Router from 'router/Router';
import GlobalStyles from 'styles/GlobalStyles';
import { darkTheme, defaultTheme } from 'styles/theme';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App = () => {
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
