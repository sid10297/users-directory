import { useEffect, useState } from 'react'
import { getCurrentTime } from '../apis/time'

const useFetchCurrentTime = (region) => {
  const [currentTime, setCurrentTime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await getCurrentTime(region)
        setCurrentTime(response)
      } catch (error) {
        console.error('Error fetching current time:', error)
        setError(error.message || 'Error fetching current time')
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentTime()
  }, [region])

  return { currentTime, loading, error }
}

export default useFetchCurrentTime
