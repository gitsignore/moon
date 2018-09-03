import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Users from './containers/Users';
import Teams from './containers/Teams';

export default () => (
  <Switch>
    <Route path="/" exact component={Teams} />
    <Route path="/:id" component={Users} />
  </Switch>
);
