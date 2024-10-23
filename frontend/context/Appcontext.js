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

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`);
      const fetchedUser = response.data;
      console.log("Fetched user data:", fetchedUser);
      setUser(fetchedUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const loggedInUser = response.data;

      // Save user data to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));

      // Fetch the user data after successful login
      fetchUserData();
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
