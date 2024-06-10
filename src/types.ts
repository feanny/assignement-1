export interface IUserObject {
  name: string;
  email: string;
  address: string;
  phoneNumber: number;
}

export enum ORDER_TYPES {
  cod = "cod",
  upi = "upi",
}

export interface IOrderObject {
  orderType: ORDER_TYPES;
  amount: number;
}

export enum IOS_PAYMENT_APPS {
  "phonepe" = "PhonePe",
  "gpay" = "Google Pay",
}

export enum PAYMENT_APPS {
  "phonepe" = "PhonePe",
  "gpay" = "Google Pay",
  "paytm" = "Paytm",
  "bhim" = "BHIM",
}
