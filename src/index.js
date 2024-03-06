import React from "react";
import { FirebaseProvider } from "./context/firebase";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>     
       <FirebaseProvider> 
        <App />
       </FirebaseProvider> 
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
