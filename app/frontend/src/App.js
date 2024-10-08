import logo from './logo.svg';
import './App.css';
import { UserContext } from './UserContext';

function App() {
  const { user, login, logout } = useContext(UserContext);

  // const handleLogin = () => {
  //   const userData = {
  //     token: 'fetched-firebase-token',
  //   };
  //   login(userData);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
