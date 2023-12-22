import axios from 'axios';

export const getCountries = async () => {
  try {
    const response = await axios.get('http://worldtimeapi.org/api/timezone');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
