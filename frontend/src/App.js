import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { Header, Footer } from 'components/common';
import {
  CartView,
  HomeView,
  LoginView,
  ProductView,
  RegisterView,
  ProfileView,
  ShippingView,
  PaymentView,
  PlaceOrderView,
  OrderView,
  UserListView,
} from 'views';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/register' component={RegisterView} exact />
          <Route path='/login' component={LoginView} exact />
          <Route path='/profile' component={ProfileView} exact />
          <Route path='/product/:id' component={ProductView} />
          <Route path='/cart/:id?' component={CartView} />
          <Route path='/shipping' component={ShippingView} />
          <Route path='/payment' component={PaymentView} />
          <Route path='/placeorder' component={PlaceOrderView} />
          <Route path='/order/:id' component={OrderView} />
          <Route path='/admin/userlist' component={UserListView} />
          <Route path='/' component={HomeView} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
