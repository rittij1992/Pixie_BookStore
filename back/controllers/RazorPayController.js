const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// keyId = rzp_test_GJ0bndQHuqv7QU
// keySecret = 8tgsL5BdfVnnOEDfcXQyKSwq

exports.order = async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.RAZOR_KEY_ID,
			key_secret: process.env.RAZOR_KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "USD",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}

exports.verify = async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZOR_KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {

			updateOrder = await Order.findByIdAndUpdate({ _id: order_id },
				{
					order_status: "success"
				});
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}