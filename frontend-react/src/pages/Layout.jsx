import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <div className="header-container-box">
                <h2 onClick={() => navigate('/')}>Movie DB</h2>
                <div className="header-nav-buttons">
                    {token ? (
                        <Button onClick={handleLogout}>Logout</Button>
                    ) : (
                        <>
                            <Button onClick={() => navigate('/register')}>Register</Button>
                            <Button onClick={() => navigate('/login')} >Login</Button>
                        </>
                    )}
                </div>
            </div>

            <div className="container-box">
                <main >
                    {children}
                </main>
            </div>
        </>
    );
};

export default Layout;