export interface StaffData {
  company_id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  role: string;
  role_id:number;
  profile_image: string;
}

interface User {
  id: number;
  company_id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  profile_image: string | null;
  role_id: number;
  is_active: number;
  password: string;
  change_password: number;
  created_at: string;
  updated_at: string;
}


export function fetchCreateStaffUser(data: any): Promise<StaffData[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch("https://staging-api.meattend.com/api/createStaffUser", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      resolve(responseData);
    } catch (error) {
      reject(error);
    }
  });
}


export function fetchGetStaffUsers(): Promise<User[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch("https://staging-api.meattend.com/api/getStaffUsers", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      resolve(responseData.data as User[]); 
    } catch (error) {
      reject(error); // Reject with error object
    }
  });
}
