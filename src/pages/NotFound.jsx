import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Page request was not found!</h2>
      <button onClick={() => navigate('/')}>Home</button>
    </>
  );
};

export default NotFound;
