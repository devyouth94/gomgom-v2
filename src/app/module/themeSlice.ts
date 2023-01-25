import { createSlice } from '@reduxjs/toolkit';

const getTheme = () => {
  const userDefaultMode =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  let initialTheme = userDefaultMode ? 'dark' : 'light';

  const locatStorageTheme = localStorage.getItem('theme');

  if (locatStorageTheme) {
    initialTheme = locatStorageTheme;
  }

  return initialTheme;
};

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: getTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const isDark = state.theme === 'dark' ? 'light' : 'dark';

      localStorage.setItem('theme', isDark);
      state.theme = isDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
