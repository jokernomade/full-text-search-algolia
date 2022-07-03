import {useEffect,useState} from 'react'
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [text,setText] = useState('Backend is off !')

  const initAsync = async () => {
    const response = await fetch('http://localhost:5000/text',{ 
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    })
    const json = await response.json()
    setText(decodeURI(json.text))
  }

  useEffect(()=>{
    initAsync()
    return ()=>{}
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {text}
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
