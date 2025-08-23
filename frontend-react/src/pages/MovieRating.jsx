import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import api from "../api/axiosApi";
import { ArrowLeft } from 'react-bootstrap-icons';
import { Rating } from 'react-simple-star-rating';

const MovieRating = ({ movieId }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [reviewFormatData, setReviewFormData] = useState({});
  const [hasReview, setHasReview] = useState(false);
  const [showAlert, setShowAlert] = useState({
    success: false,
    error: false
  });

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    api.get(`/movies/review/${movieId}`, config)
      .then(res => {
        setReviewFormData(res.data);
        setHasReview(true);
      })
      .catch(err => {
        setHasReview(false);
        console.error("Error fetching review:", err);
      });

  }, [movieId, token]);

  const handleChange = (change) => {
    for (const [key, value] of Object.entries(change)) {
      setReviewFormData(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    api.post(`/movies/review/${movieId}`, reviewFormatData, config)
      .then(() => setShowAlert({ success: true, error: false }))
      .catch(() => setShowAlert({ success: false, error: true }));
  };

  return (
    <>
      { }
      <Alert show={showAlert.success} variant="success" onClose={() => setShowAlert(prev => ({ ...prev, success: false }))} dismissible >
        Movie details updated successfully!
      </Alert>
      <Alert show={showAlert.error} variant="danger" onClose={() => setShowAlert(prev => ({ ...prev, error: false }))} dismissible >
        Error updating movie details. Please try again.
      </Alert>
      <h2 className="text-center">
        <span className="heading-highlight">Your review</span>
      </h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control
            name="review"
            value={reviewFormatData.review}
            onChange={(review) => handleChange({ "review": review.target.value })}
            as="textarea" rows={3}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <div>
            <Rating
              name="rating"
              onClick={(rate) => handleChange({ "rating": rate })}
              initialValue={reviewFormatData.rating || 0}
            />
          </div>
        </Form.Group>

        <Button
          variant="outline-secondary"
          onClick={() => navigate('/movies')}
          style={{ marginRight: '10px' }}
        >
          <ArrowLeft className="me-2" />
          Back
        </Button>
        <>
          <Button variant="success" onClick={handleSubmit}>{hasReview ? "Update review" : "Submit review"}</Button>
        </>

      </Form>
    </>
  );
};

export default MovieRating;
