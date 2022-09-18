import axios from "axios";

export const isADM = async (id: number): Promise<boolean> => {
  let isADM = false;

  await axios.get<{
    canManageRoles: boolean,
    canManagePasses: boolean,
    canFindPasses: boolean
  }>(`http://127.0.0.1:3000/api/v1/users/${id}`).then(async (res) => {
    if (res.status === 200) {
      if (res.data.canManageRoles || res.data.canManagePasses || res.data.canFindPasses) {
        isADM = true;
      }
    }
  }).catch((err) => {
    if (err?.status === 404) {
      isADM = false;
    }
  })

  return isADM;
}
