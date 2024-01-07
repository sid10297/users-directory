import axios from 'axios'

// TODO: Create instances for diff api services

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
