import {loadStripe} from "@stripe/stripe-js";

const publishableKey = process.env.REACT_APP_PUBLISHABLE_KEY
export const stripePromise = loadStripe(publishableKey)