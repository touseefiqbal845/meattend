import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./stripeCheck";
import Box from "@mui/material/Box";
import { BallTriangle } from "react-loader-spinner";


import "./Stripe.css";
import MAuthApiService from "../../services/MAuthApiService";

const stripePromise = loadStripe("pk_test_7omRAls8qXz5dYTDUBfVRbBi00qSRMP2U7");

const StripForm: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Stop loading when fetch is complete

      try {
        const responseGetProfile = await MAuthApiService.getProfile();
        const companyId = responseGetProfile.data?.id;
        setCreatedId(companyId);
        const customerID = responseGetProfile.data?.stripe_id;
        setCustomerId(customerID);

        if (companyId && customerID) {
          const response = await fetch(
            "https://staging-api.meattend.com/api/v1/user/setup-intent",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: companyId,
                customer_id: customerID,
              }),
            }
          );
          const data = await response.json();
          console.log("Create Payment Intent Response:", data);

          if (data.client_secret) {
            console.log("Setting clientSecret:", data.client_secret);
            setClientSecret(data.client_secret);
          } else {
            console.error(
              "client_secret is not present in the response:",
              data
            );
          }
        }
      } catch (error) {
        console.error("Error fetching client secret:", error);
      } finally {
        setIsLoading(false); // Stop loading when fetch is complete
      }
    };

    fetchData();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret: clientSecret || undefined,
    appearance: appearance || undefined,
  };

  return (
   
      <div className="Stripe">
    
        {clientSecret && (
          //@ts-ignore
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )
      }
      </div>
  
  );
};

export default StripForm;
