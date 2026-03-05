import type Stripe from "stripe"
import { stripe } from "./stripe"

export type ExtendedSubscription = Stripe.Subscription & { current_period_end: number }

type RetrieveResult =
    | ExtendedSubscription
    | { data: ExtendedSubscription }

export async function retrieveSubscription(
    id: string
): Promise<ExtendedSubscription> {

    const res =
        (await stripe.subscriptions.retrieve(id)) as unknown as RetrieveResult

    return "data" in res ? res.data : res
}
