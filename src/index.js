import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import router from "./routes";

import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChakraProvider>
      <React.StrictMode>
        {/* <RouterProvider router={router} /> */}
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
