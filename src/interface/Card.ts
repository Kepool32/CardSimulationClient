export interface Card {
    _id?:string;
    cardNumber: string;
    cvc: string;
    cardHolder: string;
    expirationDate: string;
    email: string;
    cardType?:string;
    balance?:number;
}


