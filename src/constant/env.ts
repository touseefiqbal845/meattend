var BASE_URL: string | undefined = "";
var IMAGE_URL: string | undefined = "";
if (process.env.NODE_ENV === "development") {
  BASE_URL = process.env.REACT_APP_BASE_URL;
  IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = process.env.REACT_APP_BASE_URL;
  IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
}
//! STAGING URL NOT SET RIGHT NOW

export { BASE_URL, IMAGE_URL };

export const PAGES: string[] = [
  "Home",
  "About Us",
  "How it Works",
  "In-Sight",
  "Pricing",
  "Contact Us",
];
