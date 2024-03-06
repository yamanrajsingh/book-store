import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import Cards from "../components/Card";
import CardGroup from "react-bootstrap/CardGroup";

const HomePage = () => {

  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBook().then((books) => setBooks(books.docs));
  }, [firebase]);

  return (
    <div className="conatiner mt-5">
      <CardGroup>
        {books.map((book) => (
          <Cards link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />
        ))}
      </CardGroup>
    </div>
  );
};

export default HomePage;
