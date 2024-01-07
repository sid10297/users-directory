import axios from 'axios'

export const getCurrentTime = async (...region) => {
  let endpoint = `http://worldtimeapi.org/api/timezone/${region}`

  try {
    const response = await axios.get(endpoint)
    return response.data
  } catch (error) {
    console.error('Error fetching current time:', error)
    throw error
  }
}
