import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? children : <Navigate to={'/sign-in'} />;
}
