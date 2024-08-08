const obj: { id: number | undefined } = {
  id: undefined,
};
const saveRoleId = (role_id: number) => {
  obj.id = role_id;
  localStorage.setItem("role_id", role_id.toString());
};
const saveCompanyInfo = (companyInfo: any) => {
  localStorage.setItem("companyInfo", JSON.stringify(companyInfo));
};
const getCompanyInfo = () => {
  const companyInfo = localStorage.getItem("companyInfo");
  if (companyInfo) {
    return JSON.parse(companyInfo);
  }
  return null;
};
const getRoleId: () => number = () => {
  if (!obj.id) {
    const role_id = localStorage.getItem("role_id");
    if (role_id) {
      obj.id = parseInt(role_id);
    }
    return obj.id || 0;
  }

  return obj.id || 0;
};
export { saveRoleId, getRoleId, saveCompanyInfo, getCompanyInfo };
