import { ThemeProvider } from 'styled-components';
import Router from 'router/Router';
import useThemeStore from 'stores/useThemeStore';
import GlobalStyles from 'styles/GlobalStyles';
import { darkTheme, defaultTheme } from 'styles/theme';

const App = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : defaultTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};

export default App;
