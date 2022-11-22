import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import apiFetch from './helper/ApiFetch';

function App() {
  const [apiResponse, setApiFetch] = useState({});

  useEffect(() => {
    const data = () => {
      setApiFetch(apiFetch());
    };
  }, []);
  return (
    <Table api={ apiResponse } />
  );
}

export default App;
