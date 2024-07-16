import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import Cards from "../components/Card";
import CardGroup from "react-bootstrap/esm/CardGroup";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const naviagte = useNavigate();
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedUser)
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => setBooks(books.docs));
        else {
          naviagte("/login");
        }
  }, [firebase]);
  


  return (
    <div className="conatiner mt-5">
    <CardGroup>
      {books.map((book) => (
        <Cards link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
      ))}
    </CardGroup>
  </div>
  );
};

export default Orders;
