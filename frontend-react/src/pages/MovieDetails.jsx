import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import api from "../api/axiosApi";
import { ArrowLeft } from 'react-bootstrap-icons';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.edit || false;

  const [movie, setMovie] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState({
    success: false,
    error: false
  });

  useEffect(() => {
    console.log("Fetching movie details for ID:", id);
    api.get(`/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    api.post(`/api/movies/${id}`, formData)
      .then(() => setShowAlert({ success: true, error: false }))
      .catch(setShowAlert({ success: false, error: true }));
  };

//   const handleDelete = () => {
//     axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`)
//       .then(() => navigate("/"))
//       .catch(console.error);
//   };

  if (loading || !movie) return <div>Loading...</div>;

  return (
      <div className="container-box">
        <Alert show={showAlert.success} variant="success" onClose={() => setShowAlert(prev => ({...prev , success: false}))} dismissible >
            Movie details updated successfully!
        </Alert>
        <Alert show={showAlert.error} variant="danger"  onClose={() => setShowAlert(prev => ({...prev , error: false}))} dismissible >
            Error updating movie details. Please try again.
        </Alert>
        <h2 className="text-center">
            <span className="heading-highlight">🎬 {isEdit ? "Edit Movie" : "View Movie"}: {movie.id}</span>
        </h2>
        
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              disabled={!isEdit} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Release year</Form.Label>
            <Form.Control 
              name="release_year" 
              value={formData.release_year} 
              onChange={handleChange} 
              disabled={!isEdit} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Form.Control 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              disabled={!isEdit} 
            />
          </Form.Group>

          <Button 
                variant="outline-secondary"
                onClick={() => navigate('/movies')}
                style={{ marginRight: '10px' }} 
            >
            <ArrowLeft className="me-2" />
            Back
          </Button>
          {isEdit && (
            <>
              {/* <Button variant="danger" onClick={handleDelete}>Delete</Button> */}
              <Button variant="success" onClick={handleSubmit}>Submit</Button>
            </>
          )}
        </Form>
      </div>
  );
};

export default MovieDetails;
