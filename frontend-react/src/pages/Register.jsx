import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import api from "../api/axiosApi";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleRegister = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    api.post('/api/auth/register', formData, config)
      .then(() => {
        navigate('/login');
      })
      .catch(err => {
        console.error("Register error:", err.response.data.detail);
      });
  };

  return (
    <>
      <h2 className="text-center">
        <span className="heading-highlight">Register</span>
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
          onClick={handleRegister}
          style={{ marginRight: '10px' }}
        >            Register
        </Button>
      </Form>
    </>
  );
};

export default Register;
