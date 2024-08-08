import { time } from "console";


export const customerBaseDifference: { [index: string]: string } = {
  Age: "get-users-by-age",
  Gender: "get-users-by-gender",
  City: "get-users-by-cities",
};

export const companyReachDifference: { [index: string]: string } = {
  City: "city-reach",
  Company: "company-followers",
  Events: "event-reach",
};
export const companyEventsDifference: { [index: string]: string } = {
  Revenue: "event-revenue",
  Attending: "attend-events",
  Discounts: "event-discounts",
};

export const monthsName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WeekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
export const Years = [2020, 2021, 2022, 2023, 2024];

// one uppercase, one lowercase, one number, and at least 8 characters
export const passwordRegix = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
);

export const CHAT_APP_AUTH =
  "Basic Y2hhdC5hYWxhdmFpLmNvbTpjMmRiMWZkMzg5YjI3ODEwZDZmMzI2YzNlN2FjZjc5MDAyNmYwNjIx";

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
