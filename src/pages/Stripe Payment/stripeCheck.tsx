// import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// interface BillingDetails {
//   name: string;
//   address: {
//     city: string;
//     line1: string;
//     line2: string;
//   };
// }

// interface CheckoutFormProps {
//   options: {
//     clientSecret: string | undefined;
//     appearance: {
//       theme: string;
//     };
//   };
// }

// const CheckoutForm: React.FC<CheckoutFormProps> = ({ options }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [billingDetails, setBillingDetails] = useState<BillingDetails>({
//     name: "",
//     address: {
//       city: "",
//       line1: "",
//       line2: "",
//     },
//   });

//   const handleBillingInputChange = (
//     e: ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     const fieldArray = name.split("_");
//     if (fieldArray.length === 2) {
//       const field = fieldArray[0] as keyof BillingDetails;
//       const subField = fieldArray[1] as keyof BillingDetails[typeof field];
//       setBillingDetails((prevState) => ({
//         ...prevState,
//         [field]: {
//           ...prevState[field],
//           [subField]: value,
//         },
//       }));
//     } else {
//       const field = name as keyof BillingDetails;
//       setBillingDetails((prevState) => ({
//         ...prevState,
//         [field]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const { setupIntent, error } = await stripe.confirmCardSetup(
//         options.clientSecret!,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement)!,
//             billing_details: billingDetails,
//           },
//         }
//       );

//       if (error) {
//         console.error("Stripe Confirm Setup Intent Error:", error);
//         setMessage(error.message ?? "An unexpected error occurred.");
//       } else if (setupIntent?.status === "requires_action") {
//         // Handle additional authentication
//       } else if (setupIntent?.status === "succeeded") {
//         setMessage("Setup Intent succeeded!");
//       }
//     } catch (error) {
//       console.error(
//         "Unexpected error during setup intent confirmation:",
//         error
//       );
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <div>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={billingDetails.name}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>Address Line 1</label>
//         <input
//           type="text"
//           name="address_line1"
//           value={billingDetails.address.line1}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>Address Line 2</label>
//         <input
//           type="text"
//           name="address_line2"
//           value={billingDetails.address.line2}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>City</label>
//         <input
//           type="text"
//           name="address_city"
//           value={billingDetails.address.city}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <CardElement />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? (
//             <div className="spinner" id="spinner"></div>
//           ) : (
//             "Confirm Setup"
//           )}
//         </span>
//       </button>
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;





// import React, { useEffect, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// interface CardElementStyle {
//   base?: React.CSSProperties & {
//     fontSize?: string;
//   };
//   invalid?: React.CSSProperties;
// }


// interface BillingDetails {
//   name: string;
//   address: {
//     city: string;
//     line1: string;
//     line2: string;
//   };
// }

// interface CheckoutFormProps {
//   options: {
//     clientSecret: string | undefined;
//     appearance: {
//       theme: string;
//     };
//   };
// }

// const CheckoutForm: React.FC<CheckoutFormProps> = ({ options }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [billingDetails, setBillingDetails] = useState({
//     name: "",
//     address: {
//       city: "",
//       line1: "",
//       line2: "",
//     },
//   });

//   const handleBillingInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     const [field, subfield] = name.split("_");

//     if (subfield) {
//       setBillingDetails((prevState) => ({
//         ...prevState,
//         [field]: {
//           ...(prevState[field] || {}),
//           [subfield]: value,
//         },
//       }));
//     } else {
//       setBillingDetails((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const { setupIntent, error } = await stripe.confirmCardSetup(
//         options.clientSecret!,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement)!,
//             billing_details: billingDetails,
//           },
//         }
//       );

//       if (error) {
//         console.error("Stripe Confirm Setup Intent Error:", error);
//         setMessage(error.message ?? "An unexpected error occurred.");
//       } else if (setupIntent?.status === "requires_action") {
//         // Handle additional authentication
//       } else if (setupIntent?.status === "succeeded") {
//         setMessage("Setup Intent succeeded!");
//       }
//     } catch (error) {
//       console.error(
//         "Unexpected error during setup intent confirmation:",
//         error
//       );
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const cardElementOptions = {
//     // Add any CardElement options you need
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <div>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={billingDetails.name}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>Address Line 1</label>
//         <input
//           type="text"
//           name="address_line1"
//           value={billingDetails.address.line1}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>Address Line 2</label>
//         <input
//           type="text"
//           name="address_line2"
//           value={billingDetails.address.line2}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>City</label>
//         <input
//           type="text"
//           name="address_city"
//           value={billingDetails.address.city}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <CardElement
//         id="card-element"
//         options={{
//           //@ts-ignore
//           style: {
//             base: {
//               fontSize: "30px",
//               color: "#32325d",
//               "::placeholder": {
//                 color: "#FFC000",
//               },
//             },
//             invalid: {
//               color: "#fa755a",
//             },
//           } as CardElementStyle,
//         }}
//       />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? (
//             <div className="spinner" id="spinner"></div>
//           ) : (
//             "Confirm Setup"
//           )}
//         </span>
//       </button>
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;




// import React, { useEffect, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// interface CardElementStyle {
//   base?: React.CSSProperties & {
//     fontSize?: string;
//   };
//   invalid?: React.CSSProperties;
// }

// interface CheckoutFormProps {
//   options: {
//     clientSecret: string | undefined;
//     appearance: {
//       theme: string;
//     };
//   };
// }

// const CheckoutForm: React.FC<CheckoutFormProps> = ({ options }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [billingDetails, setBillingDetails] = useState({
//     name: "",
//     address_line1: "",
//     address_line2: "",
//     address_line3: "",
//     address_city: "",
//     password: "",
//   });

//   const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingDetails({
//       ...billingDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     if (!stripe || !options.clientSecret) {
//       return;
//     }

//     stripe.retrieveSetupIntent(options.clientSecret).then(({ setupIntent }) => {
//       switch (setupIntent?.status) {
//         case "succeeded":
//           setMessage("Setup Intent succeeded!");
//           // You may proceed with the next steps (e.g., save the payment method ID).
//           break;
//         case "requires_action":
//           // Additional authentication is required.
//           // You may use setupIntent.client_secret to confirm the Setup Intent.
//           break;
//         case "requires_payment_method":
//           setMessage(
//             "Your payment method was not successful, please try again."
//           );
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe, options.clientSecret]);

//   const handleConfirmSetup = async () => {
//     try {
//       if (!stripe) {
//         console.error("Stripe is not initialized");
//         return;
//       }

//       const result = await stripe.confirmSetup({
//         elements: elements!,
//         confirmParams: {
//           return_url: "https://example.com",
//         },
//       });

//       if (result.error) {
//         console.error("Stripe Confirm Setup Error:", result.error);
//         // Handle the error, inform the user, etc.
//       } else {
//         // console.log("SetupIntent confirmed successfully:", result.setupIntent);
//         // Proceed with the next steps
//       }
//     } catch (error) {
//       console.error("Unexpected error during SetupIntent confirmation:", error);
//       // Handle unexpected errors
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     const cardDetails = {
//       card: {
//         name: "qweee",
//         address_line1: "asssss",
//         address_line2: "aaaaaaa",
//         address_city: "aaaaaaa",
//       },
//       billing_details: billingDetails,
//     };

//     try {
//       const { setupIntent, error } = await stripe.confirmCardSetup(
//         options.clientSecret!,
//         {
//           payment_method: {
//             card: elements.getElement(CardElement)!,
//             billing_details: billingDetails,
//           },
//         }
//       );

//       if (error) {
//         console.error("Stripe Confirm Setup Intent Error:", error);
//         setMessage(error.message ?? "An unexpected error occurred.");
//       } else if (setupIntent?.status === "requires_action") {
//         // Handle additional authentication
//       } else if (setupIntent?.status === "succeeded") {
//         setMessage("Setup Intent succeeded!");
//       }
//     } catch (error) {
//       console.error(
//         "Unexpected error during setup intent confirmation:",
//         error
//       );
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const cardElementOptions = {
//     // Add any CardElement options you need
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <div>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={billingDetails.name}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>Address Line 1</label>
//         <input
//           type="text"
//           name="address_line1"
//           value={billingDetails.address_line1}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>Address Line 2</label>
//         <input
//           type="text"
//           name="address_line2"
//           value={billingDetails.address_line2}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>Address Line 3</label>
//         <input
//           type="text"
//           name="address_line3"
//           value={billingDetails.address_line3}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <div>
//         <label>City</label>
//         <input
//           type="text"
//           name="address_city"
//           value={billingDetails.address_city}
//           onChange={handleBillingInputChange}
//         />
//       </div>
//       <CardElement
//         id="card-element"
//         options={{
//           //@ts-ignore
//           style: {
//             base: {
//               fontSize: "30px",
//               color: "#32325d",
//               "::placeholder": {
//                 color: "#FFC000",
//               },
//             },
//             invalid: {
//               color: "#fa755a",
//             },
//           } as CardElementStyle,
//         }}
//       />
//       {/* <button onClick={handleConfirmSetup}>Confirm SetupIntent</button> */}
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? (
//             <div className="spinner" id="spinner"></div>
//           ) : (
//             "Confirm Setup"
//           )}
//         </span>
//       </button>
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
  
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     if (!paymentIntent) {
  //       setMessage("Something went wrong.");
  //       return;
  //     }

  //     switch (paymentIntent.status) {
  //       case "succeeded":
  //         setMessage("Payment succeeded!");
  //         break;
  //       case "processing":
  //         setMessage("Your payment is processing.");
  //         break;
  //       case "requires_payment_method":
  //         setMessage("Your payment was not successful, please try again.");
  //         break;
  //       default:
  //         setMessage("Something went wrong.");
  //         break;
  //     }
    // });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmCardPayment("seti_1Pad1oLkJmmC2QmLQJKq1ssP_secret_QRW3n7eFoukzJYIesjtx4YQBfkNeEgT", {
        payment_method: "pm_1PacvzLkJmmC2QmLB0sUVcs3",
      });

      if (error) {
        setMessage(error.message || "An unexpected error occurred.");
      } else {
        setMessage("Payment confirmed successfully!");
      }
    } catch (error) {
      setMessage("Error confirming payment.");
      console.error("Error confirming payment:", error);
    }

    setIsLoading(false);
  
  }
  

  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      {/* <PaymentElement id="payment-element" options={{}} /> */}
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
