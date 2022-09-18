import axios from "axios";

export const canFindPasses = async (id: number): Promise<boolean> => {
  let canFindPasses = false;

  await axios.get<{
    canFindPasses: boolean
  }>(`http://127.0.0.1:3000/api/v1/users/${id}`).then(async (res) => {
    if (res.status === 200) {
      if (res.data.canFindPasses) {
        canFindPasses = true;
      }
    }
  }).catch((err) => {
    if (err.response?.status === 404) {
      canFindPasses = false;
    }
  })

  return canFindPasses;
}