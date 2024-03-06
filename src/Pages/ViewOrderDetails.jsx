import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const ViewOrder=()=>{
    const parms=useParams();
    const firebase=useFirebase();
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
      firebase.getOrders(parms.bookId).then((orders)=>setOrders(orders.docs))
    },[firebase])
    console.log(orders);
    return (
        
   <div className="container">
    <h1 style={{textAlign:"center"}}>Ordered</h1>
    {
        orders.map(order=>{
        const data=order.data();
        return <div key={order.id} className="mt-5" style={{border:"1px solid", padding:"10px"}}>
            <h5>Order By : {data.userName}</h5>
            <h6>Qnty: {data.qty}</h6>
            <p>Email Id: {data.userEmail}</p>
        </div>
        })
    }
   </div>
    )
}

export default ViewOrder;