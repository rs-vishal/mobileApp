import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user data from AsyncStorage:", error);
    }
  };

  

  const handleLogin = async (email) => {
    try {
      const response = await axios.get(`${API_URL}/user/${email}`);
      const loggedInUser = response.data;
      setUser(loggedInUser)
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));
      
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};
