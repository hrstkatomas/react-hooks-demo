import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as ComponentalApproach from './ComponentalApproach';
import * as HooksApproach from './HooksApproach'
import {SportContext, sports, ThemeContext, themes} from './context'
import './styles.css';

const componentApproachPath: string = "/componentApproach";
const hooksApproachPath: string = "/hooksApproach"

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path={componentApproachPath}>
          <SportContext.Provider value={sports.soccer}>
            <ThemeContext.Provider value={themes.green}>
              <ComponentalApproach.PlayerCard />
            </ThemeContext.Provider>
          </SportContext.Provider>
        </Route>

        <Route path={hooksApproachPath}>
        <SportContext.Provider value={sports.hockey}>
            <ThemeContext.Provider value={themes.blue}>
             <HooksApproach.PlayerCard />
            </ThemeContext.Provider>
          </SportContext.Provider>
        </Route>

        <Route path="/">
          <nav>
            <ul>
              <li>
                <Link to={componentApproachPath}>Component approach</Link>
              </li>
              <li>
                <Link to={hooksApproachPath}>HooksApproach</Link>
              </li>
            </ul>
          </nav>
        </Route>
      </Switch>
    </Router>
  );
}