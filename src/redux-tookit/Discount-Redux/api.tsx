
interface DiscountResponse {
  current_page: number;
  data: Discount[]; 
  
}
interface Discount {
  id: number;
  name: string;
  discount_code: string;
  start_date: string;
  end_date: string;
}

export function fetchAllDiscountList(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch("https://staging-api.meattend.com/api/discount-list", {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}