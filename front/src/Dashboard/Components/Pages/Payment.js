import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './PaymentForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OCKcnSDU5t4Ug5wTU8Q149707OMgFbwBqPD0368AIYdzqVTm6d6zbL7zWUhw6wWloxnoKnHtuU2MXrLM66PsmEo00jB9Qj3dO');

export default function Payment() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'pi_3OD0IfSDU5t4Ug5w0x9yIml5_secret_1RRQRF4VBHW0LHN7ckIVRYAT4',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};