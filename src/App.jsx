import React, { useEffect } from "react";
import AppRoutes from './routes';
import { useDispatch } from 'react-redux';
import { getProfileDetails } from './services/operations/profileAPI';


function App() {

   const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Re-populate Redux state after reload
      dispatch(getProfileDetails());
    }
  }, [dispatch]);

  return <AppRoutes />;
}

export default App
