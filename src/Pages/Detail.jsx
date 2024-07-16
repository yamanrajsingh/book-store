import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../style/Details.css"; // Import custom CSS

const Details = () => {
  const navigate = useNavigate();
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, [firebase, params.bookId]);

  useEffect(() => {
    if (data) {
      const imgURL = data.imageUrl;
      firebase.getImgURL(imgURL).then((url) => setURL(url));
    }
  }, [data, firebase]);

  const placeOrder = async () => {
    if (firebase.isLoggedUser)
    {
      await firebase.placeOrder(params.bookId, qty);
      navigate("/");
    }
    else
    {
      navigate("/login");
    }
  
  };

  if (data == null) return <h1>Loading....</h1>;

  return (
    <div className="container mt-5 details-container">
      <h1 className="details-title">{data.name}</h1>
      <img src={url} width="50%" className="details-image" alt={data.name} />
      <h2 className="details-subtitle">Details</h2>
      <div className="details-info">
        <b>Price (INR): {data.price}</b> <br />
        <b>ISBN Number: {data.isbn}</b> <br />
        <b>Owner Name: {data.username}</b> <br />
        <b>Email: {data.userEmail}</b>
      </div>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label><b>Book Quantity</b></Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="number"
          placeholder="Enter Quantity"
        />
      </Form.Group>
      <Button variant="success" onClick={placeOrder}>Buy Now</Button>
    </div>
  );
};

export default Details;
