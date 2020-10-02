import React from 'react';

import { Container } from 'react-bootstrap';

import { Header, Footer } from './components/common';
import { Home } from './components/pages';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Home />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
