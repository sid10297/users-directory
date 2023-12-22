import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UsersContext = createContext(null);

const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

UsersContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UsersContextProvider;
