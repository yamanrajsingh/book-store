import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import "../style/ViewOrder.css"; // Import custom CSS

const ViewOrder = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  }, [firebase, params.bookId]);

  return (
    <div className="container view-order-container">
      <h1 className="view-order-title">Ordered</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div key={order.id} className="order-card">
            <h5>Order By: {data.userName}</h5>
            <h6>Quantity: {data.qty}</h6>
            <p>Email Id: {data.userEmail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewOrder;
