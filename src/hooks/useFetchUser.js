import { useEffect, useState } from 'react';
import { getPosts } from '../apis/posts';
import { getUser } from '../apis/user';

const useFetchUser = (id) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const userData = await getUser(id);
          const posts = await getPosts();
          // Also associate posts with users by filtering posts by userId and adding to user object.
          const updatedUsersData = {
            ...userData,
            posts: posts.filter((post) => post.userId == id),
          };
          setUser(updatedUsersData);
        } catch (error) {
          console.error('Error fetching users:', error);
          setError(error.message || 'Error fetching users');
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [setUser, id]);
  return { user, loading, error };
};

export default useFetchUser;
