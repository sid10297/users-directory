import { useNavigate } from "react-router-dom";
import useFetchUsers from "../hooks/useFetchUsers";
import styles from "./UsersDirectory.module.css";
import { useState } from "react";

const UsersDirectory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { users, loading, error, totalPages } = useFetchUsers(currentPage);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const renderPagination = () => {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <button
          className={styles.btn}
          style={{
            margin: "0.5rem",
            fontWeight: `${currentPage === i ? "bold" : ""}`,
          }}
          key={i}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pagination;
  };

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
      <div>{renderPagination()}</div>
    </>
  );
};

export default UsersDirectory;
