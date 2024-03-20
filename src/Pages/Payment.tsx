import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../Components/Page/Payment/PaymentForm";
import { OrderSummary } from "../Components/Page/Order";

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  const stripePromise = loadStripe(
    "pk_test_51OJfecEuShLO0fTS7s9pfvzFsYZZjBE0g3YXPgKJrWxq8zmdTqg9NwC1QSA5T0d2XZOqrc6CMzyWr6kGFhl6Z0gi00btvQW8Pe"
  );

  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container m-5 p-5">
        <div className="row">
          <div className="col-md-7">
            <OrderSummary data={apiResult} userInput={userInput}/>
          </div>
          <div className="col-md-4 offset-md-1">
            <h3 className="text-primary">Payment</h3>
            <div className="mt-5">
            <PaymentForm data={apiResult} userInput={userInput}/>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
