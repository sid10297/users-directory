import { useEffect, useState } from 'react';
import { getCurrentTime } from '../apis/time';
import { extractedValues } from '../utils';

const useFetchCurrentTime = (region) => {
  const [currentTime, setCurrentTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const extractedLocationArr = extractedValues(region);

    const fetchCurrentTime = async () => {
      try {
        const response = await getCurrentTime(extractedLocationArr);
        setCurrentTime(response);
      } catch (error) {
        console.error('Error fetching current time:', error);
        setError(error.message || 'Error fetching current time');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentTime();
  }, [region]);

  return { currentTime, loading, error };
};

export default useFetchCurrentTime;
