import { useMemo } from "react";
import { IOS_PAYMENT_APPS, PAYMENT_APPS } from "../../types";
import "./index.css";

interface IPaymentOptionsProps {
  onBack: () => void;
  phoneNumber?: number;
  updatePhoneNumber: (phoneNumber: number) => void;
  amount: number;
}

function PaymentOptions(props: IPaymentOptionsProps) {
  const { onBack, phoneNumber, updatePhoneNumber, amount } = props;

  const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const isAndroid = () => {
    return /Android/i.test(navigator.userAgent);
  };

  const sendPaymentLink = async () => {
    try {
      const response = await fetch("localhost:8080/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount, phone_number: phoneNumber }),
      });
    } catch (error) {}
  };

  const onClickOption = async (option: keyof typeof PAYMENT_APPS) => {
    try {
      const response = await fetch(`localhost:8080/${option}`, {
        method: "GET",
      });
    } catch (error) {}
  };

  return (
    <div className="main-container">
      <div className="back-btn-container">
        <button
          className="back-btn"
          onClick={onBack}
        >{`< Payment Type`}</button>
      </div>
      <p className="amount-heading">
        Amount to Pay: <span className="amount">₹{amount}</span>
      </p>
      <div className="options-container">
        {isIOS() || isAndroid() ? (
          <>
            <p className="options-heading">Pay using UPI Apps</p>

            {Object.keys(isIOS() ? IOS_PAYMENT_APPS : PAYMENT_APPS).map(
              (app) => (
                <button
                  className="app-btn"
                  key={app}
                  onClick={() => {
                    onClickOption(app as keyof typeof PAYMENT_APPS);
                  }}
                >
                  {PAYMENT_APPS[app as keyof typeof PAYMENT_APPS]}
                </button>
              )
            )}
          </>
        ) : (
          <p className="no-payment-options">No Payment options</p>
        )}

        <p className="or-text">OR</p>
        <p className="link-heading">Get Payment Link</p>
        <p className="link-sub-heading">You will get a payment link on</p>
        <div className="input-container">
          <p className="country-code">+91 - </p>
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => {
              updatePhoneNumber(parseInt(e.target.value));
            }}
            className="number-input"
          />
          <button
            className="send-btn"
            disabled={!phoneNumber}
            style={{ cursor: phoneNumber ? "pointer" : "not-allowed" }}
            onClick={sendPaymentLink}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentOptions;
