import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ApiProvider from './context/ApiProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
