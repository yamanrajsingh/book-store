import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css"; // Import custom CSS

const LoginPage = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.isLoggedUser) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await firebase.signinwithEmailandPass(email, password);
    console.log("Login Successful", user);
  };

  return (
    <div className="container mt-5 login-page">
      <Form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login</h2>
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
        <Button variant="primary" type="submit" className="submit-button">
          Login
        </Button>
        <Button onClick={firebase.signupwithGoogle} variant="danger" className="google-button">
          Sign in with Google
        </Button>
      </Form>
    </div>
  );
};
export default LoginPage;
