import { Routes, Route } from 'react-router-dom';
import AuthLayout  from '../pages/auth/AuthLayout.jsx';
import Error from '../pages/Error.jsx';
import Feed from '../pages/Feed.jsx';
import PrivateRoute from '../pages/auth/PrivateRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route 
          path="/login" 
          element={
            <AuthLayout/>
            }
          />
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
    </Routes>
  );
}