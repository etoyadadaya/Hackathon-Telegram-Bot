import axios from "axios";

export const canManageRoles = async (id: number): Promise<boolean> => {
  let canManageRoles = false;

  await axios.get<{
    canManageRoles: boolean
  }>(`http://127.0.0.1:3000/api/v1/users/${id}`).then(async (res) => {
    if (res.status === 200) {
      if (res.data.canManageRoles) {
        canManageRoles = true;
      }
    }
  }).catch((err) => {
    if (err.response?.status === 404) {
      canManageRoles = false;
    }
  })

  return canManageRoles;
}