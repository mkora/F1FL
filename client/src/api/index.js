import axios from 'axios';

export async function circuits() {
  try {
    const data = await axios.get('/api/circuits');
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}

export async function laps(ids = []) {
  try {
    const data = await axios.get(`/api/laps/${ids.join(',')}`);
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}
