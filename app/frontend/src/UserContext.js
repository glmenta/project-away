import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the user
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user object

  // Check if a user token is already in localStorage when the app starts
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
        // You may want to validate this token with your backend or Firebase
        setUser({ token: storedToken });
        }
    }, []);

    const login = (userData) => {
        setUser(userData);  // Update the user state with the logged-in user data
        localStorage.setItem('token', userData.token);  // Store token in localStorage
    };

    const logout = () => {
        setUser(null);  // Clear the user state
        localStorage.removeItem('token');  // Remove the token from localStorage
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
        {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
