import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchCountries from '../hooks/useFetchCountries';
import { useContext } from 'react';
import Select from 'react-select';
import ShowCurrentTime from '../components/CurrentTime';
import { UsersContext } from '../contexts/Users';
import useFetchUser from '../hooks/useFetchUser';
import Modal from '../components/Modal/Modal';

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
    <div>
      {/* TOP */}
      <div>
        {/* back btn */}
        <button onClick={() => navigate('/')}>BACK</button>

        {/* dropdown */}
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={countries}
        />

        {/* timer */}
        <ShowCurrentTime region={selectedOption.value} />
      </div>
      <div>
        <div>
          <h2>User Details</h2>
        </div>
        <div>
          {/* name */}
          {/* address */}
          {/* username */}
          {/* catch phrase */}
          {/* email */}
          {/* phone */}
          {displayUser && (
            <>
              <p>{displayUser.name}</p>
              <p>{displayUser.address.city}</p>
              <p>{displayUser.username}</p>
              <p>{displayUser.company.catchPhrase}</p>
              <p>{displayUser.email}</p>
              <p>{displayUser.phone}</p>
            </>
          )}
        </div>
      </div>
      {/* BOTTOM */}
      <div>
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
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
        {/* MODAL -> Open modal on clicking post and close it when clicked outside */}

        {isModalOpen && (
          <Modal content={modalContent} setIsOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
