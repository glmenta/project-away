import logo from './logo.svg';
import './App.css';
import { UserContext } from './UserContext';
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticate, fetchSingleUser } from './store';
import { auth } from './firebase';


function App() {
  // const { user, login, logout } = useContext(UserContext);
  const [user, setCurrentUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        await dispatch(authenticate()) // Make sure this properly sets the user
        await dispatch(fetchSingleUser(user.uid))
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
      setLoaded(true)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [dispatch])
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
