import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ArtContext = createContext();

export const ArtProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (item) => {
    let updatedFavorites = [...favorites];
    if (updatedFavorites.some((fav) => fav.id === item.id)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== item.id);
    } else {
      updatedFavorites.push(item);
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <ArtContext.Provider value={{ favorites, toggleFavorite, clearFavorites }}>
      {children}
    </ArtContext.Provider>
  );
};
