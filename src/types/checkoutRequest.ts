export interface CheckoutRequest {
    firstName: string;
    lastName: string;
    email: string;
    tickets: Map<string, bigint>;
}
