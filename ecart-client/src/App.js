import React from 'react';

import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

import './App.css';
import Navigation from './components/Navigation/Navigation'
import SideNavigation from './components/Navigation/SideNavigation'

const App = () => {
  return (
    <Container fluid>
      <Navigation></Navigation>
      <SideNavigation></SideNavigation>
    </Container>
  );
}

export default connect()(App);
