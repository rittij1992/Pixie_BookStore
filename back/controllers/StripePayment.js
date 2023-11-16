const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET)


exports.createPayment = async (req, res) => {
    try {
        const {amount, currency} = req.body;
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount, currency
            }
        )
        res.status(200).json({
            message: "payment created",
            clientSecret: paymentIntent.client_secret
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}