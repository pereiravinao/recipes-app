import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Components from './components/Components';
import Provider from './contexts/Provider';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Components />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
