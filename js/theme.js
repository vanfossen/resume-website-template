// reference used: https://youtu.be/ZpwQKudHYZc

const DARK_MODE_PREFERENCE_KEY = "dark-mode-preference";
let isDarkMode = false;

// add or removes 'darkMode' class from the 'body' element
function updateAppInterface() {
  document.body.classList.remove("darkMode");

  if (isDarkMode) {
    document.body.classList.add("darkMode");
  }
}

// updates if dark mode is true or false when icon is pressed
function toggleTheme() {
  const localTheme = getThemeFromLocalStorage();
  isDarkMode = localTheme?.isDarkMode ?? isDarkMode;

  updateAppInterface();
}

// tied to color theme SVG's 'onclick()'
function handleIconToggle() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("darkMode");
  saveThemeToLocalStorage();
  updateAppInterface();
}

// pulls key from local storage (if it exists)
function getThemeFromLocalStorage() {
  const preferencesJSON = localStorage.getItem(DARK_MODE_PREFERENCE_KEY);

  if (!preferencesJSON) {
    return undefined;
  }

  try {
    return JSON.parse(preferencesJSON);
  } catch {
    return undefined;
  }
}

// saves key to local storage
function saveThemeToLocalStorage() {
  localStorage.setItem(
    DARK_MODE_PREFERENCE_KEY,
    JSON.stringify({ isDarkMode })
  );
}

if (window.matchMedia) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");

  mql.addEventListener("change", () => {
    isDarkMode = mql.matches;
    toggleTheme();
  });

  isDarkMode = mql.matches;
}

toggleTheme();
