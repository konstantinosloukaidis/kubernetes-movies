import { Table, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../api/axiosApi'; 

const MoviesTable = () => {
  const [movieRatings, setMovieRatigs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/movies")
      .then((res) => setMovieRatigs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h2 className="text-center">
        <span className="heading-highlight">🎬 Movie List</span>
      </h2>
      <Table size='lg' striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Release year</th>
            <th>Average rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movieRatings.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.name}</td>
              <td>{movie.release_year}</td>
              <td>{movie.average_rating}</td>
              <td>
                <Button variant="outline-light" size="sm" onClick={() => navigate(`/movies/${movie.id}`)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MoviesTable;
