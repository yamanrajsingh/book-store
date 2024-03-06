import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../context/firebase";

const NavigationMenu = () => {
  const { logout, isLoggedUser } = useFirebase(); // Import the logout function and isLoggedUser state

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand as={Link} to="/">
            Navbar
          </Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/book/list">
              Add Listing
            </Nav.Link>
            <Nav.Link as={Link} to="/book/orders">
              Orders
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedUser ? ( // Conditionally render links based on user login status
              <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationMenu;
