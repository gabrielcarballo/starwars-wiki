import React, { useContext } from 'react';
import ApiProvider from '../context/ApiProvider';

export default function Table() {
  useContext(ApiProvider);
  return (
    <h1>funfou</h1>
  );
}
