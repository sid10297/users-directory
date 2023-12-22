import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchCountries from '../hooks/useFetchCountries';
import { useContext } from 'react';
import Select from 'react-select';
import ShowCurrentTime from '../components/CurrentTime';
import { UsersContext } from '../contexts/Users';
import useFetchUser from '../hooks/useFetchUser';
import Modal from '../components/Modal/Modal';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const navigate = useNavigate();
  const usersContext = useContext(UsersContext);
  const { id } = useParams();

  const [selectedOption, setSelectedOption] = useState({
    value: 'Asia/Kolkata',
    label: 'Asia/Kolkata',
  });

  const user = usersContext.users.find((user) => user.id == id);

  const {
    countries,
    error: countriesError,
    loading: countriesLoading,
  } = useFetchCountries();

  const {
    user: fetchedUser,
    loading: fetchUserLoading,
    error: fetchUserError,
  } = useFetchUser(user ? null : id);

  if (!user && !fetchedUser) {
    return <p>User not found</p>;
  }

  if (countriesLoading || fetchUserLoading) {
    return <p>Loading...</p>;
  }

  if (countriesError || fetchUserError) {
    return <p>{countriesError || fetchUserError}</p>;
  }

  const displayUser = user || fetchedUser;

  return (
    <>
      {/* TOP */}
      <div className={styles.header}>
        {/* back btn */}
        <button className={styles.btn} onClick={() => navigate('/')}>
          BACK
        </button>

        {/* dropdown */}
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={countries}
        />

        {/* timer */}
        <ShowCurrentTime region={selectedOption.value} />
      </div>
      <div className={styles.user_details_container}>
        <div>
          <h2 className={styles.user_detail_header}>User Details</h2>
        </div>
        <div className={styles.user_detail_card}>
          {/* name */}
          {/* address */}
          {/* username */}
          {/* catch phrase */}
          {/* email */}
          {/* phone */}
          {displayUser && (
            <>
              <div>
                <p>Name: {displayUser.name}</p>
                <p>UserName: {displayUser.username}</p>
                <p>Catch Phrase: {displayUser.company.catchPhrase}</p>
              </div>
              <div>
                <p>Address: {displayUser.address.city}</p>
                <p>Email: {displayUser.email}</p>
                <p>Phone: {displayUser.phone}</p>
              </div>
            </>
          )}
        </div>
      </div>
      {/* BOTTOM */}
      <div className={styles.posts_container}>
        {/* posts.map(post => <div>{post}</div>) -> max 3 in a row */}
        {displayUser.posts.map((post) => (
          <div
            onClick={() => {
              setModalContent({
                title: post.title,
                body: post.body,
              });
              setIsModalOpen(true);
            }}
            key={post.id}
          >
            <p style={{ fontWeight: 'bold' }}>{post.title}</p>
            <p>{post.body}</p>
          </div>
        ))}
        {/* MODAL -> Open modal on clicking post and close it when clicked outside */}

        {isModalOpen && (
          <Modal content={modalContent} setIsOpen={setIsModalOpen} />
        )}
      </div>
    </>
  );
};

export default UserProfile;
