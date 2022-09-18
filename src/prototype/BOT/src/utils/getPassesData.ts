import axios from "axios";

export const getPassesData = async (id: number) => {
  let passes: {
    id: number,
    status: number,
    date: Date,
    term: Date,
    city: string,
    updatedAt: Date
  }[] = null;
  let errors: any = null;

  await axios.get<{
    id: number,
    status: number,
    date: Date,
    term: Date,
    city: string,
    updatedAt: Date
  }[]>(`http://127.0.0.1:3000/api/v1/users/pass/${id}`).then((res) => {
    if (res.status === 200) {
      passes = res.data;
    }
  }).catch((err) => {
    if (err.response?.status !== 404) {
      errors = err
    }
  });

  return {passes, errors};
}