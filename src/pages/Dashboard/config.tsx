import { SvgIcon } from "@mui/material";
import { ReactComponent as DashboardIcon } from "../../assets/navIcons/dashboard.svg";
import { ReactComponent as DashboardIconA } from "../../assets/navIcons/dashboard_a.svg";
import { ReactComponent as EventsIcon } from "../../assets/navIcons/event.svg";
import { ReactComponent as EventsIconA } from "../../assets/navIcons/event_a.svg";
import { ReactComponent as ReportIcon } from "../../assets/navIcons/report.svg";
import { ReactComponent as ReportIconA } from "../../assets/navIcons/report_a.svg";
import { ReactComponent as PromotersIcon } from "../../assets/navIcons/promoters.svg";
import { ReactComponent as PromotersIconA } from "../../assets/navIcons/promoters_a.svg";
import { ReactComponent as CompanyIcon } from "../../assets/navIcons/information.svg";
import { ReactComponent as CompanyIconA } from "../../assets/navIcons/information_a.svg";
import { ReactComponent as LocationIcon } from "../../assets/navIcons/location.svg";
import { ReactComponent as LocationIconA } from "../../assets/navIcons/location_a.svg";
import { ReactComponent as ScanIcon } from "../../assets/navIcons/scan.svg";
import { ReactComponent as ScanIconA } from "../../assets/navIcons/scan_a.svg";
import { ReactComponent as DiscountIcon } from "../../assets/navIcons/discount.svg";
import { ReactComponent as DiscountIconA } from "../../assets/navIcons/discount_a.svg";
import { ReactComponent as ServiceIcon } from "../../assets/navIcons/services.svg";
import { ReactComponent as ServiceIconA } from "../../assets/navIcons/services_a.svg";
import { ReactComponent as StaffIcon } from "../../assets/navIcons/staff.svg";
import { ReactComponent as StaffIconA } from "../../assets/navIcons/staff_a.svg";
import { ReactComponent as BillingIcon } from "../../assets/navIcons/billing.svg";
import { ReactComponent as BillingIconA } from "../../assets/navIcons/billing_a.svg";
import { ReactComponent as TicketIcon } from "../../assets/navIcons/ticket.svg";
import { ReactComponent as TicketIconA } from "../../assets/navIcons/ticket_a.svg";
import { ReactComponent as OrdersIcon } from "../../assets/navIcons/shopping-bag.svg";
import { ReactComponent as OrdersIconA } from "../../assets/navIcons/shopping-bagA.svg";

import { ReactComponent as ProIcon } from "../../assets/navIcons/pro.svg";

export const items = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <DashboardIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <DashboardIconA />
      </SvgIcon>
    ),
  },
  {
    id: 2,
    title: "All Events",
    path: "/events",
    icon: (
      <SvgIcon fontSize="small">
        <EventsIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <EventsIconA />
      </SvgIcon>
    ),
  },
  {
    id: 3,
    title: "Guestlist",
    path: "/guestlist",
    icon: (
      <SvgIcon fontSize="small">
        <EventsIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <EventsIconA />
      </SvgIcon>
    ),
  },
  {
    id: 4,
    title: "Buy Pro to unlock",
    path: "/event",
    icon: (
      <SvgIcon fontSize="small">
        <ProIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <ProIcon />
      </SvgIcon>
    ),
  },
  {
    id: 5,
    title: "Basic Reports",
    path: "/reports",
    icon: (
      <SvgIcon fontSize="small">
        <ReportIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <ReportIconA />
      </SvgIcon>
    ),
  },
  // {
  //   id: 6,
  //   title: "Advanced Analytics",
  //   path: "/analytics",
  //   subPath: ["/analyticalevent", "/analyticaEventHistory"],
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ReportIcon />
  //     </SvgIcon>
  //   ),
  //   activeIcon: (
  //     <SvgIcon fontSize="small">
  //       <ReportIconA />
  //     </SvgIcon>
  //   ),
  // },
  {
    id: 7,
    title: "Find Promoters",
    path: "/promoters",
    icon: (
      <SvgIcon fontSize="small">
        <PromotersIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <PromotersIconA />
      </SvgIcon>
    ),
  },
  {
    id: 8,
    title: "Company Information",
    path: "/companyInfo",
    icon: (
      <SvgIcon fontSize="small">
        <CompanyIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <CompanyIconA />
      </SvgIcon>
    ),
  },
  {
    id: 9,
    title: "Location",
    path: "/location",
    icon: (
      <SvgIcon fontSize="small">
        <LocationIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <LocationIconA />
      </SvgIcon>
    ),
  },
  {
    id: 10,
    title: "Scan Entry",
    path: "/scan",
    icon: (
      <SvgIcon fontSize="small">
        <ScanIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <ScanIconA />
      </SvgIcon>
    ),
  },
  {
    id: 11,
    title: "Discount",
    path: "/discounts",
    icon: (
      <SvgIcon fontSize="small">
        <DiscountIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <DiscountIconA />
      </SvgIcon>
    ),
  },
  {
    id: 12,
    title: "Services",
    path: "/services",
    icon: (
      <SvgIcon fontSize="small">
        <ServiceIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <ServiceIconA />
      </SvgIcon>
    ),
  },
  {
    id: 13,
    title: "Staff",
    path: "/staffs",
    icon: (
      <SvgIcon fontSize="small">
        <StaffIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <StaffIconA />
      </SvgIcon>
    ),
  },
  {
    id: 14,
    title: "Billing",
    path: "/billings",
    icon: (
      <SvgIcon fontSize="small">
        <BillingIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <BillingIconA />
      </SvgIcon>
    ),
  },
  {
    id: 15,
    title: "Ticket",
    // path can be create ticket or ticket
    path: "/ticket",
    subPath: ["/createTicket"],

    // path: "/ticket",
    icon: (
      <SvgIcon fontSize="small">
        <TicketIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <TicketIconA />
      </SvgIcon>
    ),
  },
  {
    id: 16,
    title: "Orders",
    // path can be create ticket or ticket
    path: "/orders",
    // subPath: ["/createTicket"],

    icon: (
      <SvgIcon fontSize="small">
        <OrdersIcon />
      </SvgIcon>
    ),
    activeIcon: (
      <SvgIcon fontSize="small">
        <OrdersIconA />
      </SvgIcon>
    ),
  },

  // {
  //   title: "Settings",
  //   path: "/settings",
  //   // icon: (
  //   //   <SvgIcon fontSize="small">
  //   //     <CogIcon />
  //   //   </SvgIcon>
  //   // ),
  // },
  // {
  //   title: "Login",
  //   path: "/auth/login",
  //   // icon: (
  //   //   <SvgIcon fontSize="small">
  //   //     <LockClosedIcon />
  //   //   </SvgIcon>
  //   // ),
  // },
  // {
  //   title: "Register",
  //   path: "/auth/register",
  //   // icon: (
  //   //   <SvgIcon fontSize="small">
  //   //     <UserPlusIcon />
  //   //   </SvgIcon>
  //   // ),
  // },
  // {
  //   title: "Error",
  //   path: "/404",
  //   // icon: (
  //   //   <SvgIcon fontSize="small">
  //   //     <XCircleIcon />
  //   //   </SvgIcon>
  //   // ),
  // },
];

export function getList(id: number) {
  //Admins can see on see the dashboard, events, basic reports, find promoters, scanner, tickets, orders and  discounts  tabs.
  if (id === 1) {
    return items;
    // return items.filter(
    //   (item) =>
    //     item.id === 1 ||
    //     item.id === 2 ||
    //     item.id === 5 ||
    //     item.id === 7 ||
    //     item.id === 10 ||
    //     item.id === 11 ||
    //     item.id === 15
    // );
    // manager can see all tabs
  } else if (id === 2) {
    return items;

    //manager can see all tabs except billing page
  } else if (id == 3) {
    return items;
    // return items.filter((item) => item.id !== 14);
  }
}
