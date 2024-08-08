export interface LoginResponseI {
    access_token: string;
    message: string;
  }

//   interface RowData {
//     id: number;
//     issueId: string;
//     summry: string;
//     reporter: { username: string; avatar: string };
//     due_date: string;
// }

  export interface RowData {
    id: number,
    company: string;
    email: string;
    phone: string;
    plan: string;
  
  }
  
  export interface CompanyModel {
    id: number,
    company: string;
    email: string;
    plan: string;
    directorsName: string;
    directorsemail: string;
    company_government_number: string;
    description: string;
    company_bill_image: string;
    address_proof_image: string;
  
  }
  // Existing Comapny Page
  export interface RowDataExistingCompany {
    id: number,
    company: string;
    email: string;
    phone: string;
    plan: string;
    earning: string;
    paying: string;
    followers: string;
    rating: string;
    memebersince: string;
    is_active: number;
    directorName: string,
  }
  
  export interface ExistingCompanyData {
    id: number,
    company: string;
    email: string;
    phone: string;
    plan: string;
    // earning: string;
    // paying: string;
    // followers: string;
    // rating: string;
    memebersince: string;
    is_active: number;
    // directorName: string;
  }

  // Admi_Case Page 
  export interface Admin_Cases_RowData {
    id: number;
    refId: number;
    description: string;
    events: { username: string; avatar: string };
    reporter: { username: string; avatar: string };
    created_date: string;
    closed_date: string;

}
  // Live Streaming Page

  export interface LiveStreamingEvents {
    id: number;
    name: string;
    event_images: string;
  }
  