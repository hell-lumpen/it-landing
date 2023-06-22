// App.js

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BachelorCSPage from './pages/Bachelors/BachelorCS';
import BachelorFIPage from './pages/Bachelors/BachelorFI';
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/bachelors/cs" component={BachelorCSPage} />
          <Route path="/bachelors/fi" component={BachelorFIPage} />
          <Route path="/admission/application" component={() => {
            window.location.href = 'https://lk.mai.ru';
            return null;
          }} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
  );
};

export default App;