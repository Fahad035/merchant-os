import razorpay

from app.core.config import settings


class RazorpayService:

    def __init__(self):

        self.client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET,
            )
        )

    def create_order(
        self,
        amount: int,
    ):

        return self.client.order.create(
            {
                "amount": amount,
                "currency": "INR",
                "payment_capture": 1,
            }
        )

    def verify(
        self,
        payment_id: str,
        order_id: str,
        signature: str,
    ):

        self.client.utility.verify_payment_signature(
            {
                "razorpay_order_id": order_id,
                "razorpay_payment_id": payment_id,
                "razorpay_signature": signature,
            }
        )

        return True