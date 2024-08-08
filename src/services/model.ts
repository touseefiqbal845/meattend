// Multi CheckBox Props
export interface Option {
  id: number;
  name: string;
}

// SignUp Page
export interface PackageI {
  id: string;
  package_name: string;
  package_cost: string;
  package_type: string;
  description: string;
  package_image: string;
  stripe_id: string;
  status: string;
  publish: string;
  type: string;
  package_type_id: string;
  interval: string;
  trial_days: string;
  currency: string;
  isSelected?: boolean;
  package_permission:any[];
}
export interface SignUpOption {
  id: number;
  name: string;
  industry: number;
  selected?: boolean;
}


export interface SubscriptionApiPayload {
  package_id: string;
  package_name: string;
  plan: string;
  trial_days: string;
}
// Login Page

export interface LoginResponseI {
  access_token: string;
  message: string;
}

// getProfile-API Page

export interface MyProfile {
  role_id: number;
  id: number;
  company_name: string;
  stripe_id: string;
  address_proof_image: string;
  package_type: {
    id: number;
    status: number;
  };
  user_subscription: {
    id: number;
    user_id: number;
  };
}

// Event Page
export interface Event {
  id: number;
  event_name: string;
  date_time: string;
  event_address: string;
  geo_location: string;
  lon: string;
  lat: string;
  discount_type: number;
  category_id: number | null;
  description: string;
  discount_code: string | null;
  contact_mail: string;
  event_promoters: string | null;
  created_by: number;
  created_status: number;
  image_access: number;
  recurring_event: number;
  recurring_type: string;
  city_id: number | null;
  held_date_time: string;
  from_time: string;
  to_time: string;
  package_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  show_company_name: number;
  menu_image: string | null;
  is_private: number;
  event_images: any[];
  discount: any | null;
  public_images: any[];
  event_videos: any[];
  // For Dates Format but not actually included in event response
  from_time_formatted: string;
  to_time_formatted: string;
  held_date_time_formatted: string;
}
interface EventModelI {
  current_page: number;
  data: Event[];
  first_page_url: string;
  from: any;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: any;
  total: number;
}
export interface EventsResponse {
  completed?: EventModelI;
  active?: EventModelI;
}
export interface EventRowI {
  id: Readonly<number>;
  image: string;
  eventName: string;
  eventAddress: string;
  dateAndTime: string;
  categories: number;
  attending: number;
  action: "ONGOING" | "COMPLETED" | string;
}
export interface Create_Event_Payload {
  category: string[];
  contact_mail: string;
  created_by: number;
  date_time: string;
  description: string;
  event_address: string;
  event_name: string;
  event_promoters: (null | string)[];
  from_time: string;
  geo_location: string;
  held_date_time: string;
  image: string[];
  image_access: number;
  lat: number;
  lon: number;
  package_id: number;
  show_company_name: number;
  to_time: string;
  menu_image: string[];
  video: string[];
  
  custom_from_date: string;
  custom_to_date: string;

  status: number;
  is_private: number;
  created_status: number;
  recurring_event: number;
  recurring_type: number;
}
interface ParticularEventEventImage {
  id: number;
  event_id: number;
  image: string;
}

interface EventDetails {
  id: number;
  event_name: string;
  date_time: string;
  event_address: string;
  lon: string;
  lat: string;
  discount_type: number;
  category_id: number | null;
  description: string;
  discount_code: string | null;
  created_by: number;
  held_date_time: string;
  from_time: string;
  to_time: string;
  created_at: string;
  updated_at: string;
  show_company_name: number;
  company_name: string;
  contact: string;
  menu_image: string | null;
  is_private: number;
  total_comments: number;
  likes: number;
  rating: number | null;
  attendees: number;
  stream_availability: boolean;
  stream_fee: number[];
  images: Event_Image[];
  videos: any[];
  menus: any[];
  active_promoters: any[];
  reviews: any[];
  comments: any[];
  categories: any[];
  industries: any[];
}

interface Event_Image {
  eventId: number;
  image: string;
  id: number;
  type: string;
  user: string;
}

export interface Event_Detail_Api_Response {
  status: string;
  event_details: ParticularEvent;
}
export interface ParticularEvent {
  id: number;
  event_name: string;
  date_time: string;
  event_address: string;
  lon: string;
  lat: string;
  discount_type: number;
  category_id: number | null;
  description: string;
  discount_code: string | null;
  created_by: number;
  held_date_time: string;
  from_time: string;
  to_time: string;
  created_at: string;
  updated_at: string;
  show_company_name: number;
  company_name: string;
  contact: string;
  menu_image: string | null;
  is_private: number;
  total_comments: number;
  likes: number;
  rating: number | null;
  attendees: number;
  stream_availability: boolean;
  stream_fee: number[];
  images: Event_Image[];
  videos: any[];
  menus: any[];
  active_promoters: any[];
  reviews: any[];
  comments: any[];
  categories: any[];
  industries: any[];

  // For desired Dates Format but not actually included in event details response
  from_time_formatted: string;
  to_time_formatted: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface DiscountsNames {
  current_page: string;
  data: {
    id: Readonly<number>;
    name: string;
    discount_code: string;
  }[];
}
export interface DiscountCode {
  id: number;
  name: string;
  discount_code: string;
}
export interface getLocationAPI {
  id?: number;
  addressOne?: string;
  companyId?: number;
}

// Locations

export interface Location {
  id?: number;
  address_1: string;
  address_2: string;
  address_3: string;
  district: string;
  city: string;
  country: string;
  postal_code: string;
  is_active: number;
  company_id: string;
}

// Staff Page

export interface StaffData {
  company_id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  password: string;
  role: string;
  role_id: number;
  profile_image: string;
}

// Discount Page

export interface Discount {
  discount_code: string;
  end_date: string;
  gprs_status: number;
  name: string;
  start_date: string;
  id?: number;
}

// Billing Page

export interface SubscriptionData {
  status: string;
  invoice: any;
  company: any;
  formattedTotal: any,
  formattedAmount: any,
  formattedTax: any,
}

// Report Charts
export interface AgeI {
  "18_below_years": number;
  "19_25_years": number;
  "26_40_years": number;
  "40_more_years": number;
}
export interface CityI {
  "": number;
}
export interface GenderI {
  female: number;
  male: number;
  others: number;
}
export interface UserGroupI {
  status: string;
  data: GenderI;
}
export interface MasterInterface {
  data: any;
  // data: {
  //   Gender: GenderI;
  //   Age: AgeI;
  //   City: CityI;
  // };
}
export function getCustomerBaseI<T extends keyof MasterInterface>(
  key: T
): MasterInterface[T] {
  return {} as MasterInterface[T];
}

export interface industryListI {
  status: string;
  value: {
    createdAt: Date;
    id: Readonly<number>;
    name: string;
    updatedAt: Date;
  }[];
}
export interface CategoryListI {
  status: string;
  value: {
    category: string;
    id: Readonly<number>;
    industry_id: Readonly<number>;
  }[];
}
interface UserSubscriptionItem {
  id: number;
  subscription_id: number;
  stripe_id: string;
  stripe_plan: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}
interface UserSubscription {
  id: number;
  user_id: number;
  package_id: number;
  package_start_date: string;
  package_end_date: string;
  status: number;
  is_deactive: number;
  registration_id: number;
  name: string;
  stripe_id: string;
  stripe_status: string;
  stripe_plan: string;
  quantity: number;
  trial_ends_at: string | null;
  ends_at: string | null;
  items: UserSubscriptionItem[];
}
interface PackageType {
  id: number;
  package_name: string;
  package_cost: number;
  package_type: string;
  stripe_id: string;
  product_id: string;
  package_image: string;
  description: string;
  status: number;
  publish: number;
  currency: string;
  trial_days: number;
  interval: string;
  created_at: string;
  updated_at: string;
}
export interface CompanyI {
  id: number;
  reference_id: string;
  company_name: string;
  directors_name: string;
  company_government_number: string;
  email: string;
  email_verified_at: string;
  is_active: number;
  is_block: number;
  role_id: number;
  address_proof_image: string;
  company_bill_image: string;
  profile_image: string | null;
  user_token: string;
  session_exp_time: string;
  created_at: string;
  stripe_id: string;
  name: string;
  director_email: string;
  description: string;
  payment_password: string;
  user_subscription: UserSubscription;
  package_type: PackageType;
}

// Whatsapp Chat
export interface SocketLoginI {
  token: string;
  user: {
    activeStatus: boolean;
    blockedList: any[];
    companyName: string;
    companyUser: boolean;
    createdAt: string;
    directorName: string;
    email: string;
    firstName: string;
    friendList: any[];
    inviteList: string[];
    lastName: string;
    lastSeen: string;
    mobileNumber: string;
    online: boolean;
    profile: string;
    reportedList: any[];
    requestList: any[];
    restrictedStatus: boolean;
    sortedList: {
      friend: string;
      message: {
        created_at: string;
        date: string;
        fileType: string[];
        fileUrl: string[];
        message: string;
        receiverId: string;
        senderId: string;
        specialMessage: string;
        status: string;
        updated_at: string;
        __v: number;
        _id: string;
      };
      time: string;
    }[];
    updatedAt: string;
    __v: number;
    _id: string;
  }[];
}
export interface ChatListI {
  activeStatus: boolean;
  blockedList: any[];
  companyName: string;
  companyUser: boolean;
  count: number;
  createdAt: string;
  directorName: string;
  email: string;
  firstName: string;
  friendList: string[];
  inviteList: string[];
  lastMessage: {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    date: string;
    status: "1" | "2" | "3";
    // Add more properties if needed
  };
  lastName: string;
  lastSeen: string;
  mobileNumber: string;
  online: boolean;
  orderTime: string;
  profile: string;
  reportedList: any[];
  requestList: string[];
  restrictedStatus: boolean;
  updatedAt: string;
  __v: number;
  _id: string;
  unReadCount: number;
}
export interface SocketContactsI {
  success: boolean;
  data: ChatListI[];
}

export interface MessageI {
  created_at: Date;
  date: Date;
  fileType: any[];
  fileUrl: any[];
  message: string;
  receiverId: string;
  senderId: string;
  specialMessage: string;
  status: "3" | "2" | "1";
  updated_at: Date;
  __v: 0;
  _id: string;
}
