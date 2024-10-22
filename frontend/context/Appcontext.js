import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/session`);
                
                if (response.status === 200) {
                    const data = response.data;
                    const userData = {
                        id: data.id,
                        username: data.username,
                        email: data.email,
                        role: data.role
                    };
                    setUser(userData);
                    setIsAuthenticated(true);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch profile');
            }
        };

        fetchUserData(); 
    }, []);

    return (
        <UserContext.Provider value={{ user, isAuthenticated, error }}>
            {children}
        </UserContext.Provider>
    );
};
