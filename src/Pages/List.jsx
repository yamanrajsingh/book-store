import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import "../style/ListingPage.css"; // Import custom CSS

const ListingPage = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [username, setuserName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");

  useEffect(() => {
    if (!firebase.isLoggedUser)
      navigate("/login");
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firebase.isLoggedUser) {
      await firebase.handleCreateNewListing(username, name, isbnNumber, price, coverPic);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5 listing-page">
      <Form onSubmit={handleSubmit} className="listing-form">
        <h2 className="form-title">Add New Book</h2>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Enter Your Name</Form.Label>
          <Form.Control
            onChange={(e) => setuserName(e.target.value)}
            value={username}
            type="text"
            placeholder="Enter Your Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Book Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Enter ISBN Number</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="Enter ISBN Number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Enter Book Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="Enter Book Price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicfile">
          <Form.Label>Attach Cover Pic</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-button">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;
