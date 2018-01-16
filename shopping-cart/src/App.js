import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import ProductContainer from './containers/ProductContainer';
import NotFound from './components/NotFound';
import ProductDetailsContainer from './containers/ProductDetailsContainer';
import CartContainer from './containers/CartContainer';
import LoginContainer from './containers/LoginContainer';
import AddProductContainer from './containers/AddFormContainer';
import { openCart } from './action';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" className="container-fluid">
        <div>
        <CartContainer />
        </div>
        <div className="row app-header">
        <div><center><h2>React Redux Shopping Cart Demo</h2></center> </div>
        <div>
        <div className="left-header-menu">
        <Link to="/">Home</Link>
        </div>
        <div className="right-header-menu">
        <span onClick={()=>this.props.openCart()}>Cart</span>
        </div>
        </div>
        </div>
       
        
          <Switch>
          <Route exact path="/" component={ProductContainer} />
          <Route path="/login" component={ LoginContainer } />
          <Route path="/add-product" component={AddProductContainer} /> 
          <Route path="/home" component={()=>(<div>Login successfull</div>)} />
          <Route  path="/profile" component={()=>(<div><h1>User Profile Page</h1></div>)} />
          <Route path="/product-details/:id" component={ProductDetailsContainer}/>
          <Route path="*" component={NotFound} />
          </Switch>

      </div>
    );
  }
}

export default withRouter(connect(null,{openCart})(App));
