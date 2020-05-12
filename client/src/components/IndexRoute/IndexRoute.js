import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CatFacts from '../CatFacts';
import CatExplore from '../CatExplore';

const IndexRoute = () => {
  return (
    <Router>
      <div className="container">
        <h3 className="main-title">Hello Cats!</h3>
        <Link to='/'>Cat facts</Link>
        <Link to='/cat-explore'>Explore cats</Link>

        <Switch>
          <Route exact path="/" component={CatFacts} />
          <Route path="/cat-explore" component={CatExplore} />
        </Switch>
      </div>
    </Router>
  );
}

export default IndexRoute;