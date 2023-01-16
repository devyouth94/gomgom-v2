import { create } from 'zustand';

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
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: getTheme(),
  toggleTheme: () =>
    set((state) => {
      const isDark = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', isDark);

      return { theme: isDark };
    }),
}));

export default useThemeStore;
