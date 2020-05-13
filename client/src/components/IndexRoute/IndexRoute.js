import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import CatFacts from '../CatFacts';
import CatExplore from '../CatExplore';
import Background from '../Background';

import { Title, Container, LinksWrap, Link } from './style';

const IndexRoute = () => {
  return (
    <Router>
      <Background />
      <Container>
        <Title>Hello Cats!</Title>
        <LinksWrap>
          <Link to='/cat-facts'>Cat facts</Link>
          <Link to='/cat-explore'>Explore cats</Link>
        </LinksWrap>

        <Switch>
          <Route path="/cat-facts" component={CatFacts} />
          <Route path="/cat-explore" component={CatExplore} />
          <Redirect to="/cat-facts" />
        </Switch>
      </Container>
    </Router>
  );
}

export default IndexRoute;