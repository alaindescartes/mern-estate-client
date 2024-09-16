import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RootWrapper from './pages/RootWrapper';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useSelector } from 'react-redux';

//creating routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootWrapper />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'about', element: <About /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);
function App() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
