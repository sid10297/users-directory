import axios from 'axios';

export const getCurrentTime = async (...region) => {
  let endpoint = 'http://worldtimeapi.org/api/timezone/';

  if (region.length > 0) {
    endpoint += region.join('/');
  }

  try {
    const response = await axios.get(endpoint.replace(/,/g, '/'));
    return response.data;
  } catch (error) {
    console.error('Error fetching current time:', error);
    throw error;
  }
};
