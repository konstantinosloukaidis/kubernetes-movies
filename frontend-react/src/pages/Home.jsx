import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/movies")
    .then((res) => setMovies(res.data))
    .catch((err) => console.error(err));

  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Movie List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.name}</td>
              <td>{movie.release_year}</td>
              <td>{movie.duration}</td>
              <td>
                <button onClick={() => navigate(`/movies/${movie.id}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
