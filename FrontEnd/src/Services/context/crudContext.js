


import { createContext, useContext, useState, useEffect, createElement } from "react";
import axios from "axios";

export const crudContext = createContext();

export const useCrud = () => useContext(crudContext);

export const CrudProvider = ({ children }) => {

  const [data, setData] = useState([]);

  const [recycleBin, setRecycleBin] = useState(() => {
   
    const storedRecycleBin = localStorage.getItem("recycleBin");
    
    return storedRecycleBin ? JSON.parse(storedRecycleBin) : [];
  });

  // Save recycleBin to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recycleBin", JSON.stringify(recycleBin));
  }, [recycleBin]);

  const addDataPost = async (newData) => {
    try {
      const response = await axios.post("http://localhost:3600/users", newData);
      setData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const getDataAsync = async () => {
    try {
      const response = await axios.get("http://localhost:3600/users");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateAsync = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:3600/users/${id}`, updatedData);
      setData((prevData) =>
        prevData.map((user) => (user.id === id ? { ...user, ...updatedData } : user))
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteAsync = async (id) => {
    const deletedUser = data.find((user) => user.id === id);

    if (deletedUser) {
      setRecycleBin((prevBin) => [...prevBin, deletedUser]);
      setData((prevData) => prevData.filter((user) => user.id !== id));

      try {
        await axios.delete(`http://localhost:3600/users/${id}`);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const restoreFromRecycleBin = async (id) => {
    const userToRestore = recycleBin.find((user) => user.id === id);

    if (userToRestore) {
      setRecycleBin((prevBin) => prevBin.filter((user) => user.id !== id));
      setData((prevData) => [...prevData, userToRestore]);

      try {
        await axios.post("http://localhost:3600/users", userToRestore);
      } catch (error) {
        console.error("Error restoring user:", error);
      }
    }
  };

  return createElement(
    crudContext.Provider,
    {
      value: {
        data,
        recycleBin,
        getDataAsync,
        addDataPost,
        updateAsync,
        deleteAsync,
        restoreFromRecycleBin,
      },
    },
    children
  );
};
