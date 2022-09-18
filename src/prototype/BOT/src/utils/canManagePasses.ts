import axios from "axios";

export const canManagePasses = async (id: number): Promise<boolean> => {
  let canManagePasses = false;

  await axios.get<{
    canManagePasses: boolean
  }>(`http://127.0.0.1:3000/api/v1/users/${id}`).then(async (res) => {
    if (res.status === 200) {
      if (res.data.canManagePasses) {
        canManagePasses = true;
      }
    }
  }).catch((err) => {
    if (err.response?.status === 404) {
      canManagePasses = false;
    }
  })

  return canManagePasses;
}