import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetchCurrentTime from '../../hooks/useFetchCurrentTime';
import moment from 'moment-timezone';

const ShowCurrentTime = ({ region }) => {
  const { currentTime, loading, error } = useFetchCurrentTime(region);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (currentTime && currentTime.datetime && currentTime.timezone) {
      setElapsedTime(0);
    }
  }, [currentTime]);

  useEffect(() => {
    let timer;

    const updateTimer = () => {
      if (!isPaused) {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }
    };

    timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStart = () => {
    setIsPaused(false);
  };

  let formattedTime;

  if (currentTime && currentTime.datetime && currentTime.timezone) {
    formattedTime = moment
      .tz(currentTime.datetime, currentTime.timezone)
      .add(elapsedTime, 'seconds')
      .format('HH:mm:ss');
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div>Current Time: {formattedTime}</div>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

ShowCurrentTime.propTypes = {
  region: PropTypes.string.isRequired,
};

export default ShowCurrentTime;
