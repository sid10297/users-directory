import { useContext, useEffect, useState } from "react";
import { getUsers } from "../apis/users";
import { getPosts } from "../apis/posts";
import { UsersContext } from "../contexts/Users";

const USERS_PER_PAGE = 3;

const useFetchUsers = (currentPage = 1) => {
  const { users, setUsers } = useContext(UsersContext);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        const posts = await getPosts();
        // Also associate posts with users by filtering posts by userId and adding to user object.

        setTotalPages(() => Math.ceil(usersData.length / USERS_PER_PAGE));

        const updatedUsersData = usersData
          .map((user) => ({
            ...user,
            posts: posts.filter((post) => post.userId === user.id),
          }))
          .splice(
            currentPage * USERS_PER_PAGE - USERS_PER_PAGE,
            USERS_PER_PAGE
          );
        setUsers(updatedUsersData);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers, currentPage]);

  return { users, loading, error, totalPages };
};

export default useFetchUsers;
