import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  CategoryListI,
  ChatListI,
  CompanyI,
  EventsResponse,
  MasterInterface,
  PackageI,
  UserGroupI,
  DiscountsNames,
  industryListI,
} from "./model";
import { BASE_URL } from "../constant/env";
import { CHAT_APP_AUTH } from "./constant";
class MRegisterService {
  instance: AxiosInstance;
  chatInstance: AxiosInstance;
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
    this.chatInstance = axios.create({
      baseURL: "https://staging-chat.meattend.com/api",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 300000,
    });
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
    this.chatInstance.interceptors.request.use(
      (config) => {
        const userAuth = localStorage.getItem("access_token");
        if (userAuth) {
          config.headers.Authorization = CHAT_APP_AUTH;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  getEvents = async (
    values: string
  ): Promise<AxiosResponse<EventsResponse>> => {
    try {
      return await this.instance.post("/event-list", values);
    } catch (error) {
      return error as Promise<AxiosResponse<EventsResponse>>;
    }
  };
  getCustomerBase = async (
    url: string
  ): Promise<AxiosResponse<MasterInterface>> => {
    console.log(url);
    try {
      return await this.instance.post(url, JSON.stringify({}));
    } catch (error) {
      return error as Promise<AxiosResponse<MasterInterface>>;
    }
  };
  updateCompanyProfile = async (
    values: string
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("", values);
    } catch (error) {
      return error as Promise<AxiosResponse<EventsResponse>>;
    }
  };
  getCompanyProfile = async (): Promise<AxiosResponse<CompanyI>> => {
    try {
      return await this.instance.get("/my-profile");
    } catch (error) {
      return error as Promise<AxiosResponse<CompanyI>>;
    }
  };
  getIndustryList = async (): Promise<AxiosResponse<industryListI>> => {
    try {
      return await this.instance.get("react/industry-list");
    } catch (error) {
      return error as Promise<AxiosResponse<industryListI>>;
    }
  };
  getCatergoryList = async (values: {
    industry_ids: number[];
  }): Promise<AxiosResponse<CategoryListI>> => {
    try {
      return await this.instance.get("react/category-list", { params: values });
    } catch (error) {
      return error as Promise<AxiosResponse<CategoryListI>>;
    }
  };
  discount = async (
    data: string,
    endPoint: string
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(`${endPoint}`, data);
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getServicesPackages = async (): Promise<AxiosResponse<PackageI[]>> => {
    try {
      return await this.instance.post("react/list-package");
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getSearchResults = (
    text: string
  ): Promise<
    AxiosResponse<{
      data: ChatListI[];
      success: boolean;
    }>
  > => {
    try {
      return this.chatInstance.get("search", {
        params: {
          key: text,
        },
      });
    } catch (error) {
      console.log("🚀 ~ MRegisterService ~ error:", error);
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getScannerCode = async (data: any) => {
    try {
      return await this.instance.post("/get-code", data);
    } catch (error) {
      return error;
    }
  };
  saveDiscountCode = async (data: Object) => {
    try {
      return await this.instance.post("/save-discount-count", data);
    } catch (error) {
      return error;
    }
  };
  getDiscountList = async (): Promise<AxiosResponse<DiscountsNames>> => {
    try {
      return await this.instance.post("/discount-list");
    } catch (error) {
      return error as Promise<AxiosResponse<DiscountsNames>>;
    }
  };
  getStaffUsers = async (): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get("/getStaffUsers");
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
}

const MRegisterApiService = new MRegisterService();

export default MRegisterApiService;
