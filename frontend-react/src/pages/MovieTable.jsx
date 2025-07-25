import { Table, Button } from 'react-bootstrap';

const MovieTable = ({ movies, onView, onEdit }) => {

    
  return (
    <div className="container-box">
        <h2 className="text-center">
            <span className="heading-highlight">🎬 Movie List</span>
        </h2>
      <Table size='lg' striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Release year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.name}</td>
              <td>{movie.release_year}</td>
              <td>
                <Button variant="outline-light" size="sm" onClick={() => onView(movie.id)}>View</Button>{' '}
                <Button variant="outline-warning" size="sm" onClick={() => onEdit(movie.id)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MovieTable;
