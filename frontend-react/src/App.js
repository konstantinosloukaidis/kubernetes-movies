import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MoviesTable from "./pages/MoviesTable";
import Login from "./pages/Login";
import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Home />} />
          <Route path="/movies" element={<MoviesTable />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
