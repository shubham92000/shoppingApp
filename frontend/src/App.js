import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Fragment className="App">
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to shopping website</h1>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
