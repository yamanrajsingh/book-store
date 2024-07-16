import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const Cards = (props) => {
  const navigate = useNavigate();
  const [url, setURl] = useState("");
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getImgURL(props.imageUrl).then((url) => setURl(url));
  }, [firebase, props.imageUrl]);

  return (
    <CardGroup style={{ paddingBottom:28, marginLeft: 39 }}>
      <Card style={{ width: "20rem", padding: "3px", margin: "5px", backgroundColor: "#212529", color: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <Card.Img variant="top" src={url} style={{ borderRadius: "10px 10px 0 0" }} />
        <Card.Body>
          <Card.Title style={{ color: "#ffc107" }}>{props.name}</Card.Title>
          <Card.Text>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li>Cost: Rs.{props.price}</li>
              <li>Rating: 5 Star</li>
              <li>Owner: {props.username}</li>
            </ul>
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "transparent", borderTop: "none" }}>
          <Button onClick={(e) => navigate(props.link)} variant="primary" style={{ width: "4rem", padding: "5px" }}>
            View
          </Button>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
};

export default Cards;
