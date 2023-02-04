import axios from 'axios';

const API_URL = process.env.REACT_APP_URL;

export async function getBookMark(id) {
  await axios.get(`${API_URL}/bookMarks/bm?id=${id}`).then((res) => console.log(res));
}

export async function createBookMark(data) {
  let resData;
  await axios
    .put(`${API_URL}/bookMarks`, data)
    .then((res) => (resData = res))
    .catch((err) => console.log(err));
  return resData;
}

export async function editBookMark(data) {
  await axios
    .post(`${API_URL}/bookMarks/${data?.id}`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export async function deleteBookMark(data) {
  await axios
    .delete(`${API_URL}/bookMarks/`, { data: data })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

console.log(`ok`);
