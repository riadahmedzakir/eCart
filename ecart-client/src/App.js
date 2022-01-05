import React from 'react';

import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

import './App.css';
import Navigation from './components/Navigation/Navigation'
import SideNavigation from './components/Navigation/SideNavigation'

function App() {
  return (
    <Container fluid>
      <Navigation></Navigation>
      <SideNavigation></SideNavigation>
    </Container>

  );
}

const mapStateToProps = (state) => ({
  product_list: state.product.product_list,
})

export default connect(mapStateToProps)(App);
