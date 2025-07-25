import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosApi";
import MovieTable from "./MovieTable";

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/movies")
    .then((res) => setMovies(res.data))
    .catch((err) => console.error(err));
  }, []);

  return (
  <div>
    <MovieTable
        movies={movies}
        onView={(id) => navigate(`/movies/${id}`, {state: { edit: false }})}
        onEdit={(id) => navigate(`/movies/${id}`, {state: { edit: true }})}
      />
    </div>
  )
}

export default Home;
