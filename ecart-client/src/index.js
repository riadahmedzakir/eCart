import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import rootReducer from "./reducers";
import './index.css';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

const App = lazy(() => import("./App"));
const ProductDetails = lazy(() => import("./components/Product/ProductDetails"));
const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/product-details" component={ProductDetails} />
        </Switch>
      </Suspense>
    );
  }
}

const RootWithAuth = withRouter(connect()(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
