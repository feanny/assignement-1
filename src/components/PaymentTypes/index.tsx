import React from "react";
import { ORDER_TYPES } from "../../types";
import "./index.css";

interface PaymentTypesProps {
  paymentType: ORDER_TYPES;
  updatePaymentType: (method: ORDER_TYPES) => void;
  proceed: () => void;
}

function PaymentTypes({
  paymentType,
  updatePaymentType,
  proceed,
}: PaymentTypesProps) {
  return (
    <>
      <p className="heading">Choose Payment method:</p>
      <div className="payment-methods">
        {Object.keys(ORDER_TYPES).map((orderType) => (
          <div className="payment-type" key={orderType}>
            <input
              type="radio"
              id={orderType}
              value={orderType}
              checked={
                paymentType ===
                ORDER_TYPES[orderType as keyof typeof ORDER_TYPES]
              }
              onChange={() =>
                updatePaymentType(
                  ORDER_TYPES[orderType as keyof typeof ORDER_TYPES]
                )
              }
            />
            <p className="payment-text">{orderType}</p>
          </div>
        ))}
      </div>
      <button className="proceed-btn" onClick={proceed}>
        Proceed
      </button>
    </>
  );
}

export default PaymentTypes;
