import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

const ListingPage = () => {

  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [username, setuserName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const naviagte = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      await firebase.handleCreateNewListing(username,name, isbnNumber, price, coverPic);
      naviagte("/");
  };
  
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>

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
          <Form.Label>Enter IsbnNumber </Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="Text"
            placeholder="Enter IsbnNumber"
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
          <Form.Label>Attach CoverPic</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;
