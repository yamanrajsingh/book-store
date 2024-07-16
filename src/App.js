// App.js
import { Route, Routes } from "react-router-dom";
// CSS
import "./style/App.css"
import "bootstrap/dist/css/bootstrap.min.css";
// Pages
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import ListingPage from "./Pages/List";
import HomePage from "./Pages/Home";
import Details from "./Pages/Detail";
import Orders from "./Pages/ViewOrder";
import ViewOrder from "./Pages/ViewOrderDetails";
// Components
import NavigationMenu from "./components/navbar";
import Footer from "./components/Footer"; // Import the Footer component

function App() {
  return (
    <div className="app-container">
      <NavigationMenu />
      <div className="content-wrap">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/book/list" element={<ListingPage />} />
          <Route path="/book/view/:bookId" element={<Details />} />
          <Route path="/book/orders" element={<Orders />} />
          <Route path="/books/orders/:bookId" element={<ViewOrder />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
