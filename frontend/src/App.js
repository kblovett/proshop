import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { Header, Footer } from 'components/common';
import { HomeView, ProductView, CartView } from 'views';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeView} exact />
          <Route path='/product/:id' component={ProductView} />
          <Route path='/cart/:id?' component={CartView} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
