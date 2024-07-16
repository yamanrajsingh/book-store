import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import "../style/RegisterPage.css"; // Import custom CSS

const RegisterPage = () => {
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
    await firebase.signupwitheEmailandPassword(email, password);
    // console.log("Signup Successful", user);
  };

  return (
    <div className="container mt-5 register-page">
      <Form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create Account</h2>
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
          Create Account
        </Button>
        <Button variant="primary" type="submit" className="submit-button1" onClick={()=>{
           navigate("/login");
        }}>
         Login
        </Button>
      </Form>
    </div>
  );
};
export default RegisterPage;
