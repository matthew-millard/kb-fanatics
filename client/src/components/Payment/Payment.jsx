/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { CREATE_PAYMENT_INTENT } from "../../utils/mutations";
import { ClipLoader } from "react-spinners";
import styles from "./Payment.module.css";

function Payment({ setPaymentHandler }) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent, { loading, error }] = useMutation(CREATE_PAYMENT_INTENT);

  // Retrieve the cart total
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subTotal * 0.13;
  const shipping = subTotal > 100 ? 0 : 10;
  const total = subTotal + tax + shipping;

  console.log(total);
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#e6f1ff",
        fontSize: "18px",
        "::placeholder": {
          color: "#8892b0",
        },
        backgroundColor: "#010215",
      },
      invalid: {
        color: "#da0016",
        iconColor: "#da0016",
      },
    },
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements has not been properly initialized");
      return;
    }
    try {
      const { data: paymentIntentResponse } = await createPaymentIntent({
        variables: { amount: total * 100 },
      });

      if (!paymentIntentResponse.createPaymentIntent.success) {
        throw new Error("Failed to create payment intent.");
      }

      const paymentMethodResponse = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (paymentMethodResponse.error) {
        throw new Error(paymentMethodResponse.error.message);
      }
      console.log("paymentMethodResponse:", paymentMethodResponse);

      const confirmCardPayment = await stripe.confirmCardPayment(
        paymentIntentResponse.createPaymentIntent.clientSecret,
        {
          payment_method: paymentMethodResponse.paymentMethod.id,
        },
      );

      if (confirmCardPayment.error) {
        throw new Error(confirmCardPayment.error.message);
      }

      if (confirmCardPayment.paymentIntent.status !== "succeeded") {
        throw new Error("Payment could not be processed. Please try again.");
      }

      // Payment was successful. Maybe redirect user or show success message.
      console.log("Payment successful");
      navigate("/success"); // Redirect to the success page
    } catch (stripeError) {
      // Display stripeError.message to the user
      console.error(stripeError.message);
      // Set the error in a state to show in the UI, if needed.
    }
  };

  useEffect(() => {
    if (setPaymentHandler) {
      setPaymentHandler(handleSubmit);
    }
  }, [setPaymentHandler]);

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.heading}>Payment Details</h3>
        <p>Please enter your credit card details below.</p>
      </div>
      <form>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        {loading && <ClipLoader color="#e6f1ff" />}
        {error && <div>Error: {error.message}</div>}
      </form>
    </div>
  );
}

export default Payment;
