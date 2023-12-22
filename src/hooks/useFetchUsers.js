import { useContext, useEffect, useState } from 'react';
import { getUsers } from '../apis/users';
import { getPosts } from '../apis/posts';
import { UsersContext } from '../contexts/Users';

const useFetchUsers = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        const posts = await getPosts();
        // Also associate posts with users by filtering posts by userId and adding to user object.
        const updatedUsersData = usersData.map((user) => ({
          ...user,
          posts: posts.filter((post) => post.userId === user.id),
        }));
        setUsers(updatedUsersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message || 'Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers]);

  return { users, loading, error };
};

export default useFetchUsers;
