import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
import { ToastProvider } from "react-toast-notifications";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import AppRoutes from "./routes";
import { Elements } from "@stripe/react-stripe-js";  
import { Stripe, loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_7omRAls8qXz5dYTDUBfVRbBi00qSRMP2U7"
) as Promise<Stripe | null>;



function MeAttendApp() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss autoDismissTimeout={5000} >
        <ThemeProvider theme={lightTheme}>
          <Elements stripe={stripePromise}>
            <AppRoutes />
          </Elements>
        </ThemeProvider>
      </ToastProvider>
    </Provider>
  );
}

export default MeAttendApp;
