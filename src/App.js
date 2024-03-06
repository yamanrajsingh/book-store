// Route
import { Route, Routes } from "react-router-dom";
// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Page
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import ListingPage from "./Pages/List";
import HomePage from "./Pages/Home";
import Details from "./Pages/Detail";
import Orders from "./Pages/ViewOrder";
import ViewOrder from "./Pages/ViewOrderDetails";
// components
import NavigationMenu from "./components/navbar";

function App() {
  return (
    <div>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/book/list" element={<ListingPage />}></Route>
        <Route path="/book/view/:bookId" element={<Details />}></Route>
        <Route path="/book/orders" element={<Orders />}></Route>
        <Route path="/books/orders/:bookId" element={<ViewOrder />}></Route>
      </Routes>
    </div>
  );
}

export default App;
