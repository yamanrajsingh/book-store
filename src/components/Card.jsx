import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const Cards = (props) => {
    const navigate=useNavigate();

  const [url, setURl] = useState("");
  const firebase = useFirebase();

  useEffect(() => {
    firebase.getImgURL(props.imageUrl).then((url) => setURl(url));
  });

  return (
    // <Card style={{ width: "18rem", margin: "5px",  border:"1px solid black" }}>
    //   <Card.Img variant="top" src={url} />
    //   <Card.Body>
    //     <Card.Title>{props.name}</Card.Title>
    //     <Card.Text>
    //       Title of Book is {props.name} and this book is sold by 
    //        {props.userName} and Cost of this book is Rs.{props.price}
    //     </Card.Text>
    //     <Button onClick={e=>navigate(`/book/view/${props.id}`)} variant="primary">view</Button>
    //   </Card.Body>
    // </Card>

    <CardGroup>
    <Card style={{ width: "18rem", margin: "7px",  border:"1px solid black" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
         <ul>
          <li>
          Cost : Rs.{props.price}
          </li>
          <li>Rating : 5 Star</li>
         </ul>
            
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      <Button onClick={e=>navigate(props.link)} variant="primary" style={{width:"4rem", padding:"5px"}}>view</Button>
      </Card.Footer>
      
    </Card>
    </CardGroup>
  );
};

export default Cards;
