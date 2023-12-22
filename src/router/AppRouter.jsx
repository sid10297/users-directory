import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import UserProfile from '../pages/UserProfile';
import UsersDirectory from '../pages/UsersDirectory';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/users/*" element={<UsersDirectory />} />
      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
