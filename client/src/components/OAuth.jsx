import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';

export default function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app); // Get the auth instance from the app

      // Now sign in with popup by passing the auth instance and the provider
      const result = await signInWithPopup(auth, provider);
      console.log('Successfully signed in with Google:', result);
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
