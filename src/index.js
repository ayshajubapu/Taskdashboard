import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for createRoot
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import store from './store'; // Adjust the path to your store file
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root for React 18+

root.render(
  <Provider store={store}>
    <BrowserRouter>  {/* Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </Provider>
);
