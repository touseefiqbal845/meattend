import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer Dashboard Routes

import HowItWork from "../pages/Home/howWorks";
import Home from "../pages/Home/Home";
import ShowCase from "../pages/Home/ShowCase";
import ContactUs from "../pages/Home/ContactUs";
import Investors from "../pages/Home/Investors";
import AboutUs from "../pages/Home/AboutUs";
import Works from "../pages/Home/Works";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Event from "../pages/Events/Index";
import EventDetails from "../pages/View-Event/index";
import EventHistory from "../pages/View-Event/History";
import Reports from "../pages/Reports/index";
import FindPromoters from "../pages/Find_Promoters";
import PromoterDetails from "../pages/Find_Promoters/PromoterDetails";
import CompanyInformation from "../pages/Company_Information";
import Location from "../pages/Location/index";
import DiscountMain from "../pages/Discount/index";
import Staffs from "../pages/Satffs/index";
import Billings from "../pages/Billing/index";
import Services from "../pages/Service/index";
import StripForm from "../pages/Stripe Payment/StripeCheckoutForm";
import MobileChat from "../pages/Chat/MobileChat";
import Chat from "../pages/Chat/index";
import Scan from "../pages/Scan";
import Main from "../pages/Dashboard/Main";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import { AuthProvider } from "../hooks/useAuth";
import Orders from "../pages/Orders"

// Admin Dashboard Routes

import AdminSignIn from "../pages/Admin_Dashboard/admin-Login";
import AdminUsersManangment from "../pages/Admin_Dashboard/Admin-User-Managment";
import AdminExistingCompanies from "../pages/Admin_Dashboard/Admin-ExistingCompanies";
import AdminNewCompanies from "../pages/Admin_Dashboard/Admin-NewCompanies";
import QRScanner from "../pages/Admin_Dashboard/Admin_Scanners/QR_Scanner";
import LiveStramingDiscount from "../pages/Admin_Dashboard/Admin_LiveStraming/LiveStramingDiscount";
import AdminrReports from "../pages/Admin_Dashboard/Admin_Reports";
import AdminFinace from "../pages/Admin_Dashboard/Admin-Finance";
import AdminReports from "../pages/Admin_Dashboard/Admin_Reports";
import AdminCase from "../pages/Admin_Dashboard/Admin_Cases";
import Ticket from "../pages/Admin_Dashboard/Admin-Ticket";
import CreateTicket from "../pages/Admin_Dashboard/Admin-Ticket/createTicket";
import AdminCases from "../pages/Admin_Dashboard/Admin-Case";
import Analytics from "../pages/Admin_Dashboard/Admin_Analytics";
import AnalyticalEvent from "../pages/Admin_Dashboard/Admin_Analytics/Analytics_event";
import AnalyticalEventHistory from "../pages/Admin_Dashboard/Admin_Analytics/Analytical_history";
import VerifyAccountPage from "../pages/ConfirmAccount";
import MeetingScreen from "../pages/View-Event/StreamingLiveRoom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/*Customer Dashboard Routes */}

          <Route path="/" element={<Home />} />
          <Route path="/showcase" element={<ShowCase />} />
          <Route path="/howitwork" element={<HowItWork />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/works" element={<Works />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Main />} />
          <Route path="/location" element={<Location />} />
          <Route path="/events" element={<Event />} />
          <Route path="/event_details/:eventId" element={<EventDetails />} />
          <Route path="/livepreview" element={<MeetingScreen />} />
          <Route path="/event_history/:eventId" element={<EventHistory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/promoters" element={<FindPromoters />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/main/confirm-account" element={<VerifyAccountPage />} />
          <Route path="/analyticalevent" element={<AnalyticalEvent />} />
          <Route path="/analyticaEventHistory" element={<AnalyticalEventHistory />}/>
          <Route path="/promoters" element={<FindPromoters />} />
          <Route path="/promoter-request" element={<PromoterDetails />} />
          <Route path="/companyInfo" element={<CompanyInformation />} />
          <Route path="/discounts" element={<DiscountMain />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/billings" element={<Billings />} />
          <Route path="/services" element={<Services />} />
          <Route path="/payment" element={<StripForm />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/createTicket" element={<CreateTicket />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/chat/:id" element={<MobileChat />} />

          {/*Admin Dashboard Routes */}

          <Route path="/staffing/login" element={<AdminSignIn />} />
          <Route path="/staffing/users" element={<AdminUsersManangment />} />
          <Route path="/staffing/reports" element={<AdminrReports />} />
          <Route path="/staffing/finance" element={<AdminFinace />} />
          <Route path="/staffing/reports" element={<AdminReports />} />
          <Route path="/staffing/case" element={<AdminCase />} />
          <Route path="/staffing/existingcompanies"  element={<AdminExistingCompanies />} />
          <Route path="/staffing/newcompanines"  element={<AdminNewCompanies />}/>
          <Route path="/staffing/scanner" element={<QRScanner />} />
          <Route path="/staffing/livestreaming" element={<LiveStramingDiscount />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
