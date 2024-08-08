interface Feature {
    name: string;
    value: number;
    type: "img" | "text";
    align?: "center" | "left" | "right";
    imgName?: "cross" | "check";
  }
  
  interface Plan {
    id: number;
    title: string;
    body?: string;
    amount?: string;
    features: Feature[];
    price: string;
    buttonText: string;
  }
  
  export const tableDataa: Plan[] = [
    {
      id: 1,
      title: "Compare plans",
      body: " Choose your workspace plan according to your organisational plan",
      amount: "£10",
  
      features: [
        { name: "Number of Images", value: 1, type: "text", align: "left" },
        { name: "Number of Video", value: 2, type: "text", align: "left" },
        { name: "Number of Menus", value: 3, type: "text", align: "left" },
        { name: "Extra Free Staff", value: 4, type: "text", align: "left" },
        {
          name: "Advance Analytic Reporting",
          value: 5,
          type: "text",
          align: "left",
        },
        { name: "Advanced Support", value: 6, type: "text", align: "left" },
        { name: "GPRS Marketing", value: 7, type: "text", align: "left" },
        {
          name: "Google feedback integration",
          value: 8,
          type: "text",
          align: "left",
        },
        { name: "Calendar", value: 9, type: "text", align: "left" },
        { name: "AI ChatGP event", value: 10, type: "text", align: "left" },
        {
          name: "Event History Vacuum Analysis",
          value: 11,
          type: "text",
          align: "left",
        },
  
        // Add more features as needed
      ],
      price: "£0",
      buttonText: "Sign Up",
    },
    {
      id: 2,
      title: "",
      body: "Basic package is a 2 year contract package which is free until December 2024 and then £15 per month after that",
      amount: "£100",
  
      features: [
        { name: "3 Images", value: 1, type: "text" },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 2,
          type: "img",
          imgName: "cross",
        },
        { name: "2 Menus", value: 3, type: "text" },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 4,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 5,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 6,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 7,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 8,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 9,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 10,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 11,
          type: "img",
          imgName: "cross",
        },
      ],
      price: "£0",
      buttonText: "Sign Up",
    },
    {
      id: 3,
      title: "",
      body: "Start marketing today with award-winning email and social tools.",
      amount: "£200",
  
      features: [
        { name: "5 Images", value: 1, type: "text" },
        { name: "1 Videos", value: 2, type: "text" },
        { name: "3 Menus", value: 3, type: "text" },
        { name: "2 Staff", value: 4, type: "text" },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 5,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 6,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 7,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 8,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 9,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 10,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 11,
          type: "img",
          imgName: "cross",
        },
      ],
      price: "£0",
      buttonText: "Sign Up",
    },
    {
      id: 4,
      title: "",
      body: "Start marketing today with award-winning email and social tools.",
      amount: "£500",
  
      features: [
        { name: "10 Images", value: 1, type: "text" },
        { name: "3 Videos", value: 2, type: "text" },
        { name: "4 Menus", value: 3, type: "text" },
        { name: "5 Staff", value: 4, type: "text" },
        {
          name: require("../../../assets/icons/check.png"),
          value: 5,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 6,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 7,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 8,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 9,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 10,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 11,
          type: "img",
          imgName: "cross",
        },
        // Add more features as needed
      ],
      price: "£0",
      buttonText: "Sign Up",
    },
    {
      id: 5,
      title: "",
      body: "Start marketing today with award-winning email and social tools.",
      amount: "£1000",
  
      features: [
        { name: "10 Images", value: 1, type: "text" },
        { name: "5 Videos", value: 2, type: "text" },
        { name: "5 Menus", value: 3, type: "text" },
        { name: "10 staff", value: 4, type: "text" },
        {
          name: require("../../../assets/icons/check.png"),
          value: 5,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 6,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 7,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 8,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 9,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 10,
          type: "img",
          imgName: "cross",
        },
        {
          name: require("../../../assets/icons/cross.png"),
          value: 11,
          type: "img",
          imgName: "cross",
        },
        // Add more features as needed
      ],
      price: "£0",
      buttonText: "Sign Up",
    },
    {
      id: 6,
      title: "",
      body: "Start marketing today with award-winning email and social tools.",
      amount: "£4000",
  
      features: [
        { name: "10 Images", value: 1, type: "text" },
        { name: "5 Videos", value: 2, type: "text" },
        { name: "5 Menus", value: 3, type: "text" },
        { name: "25Staff", value: 4, type: "text" },
        {
          name: require("../../../assets/icons/check.png"),
          value: 5,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 6,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 7,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 8,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 9,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 10,
          type: "img",
          imgName: "check",
        },
        {
          name: require("../../../assets/icons/check.png"),
          value: 11,
          type: "img",
          imgName: "check",
        },
  
        // Add more features as needed
      ],
      price: "£0",
      buttonText: "Sign Up",
    },
    // Add more plan data as needed
  ];