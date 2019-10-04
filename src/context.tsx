import React from 'react';
import cs from './flags/cs.png'
import en from './flags/en.png'

export const locales = {
  cs: <img src={cs} className="flag" alt="cs" />,
  en: <img src={en} className="flag" alt="en" />,
};

export const LocaleContext = React.createContext<React.ReactElement>(locales.en);

export const themes = {
  dark: "dark",
  light: "light",
};

export const ThemeContext = React.createContext<string>("dark");
