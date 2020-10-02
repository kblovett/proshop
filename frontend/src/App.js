import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { Header, Footer } from 'components/common';
import { HomeScreen, ProductScreen } from 'components/screens';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
