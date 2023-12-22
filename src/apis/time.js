import axios from 'axios';

export const getCurrentTime = async (area, location, region) => {
  const endpoint = `http://worldtimeapi.org/api/timezone/${area}/${location}/${region}`;
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching current time:', error);
    throw error;
  }
};
