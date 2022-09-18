import axios from "axios";

export const getPassData = async (id: number) => {
  let pass: {
    id: number,
    status: number,
    date: Date,
    term: Date,
    city: string,
    userId: number,
    createdAt: Date,
    updatedAt: Date
  } = null;
  let errors: any = null;

  await axios.get<{
    id: number,
    status: number,
    date: Date,
    term: Date,
    city: string,
    userId: number,
    createdAt: Date,
    updatedAt: Date
  }>(`http://127.0.0.1:3000/api/v1/passes/${id}`).then((res) => {
    if (res.status === 200) {
      pass = res.data;
    }
  }).catch((err) => {
    if (err.response?.status !== 404) {
      errors = err
    }
  });

  return {pass, errors};
}