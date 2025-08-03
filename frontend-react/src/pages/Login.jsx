import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import api from "../api/axiosApi";

const MovieDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = () => {
    const data = new URLSearchParams({
      username: formData.username,
      password: formData.password
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    api.post('/api/auth/login', data, { headers })
      .then(res => {
        console.log("Login successful");
        const token = res.data.access_token;
        localStorage.setItem('token', token);
        navigate('/movies');
      })
      .catch(err => {
        console.error("Login error:", err.response.data.detail);
      });
  };

  return (
    <>
      <h2 className="text-center">
        <span className="heading-highlight">Login</span>
      </h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={formData.password}
            type="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Form.Group>


        <Button
          variant="outline-secondary"
          onClick={handleLogin}
          style={{ marginRight: '10px' }}
        >            Login
        </Button>
      </Form>
    </>
  );
};

export default MovieDetails;
