const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET)


exports.createPayment = async (req, res) => {
    try {
        const {amount, currency} = req.body;
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: amount*100,
                currency,
                description: 'Payment for your awesome product', // Optional description
                automatic_payment_methods: {
                    enabled: true,
                  },
            })
        res.status(200).json({
            message: "payment initiated",
            id: paymentIntent.id,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            "xyz": "error block"
        })
    }
}




// exports.createPayment = async (req, res) => {
//     try {
//         const { product } = req.body;
//         console.log(product, "product");
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "USD",
//                         product_data: {
//                             name: product.name,
//                         },
//                         unit_amount: product.price * 100,
//                     },
//                     quantity: product.qty,
//                 },
//             ],
//             mode: "payment",
//             success_url: "http://localhost:3000/order-success",
//             cancel_url: "http://localhost:3000/cancel",
//         });
//         res.status(201).json({ id: session.id, url: session.success_url });

//     } catch (error) {
//         res.status(400).json({
//             message: error.message,
//             "xyz": "error block"
//         })
//     }
// }