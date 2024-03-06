import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";


const Details = () => {
  const navigate=useNavigate();
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qty,setQty]=useState(1);
 

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, [firebase]);

  console.log(data);
  
  useEffect(()=>{
   if(data)
   {
    const imgURl=data.imageUrl;
    firebase.getImgURL(imgURl).then((url)=>setURL(url));

   }
  },[data])
  const placeOrder= async ()=>{
    const res= await firebase.placeOrder(params.bookId,qty);
    navigate("/");
    
  }

  if (data == null) return <h1>Loading....</h1>;

  return <div className="container mt-5">
    <h1 style={{textAlign:"center"}}>{data.name}</h1>
    <br />
   <img src={url} width="50%" style={{borderRadius:"10px"}} />
   <br />
   
   <h2>Details</h2>
    <b>Price(in INR) : {data.price}</b> <br />
    <b>Isbn Number: {data.isbn}</b>
    <br />
    <b>Owner Name : {data.username} </b> <br />
    <b>Email : {data.userEmail}</b>
    <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label><b>Book Quantity</b></Form.Label>
          <Form.Control
            onChange={(e) => setQty(e.target.value)}
            value={qty}
            type="number"
            placeholder="Enter Quantity"
          />
        </Form.Group>
    <br />
    <Button variant="success" onClick={placeOrder}> Buy Now</Button>
  </div>;
};

export default Details;
