import axios from "axios";

export const getUserDataByID = async (id: number): Promise<any> => {
  let passes = [];
  let user: {
    first_name: string,
    middle_name: string,
    last_name: string
  } = null;
  let errors: any = null;

  await axios.get<{
    first_name: string,
    middle_name: string,
    last_name: string,
    passes: {
      status: number,
      date: Date,
      term: Date,
      updatedAt: Date
    }[]
  }>(`http://127.0.0.1:3000/api/v1/users/id/${id}`).then((res) => {
    if (res.status === 200) {
      passes = res.data.passes;
      user = {
        first_name: res.data.first_name,
        middle_name: res.data.middle_name,
        last_name: res.data.last_name
      }
    }
  }).catch((err) => {
    console.log(err)
    if (err.response?.status !== 404) {
      errors = err;
    }
  })

  return {passes, user, errors};
}