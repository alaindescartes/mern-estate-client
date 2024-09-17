import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from '../store/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';

function SignIn() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Reset message state before new request
    dispatch(signInStart());

    try {
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return; // Exit if there's an error to prevent navigating
      }

      dispatch(signInSuccess(data));
      navigate('/');
      console.log(currentUser);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        {/* Display error or success message */}
        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Don&#39;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
