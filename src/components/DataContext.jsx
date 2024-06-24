import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!category) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const categoryMap = {
        'Animals': 27,
        'Art': 25,
        'Vehicles': 28,
        'Politics': 24,
        'History': 23,
        'Geography': 22,
        'Sports': 21,
        'Computers': 18,
        'Science and nature': 17,
        'Video game': 15,
        'Film': 11,
        'Music': 12,
        'Books': 10,
      };

      const categoryUrl = categoryMap[category];
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryUrl}`);
        setData(response.data.results);
      } catch (err) {
        console.error('Error fetching data:', err);  // Log the error
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    console.log("you fetched data");

    const debounceFetchData = setTimeout(() => {
      fetchData();
    }, 500); // Debounce by 500ms

    return () => clearTimeout(debounceFetchData);
  }, [category]);

  const handleCategory = (value) => {
    setData([]); // Clear previous data
    setCategory(value);
  };

  const handleReset = () => {
    setData([]);
  };

  console.log(data);

  return (
    <DataContext.Provider value={{ data, loading, error, category, handleCategory, handleReset }}>
      {children}
    </DataContext.Provider>
  );
};
