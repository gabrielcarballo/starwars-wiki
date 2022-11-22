import React from 'react';
import ReactDOM from 'react-dom/client';
import ApiProvider from './context/ApiProvider';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ApiProvider>
      <App />
    </ApiProvider>,
  );
