import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { LoginResponseI } from "./TypescriptInterface";
import { BASE_URL } from "../../../constant/env";
class AdminMAuthService {
  instance: AxiosInstance;

  private baseApiUrl: string = BASE_URL!;

  navigatingTimer: number | undefined;

  constructor() {
    this.instance = axios.create({
      baseURL: this.baseApiUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 300000,
    } as AxiosRequestConfig);
    this.instance.interceptors.request.use(
      (config) => {
        const userAuth = localStorage.getItem("access_token");
        if (userAuth) {
          config.headers.Authorization = `Bearer ${userAuth}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  loginApi = async (data: string): Promise<AxiosResponse<LoginResponseI>> => {
    try {
      return await this.instance.post("staffing/admin_login", data);
    } catch (error) {
      return error as AxiosResponse<LoginResponseI>;
    }
  };

  getUserListAdminDashboard = async (pageNumber: NumberConstructor): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(`/staffing/user-list?page=${pageNumber}`);
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  getNewCompaniesListAdminDashboard = async (
    pageNumber: number
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(
        `/staffing/new-company-list?page=${pageNumber}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getExistingCompaniesListAdminDashboard = async (
    pageNumber: number
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(
        `/staffing/exist-company-list?page=${pageNumber}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  async getapproveCompanyAdminDashboard(
    company_id: number
  ): Promise<AxiosResponse<any>> {
    try {
      return await this.instance.post("/staffing/approve_company", {
        company_id,
      });
    } catch (error) {
      return error as AxiosResponse<any>;
    }
  }
  async getrejectCompanyAdminDashboard(
    company_id: number
  ): Promise<AxiosResponse<any>> {
    try {
      return await this.instance.post("/staffing/disapprove_company", {
        company_id,
      });
    } catch (error) {
      return error as AxiosResponse<any>;
    }
  }
  async updateExistingCompanyDetails(data: any): Promise<AxiosResponse<any>> {
    try {
      return await this.instance.post("/staffing/update-profile ", data);
    } catch (error) {
      return error as AxiosResponse<any>;
    }
  }
  async Block_ExistingCompany(company_id: number): Promise<AxiosResponse<any>> {
    try {
      return await this.instance.post("/staffing/block-company", {
        company_id,
      });
    } catch (error) {
      return error as AxiosResponse<any>;
    }
  }

  async getAdminDashboardReports(
    Company_id: number
  ): Promise<AxiosResponse<any>> {
    try {
      return await this.instance.get(
        `/staffing/getAllReportedEvents?company_id=${Company_id}`
      );
    } catch (error) {
      return error as AxiosResponse<any>;
    }
  }
  AdminDashboard_Reports_action_Block_company = async (
    data: any
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(
        `/staffing/updateReportStatus?id=${data?.id}&block_status=${data?.block_status}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  AdminDashboard_Reports_action_Pause_company = async (
    data: any
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(
        `/staffing/updateReportStatus?id=${data?.id}&block_status=${data?.block_status}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  AdminDashboard_LiveStreaming_event_list = async (
    Company_id: number
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get(
        `/staffing/getEventsByCompany?company_id=${Company_id}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
}
const AdminAuthApiService = new AdminMAuthService();

export default AdminAuthApiService;
