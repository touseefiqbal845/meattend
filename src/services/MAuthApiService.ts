import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { LoginResponseI, MyProfile } from "./model";
import { BASE_URL } from "../constant/env";
class MAuthService {
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

  requestDemoApi = async (values: string): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("react/request-demo", values);
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  contactUsApi = async (values: string): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("react/contact-us", values);
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };
  subscribeNewsletterApi = async (
    values: string
  ): Promise<AxiosResponse<any>> => {
    try {
      return await this.instance.post("react/subscribeNewsletter", values);
    } catch (error) {
      return error as Promise<AxiosResponse<any>>;
    }
  };

  loginApi = async (data: string): Promise<AxiosResponse<LoginResponseI>> => {
    try {
      return await this.instance.post("react/login", data);
    } catch (error) {
      return error as AxiosResponse<LoginResponseI>;
    }
  };
  getProfile = async (): 
  Promise<AxiosResponse<MyProfile>> => {
    try {
      return await this.instance.get("/my-profile");
    } catch (error) {
      return error as Promise<AxiosResponse<MyProfile>>;
    }
  };

  getAddeventApi = async (): 
  Promise<AxiosResponse<void>> => {
    try {
      return await this.instance.get("/add-event");
    } catch (error) {
      return error as Promise<AxiosResponse<void>>;
    }
  };

  getRoleAccess = async (): // values: string
  Promise<AxiosResponse<void>> => {
    try {
      return await this.instance.get("/role-access");
    } catch (error) {
      return error as Promise<AxiosResponse<void>>;
    }
  };
  verifyAccount = async (verifyCode: string): Promise<AxiosResponse<void>> => {
    try {
      return await this.instance.post(`react/account-confirm?verify=${verifyCode}`);
    } catch (error) {
      return error as Promise<AxiosResponse<void>>;
    }
  };
  
  


}
const MAuthApiService = new MAuthService();

export default MAuthApiService;


// class ApiEndpoints {
//   private static BASE_URL = 'https://staging-api.meattend.com';
//   private static BASE_URL_MEDIA_ENGINE =
//     'https://staging-mediaengine.meattend.com/';
//   private static GOOGLE_URL = 'https://maps.googleapis.com/maps';
//   private static API_KEY_GOOGLE = 'AIzaSyAUEQwqCZvOHZZXlhGqEwVTL4vQhZR9Ri8';
//   private static CHAT_APP_AUTH =
//     'Basic Y2hhdC5hYWxhdmFpLmNvbTpjMmRiMWZkMzg5YjI3ODEwZDZmMzI2YzNlN2FjZjc5MDAyNmYwNjIx';
//   private static BASE_RESOURCE_EVENT_IMAGES_URL =
//     'https://staging-resources.meattend.com/images/events';
//   private static BASE_RESOURCE_EVENT_VIDEO_URL =
//     'https://staging-resources.meattend.com/videos/events';
//   private static BASE_RESOURCE_POST_VIDEO_URL =
//     'https://staging-medianengine-ingress.meattend.com';
//   private static BASE_RESOURCE_POST_IMAGES_URL =
//     'https://staging-resources.meattend.com/MeAttend/posts';
//   private static BASE_RESOURCE_MENU_IMAGES_URL =
//     'https://staging-resources.meattend.com/MeAttend/menus';
//   private static BASE_RESOURCE_GALLERY_IMAGES_URL =
//     'https://staging-resources.meattend.com/uploads/users-gallery';
//   private static BASE_RESOURCE_DEFAULT_IMAGES_URL =
//     'https://staging-resources.meattend.com/default/user_profile.png';
//   private static BASE_RESOURCE_DEFAULT_BANNER_URL =
//     'https://staging-resources.meattend.com/default/banner.jpg';
//   private static BASE_CHAT_APPLICATION_URL =
//     'https://staging-chat.meattend.com';
//   private static BASE_TERMS_AND_CONDITIONS =
//     'https://staging-web.meattend.com/termsandcondition/';
//   private static BASE_PRIVACY_POLICY =
//     'https://staging-web.meattend.com/privacypolicy/';

//   static getLoginEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/login`;
//   }
//   static getRegisterationEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/newuser`;
//   }
//   static getVerifyOtpEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/verify_account`;
//   }
//   static getResendOtpEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/resend_otp`;
//   }
//   static getReverseGeoCodeEndpoint(): string {
//     return `${ApiEndpoints.GOOGLE_URL}/api/geocode/json`;
//   }
//   static getGoogleApiKey(): string {
//     return ApiEndpoints.API_KEY_GOOGLE;
//   }
//   static getCategoriesEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/category-list`;
//   }
//   static getIndustriesEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/industry-list`;
//   }
//   static getForgotPasswordEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/user-forgot-password`;
//   }
//   static getChangePasswordEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/change-password`;
//   }
//   static getUpdateUserEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/updateUser`;
//   }
//   static getAllEvents(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/event-list24Hour`;
//   }
//   static getAllCountries(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/country-list`;
//   }
//   static getCityByCountry(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/city-list`;
//   }
//   static getURLForImage(image: string): string {
//     return `${ApiEndpoints.BASE_RESOURCE_EVENT_IMAGES_URL}/${image}`;
//   }
//   static getURLForVideo(image: string): string {
//     return `${ApiEndpoints.BASE_RESOURCE_EVENT_VIDEO_URL}/${image}`;
//   }
//   static getAttendEventEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/attend-event`;
//   }
//   static getUnAttendEventEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/unattendEvent`;
//   }
//   static getLikeEventEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/likeEvent`;
//   }
//   static getunLikeEventEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/unlikeEvent`;
//   }
//   static getFollowEventEnpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/follow-event`;
//   }
//   static getUnFollowEventEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/unfollow-event`;
//   }
//   static getPeopleListEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/people-list`;
//   }
//   static getAllPostEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getAllPosts`;
//   }
//   static getPostImageURL(image: string): string {
//     return `${ApiEndpoints.BASE_RESOURCE_POST_IMAGES_URL}/${image}`;
//   }
//   static getMenuImageURL(image: string): string {
//     return `${ApiEndpoints.BASE_RESOURCE_MENU_IMAGES_URL}/${image}`;
//   }
//   static getGalleryImageURL(image: string): string {
//     return `${ApiEndpoints.BASE_RESOURCE_GALLERY_IMAGES_URL}/${image}`;
//   }
//   static get404DefaultImageURL(): string {
//     return `${ApiEndpoints.BASE_RESOURCE_DEFAULT_IMAGES_URL}`;
//   }
//   static get404DefaultBannerURL(): string {
//     return `${ApiEndpoints.BASE_RESOURCE_DEFAULT_BANNER_URL}`;
//   }
//   static getAllCommentsByPost(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getAllCommentsByPost`;
//   }
//   static getAllCommentsByEvents(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getAllCommentsByEvents`;
//   }
//   static getAddCommentsByPost(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/addCommentToPost`;
//   }
//   static getAddCommentsByEventt(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/addComment`;
//   }
//   static getPostLikeEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/likePost`;
//   }
//   static getPostUnLikeEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/dislikePost`;
//   }
//   static getAllReviewsByEvent(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getAllReviewsByEvent`;
//   }
//   static getSubmitEventReview(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/addReview`;
//   }
//   static getEventDetailsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/view-event`;
//   }
//   static getInitiatePaymentEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/payments/initiateStreamPayment`;
//   }
//   static getEventLiveStreamEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/ivs/get-streaming-url`;
//   }
//   static cancelPaymentEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/payments/cancelStreamPayment`;
//   }
//   static getUpdatePaymentStatusEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/payments/updateStreamPaymentStatus`;
//   }
//   static getNearByEventsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/get_near_events`;
//   }
//   static getAttendingEventsTodayEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/get-attend-event`;
//   }
//   static getPublishPostEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/createPost`;
//   }
//   static getTodayEventsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/todayEvents`;
//   }
//   static getAllEventsByTodayEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getEventsByToday`;
//   }
//   static getUserProfileEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/user-profile`;
//   }
//   static getUserGalleryEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/user-gallery`;
//   }
//   static getProfileGalleryImageURL(image: string): string {
//     console.log(image);
//     return `${ApiEndpoints.BASE_RESOURCE_POST_IMAGES_URL}${image}`;
//   }
//   static getAllAttendingByEvent(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getAttendingByEvent`;
//   }
//   static getFollowUserEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/user-follow`;
//   }
//   static getUnFollowUserEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/user-unfollow`;
//   }
//   static getFindContactsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/searchUserByPhone`;
//   }
//   static getLiveLocationUpdateEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/update-live-location`;
//   }
//   static getFollowingPeopleEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/following-list`;
//   }
//   static getFollowerPeopleEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/followers-list`;
//   }
//   static getL1ReportCategories(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getAllReportL1Categories`;
//   }
//   static getReportEventEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/reportEvent`;
//   }
//   static getShareEventEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/shareEvent`;
//   }
//   static getNotificationsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getAllNotifications`;
//   }
//   static getSearchEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/search`;
//   }
//   static getChatSearchEndpoint(): string {
//     return `${ApiEndpoints.BASE_CHAT_APPLICATION_URL}/api/search`;
//   }
//   static getCreatePrivateEventEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/createPrivateEvent`;
//   }
//   static getAllPrivateEvents(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getPrivateEvents`;
//   }
//   static getPrivateEventDetails(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/viewPrivateEvent`;
//   }
//   static getUpdateAccountEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/updateAccountInformation`;
//   }
//   static getUpdateNotificationSettingsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/updateNotifySettings`;
//   }
//   static getUpdatePrivacySettingsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/updatePrivacySettings`;
//   }
//   static getCreateAccountOnStripeEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/checkAccount`;
//   }
//   static getAllCountrySpecs(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getAllCountrySpecs`;
//   }
//   static getTOSAcceptEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/acceptTOS`;
//   }
//   static getBalancesEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getBalances`;
//   }
//   static getTermsAndConditionsEndpoint(): string {
//     return `${ApiEndpoints.BASE_TERMS_AND_CONDITIONS}`;
//   }
//   static getPrivacyPolicyEndpoint(): string {
//     return `${ApiEndpoints.BASE_PRIVACY_POLICY}`;
//   }
//   static getUpdatePromotionInviteStatus(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/updatePromotionStatus`;
//   }
//   static getPromotedEventsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getPromotedEvents`;
//   }
//   static getRequestFundsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/payments/requestFunds`;
//   }
//   static getAccountDetailsEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/getAccount`;
//   }
//   static getDeleteAccountEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/deleteAccount`;
//   }
//   static getVideoUploadEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL_MEDIA_ENGINE}/`;
//   }
//   static getURLForPostVideo(video: string): string {
//     return `${ApiEndpoints.BASE_RESOURCE_POST_VIDEO_URL}/${video}`;
//   }
//   static getReportPostEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/reportPost`;
//   }
//   static getReportPostCommentEndpoint(): string {
//     return `${ApiEndpoints.BASE_URL}/api/mobile-user/reportPostComment`;
//   }
// }

// export default ApiEndpoints;
