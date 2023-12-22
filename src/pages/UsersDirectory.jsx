import { useNavigate } from 'react-router-dom';
import useFetchUsers from '../hooks/useFetchUsers';
import styles from './UsersDirectory.module.css';

const UsersDirectory = () => {
  const navigate = useNavigate();
  const { users, loading, error } = useFetchUsers();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className={styles.header}>
        <h2>Users Directory</h2>
      </div>
      <div className={styles.users}>
        {users.map(({ id, name, posts }) => (
          <div
            className={styles.userItem}
            onClick={() => navigate(`/users/${id}`)}
            key={id}
          >
            <p>Name: {name}</p>
            <p>Posts: {posts.length}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersDirectory;
