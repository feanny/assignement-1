import { useEffect, useState } from "react";
import "./App.css";
import { IOrderObject, IUserObject, ORDER_TYPES } from "./types";
import PaymentTypes from "./components/PaymentTypes";
import PaymentOptions from "./components/PaymentOptions";

function App() {
  const [user, setUser] = useState<IUserObject | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<number | undefined>(undefined);

  const [orderObject, setOrderObject] = useState<IOrderObject>({
    orderType: ORDER_TYPES.upi,
    amount: 599,
  });

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const initUserData = () => {
    const userObject = {
      name: "Mani Kumar",
      email: "manik@gmail.com",
      address: "123 Street name",
      phoneNumber: 9474920383,
    };
    setUser({ ...userObject });
    setPhoneNumber(userObject.phoneNumber);
  };

  useEffect(() => {
    initUserData();
  }, []);

  const updatePaymentMethod = (method: ORDER_TYPES) => {
    setOrderObject((prev) => ({ ...prev, orderType: method }));
  };

  return (
    <div className="App">
      <div className="container">
        {showPaymentOptions ? (
          orderObject.orderType === ORDER_TYPES.upi ? (
            <PaymentOptions
              onBack={() => {
                setShowPaymentOptions(false);
              }}
              phoneNumber={phoneNumber}
              updatePhoneNumber={(updatedNumber) =>
                setPhoneNumber(updatedNumber)
              }
              amount={orderObject.amount}
            />
          ) : (
            <p>Successfully placed your order!</p>
          )
        ) : (
          <>
            <p className="amount-heading">
              Amount to Pay:{" "}
              <span className="amount">₹{orderObject.amount}</span>
            </p>
            <PaymentTypes
              paymentType={orderObject.orderType}
              updatePaymentType={updatePaymentMethod}
              proceed={() => {
                setShowPaymentOptions(true);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
