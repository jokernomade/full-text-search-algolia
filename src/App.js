import {useEffect,useState} from 'react'
import { Container, Row, Col } from 'reactstrap';
//import logo from './logo.svg';
import './App.css';
import Search from './Search';

const App = () => {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={6} style={{margin:'0 auto',marginTop:50}}>
            <Search />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
