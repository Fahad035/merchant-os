import api from "./api";

export async function createOrder(
  merchantId: string,
  amount: number,
) {
  const { data } = await api.post(
    "/checkout/create-order",
    {
      merchant_id: merchantId,
      amount,
    },
  );

  return data;
}

export async function verifyPayment(
  payload: {
    merchant_id: string;
    recommendation_id?: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  },
) {
  await api.post("/checkout/verify", payload);
}