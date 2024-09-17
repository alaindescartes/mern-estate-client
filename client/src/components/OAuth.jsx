import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../store/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app); // Get the auth instance from the app

      // Now sign in with popup by passing the auth instance and the provider
      const result = await signInWithPopup(auth, provider);
      const response = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.displayPhotoURL,
        }),
      });
      const data = await response.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (e) {
      console.log('Could not connect to Google! ' + e);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
