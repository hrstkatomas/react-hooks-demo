import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faHockeyPuck } from '@fortawesome/free-solid-svg-icons'

export const sports = {
  hockey: <FontAwesomeIcon icon={faHockeyPuck} />,
  soccer: <FontAwesomeIcon icon={faFutbol} />,
};

export const SportContext = React.createContext<React.ReactElement>(sports.hockey);

export const themes = {
  blue: "blue",
  green: "green",
};

export const ThemeContext = React.createContext<string>(themes.blue);
