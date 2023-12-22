import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import UserProfile from '../pages/UserProfile';
import UsersDirectory from '../pages/UsersDirectory';
import UsersContextProvider from '../contexts/Users';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/users" />} />
      <Route
        path="/users/*"
        element={
          <UsersContextProvider>
            <Routes>
              <Route index element={<UsersDirectory />} />
              <Route path=":id" element={<UserProfile />} />
            </Routes>
          </UsersContextProvider>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
