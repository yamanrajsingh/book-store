import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const firebase = useFirebase();
  // console.log(firebase);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const naviagte = useNavigate();
  useEffect(() => {
    if (firebase.isLoggedUser) {
      // neviagte to home
      naviagte("/");
    }
  }, [firebase, naviagte]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.signupwitheEmailandPassword(email, password);
    // console.log("Signup Succesfull",user);
  };
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
};
export default RegisterPage;
