import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { StaffData } from "./model";
import { BASE_URL } from "../constant/env";

class MUserDashPagesApiService {
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


  // Main Page


  getAllFaqs = async (): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get("/getAllFaqs?type=WEBSITE");
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  // Staff Page 

  craeteStaffUser = async (data: StaffData) => {
    try {
      return await this.instance.post("/createStaffUser", data);
    } catch (error) {
      return error;
    }
  };
  getStaffUsers = async (pageNmber: number): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get(`/getStaffUsers?page=${pageNmber}`);
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  // Services Packages

  getServicesPackages_AgainstUser = async (
    userId: number
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("react/list-package", {
        params: {
          user_id: userId,
        },
      });
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  // Event Details Page

  getEventDetails = async (EventId: number): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("/get-event", { event_id: EventId });
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  // Find Promoter Page
  requestPromoter = async (data: any): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("/request-promoter", data);
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getActivePromotions = async (): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get("/getActivePromotions");
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getCountriesList = async (): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("/react/country-list");
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getCityList = async (country_id: string): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("/react/city-list", {
        country_id: country_id,
      });
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getSuggestedPromoters = async (): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get("/list-promoter");
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getEventsByCompany = async (): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get("/getEventsByCompany");
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  getLinkedPromoters = async ({}): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("/linked-promoter", {});
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  getPromotersList = async (genderselected: string,ageselected:number,searchPromoter: string,cityselected:string): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(`/search-promoter?gender=${genderselected}&search_name=${searchPromoter}&age=${ageselected}&location=${cityselected}`);
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  // Event-History Details

  getEventHistory = async (
    eventId: any,
    sortRating: string = "YEAR",
    sortComment: string = "YEAR",
    sortLike: string = "YEAR",
    sortAttendees: string = "YEAR"
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get(`/react/eventHistory`, {
        params: {
          event_id: eventId,
          sortRating: sortRating,
          sortComment: sortComment,
          sortLike: sortLike,
          sortAttendees: sortAttendees,
        },
      });
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  postComment = async (
    company_id: number,
    comment_id: number,
    comment_reply: String,
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(
        `replyComment?comment_id=${comment_id}&reply=${comment_reply}&replied_type=ADMIN&replied_by=${company_id}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  postReviewReply = async (
    company_id: number,
    rating_id: number,
    rating_reply: String,
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(
        `replyRating?rating_id=${rating_id}&reply=${rating_reply}&reply_type=ADMIN&replied_by=${company_id}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  getBroadcastUrl = async (
    eventIdNumber: number
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.get(
        `ivs/web/get-broadcast-url?event_id=${eventIdNumber}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  LiveStreaming = async (
    eventIdNumber: number,
    channelName: string,
    amount: string,
    currency: string
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post(
        `/ivs/web/create-channel?channelName=${channelName}&event_id=${eventIdNumber}&amount=${amount}.0&currency=${currency}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  endLiveStreaming = async (
    channel_arn: String
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.delete(
        `ivs/web/delete-channel?channelArn=${channel_arn}`
      );
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  // Company-Information Page

  UpdateComapnyProfie = async (data: any): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("/update-profile", data);
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  // Billing Page

  billingInvoice = async (): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("/company/check-invoice");
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
}
const MUserDashboardPagesApiService = new MUserDashPagesApiService();

export default MUserDashboardPagesApiService;
