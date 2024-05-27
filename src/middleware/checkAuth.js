// checkAuth.js
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useCheckAuth = () => {
  const navigate = useNavigate();

  return () => {
    const token = Cookies.get('token'); // Kontrolloni nëse token-i ekziston në cookies

    if (!token) {
      navigate('/login');
    }
  };
};

export default useCheckAuth;
