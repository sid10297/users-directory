import { useNavigate } from 'react-router-dom';
import useFetchCountries from '../hooks/useFetchCountries';
import { useState } from 'react';
import Select from 'react-select';
import ShowCurrentTime from '../components/CurrentTime';

const UserProfile = () => {
  const navigate = useNavigate();
  const { countries, error, loading } = useFetchCountries();
  const [selectedOption, setSelectedOption] = useState({
    value: 'Asia/Kolkata',
    label: 'Asia/Kolkata',
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
        </div>
      </div>
      {/* BOTTOM */}
      <div>{/* posts.map(post => <div>{post}</div>) -> max 3 in a row */}</div>
      <div>
        {/* MODAL -> Open modal on clicking post and close it when clicked outside */}
      </div>
    </div>
  );
};

export default UserProfile;
