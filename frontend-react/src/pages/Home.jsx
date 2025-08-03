import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <main >
        <Button onClick={() => navigate('/movies')}>
          📽️ Movies
        </Button>
      </main>
    </div>
  );
}

export default Home;
