import axios from 'axios';

export async function curcuits() {
  try {
    const data = await axios.get('/api/curcuits');
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}
