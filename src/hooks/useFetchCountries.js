import { useEffect, useState } from 'react';
import { getCountries } from '../apis/countries';

const useFetchCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getCountries();
        const countriesWithValueAndLabel = countries.map((country) => ({
          label: country,
          value: country,
        }));
        setCountries(countriesWithValueAndLabel);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError(error.message || 'Error fetching countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useFetchCountries;
