import React from 'react';
import visaImage from '../image/visa.png'
import mastercardImage from '../image/masteror-logo.png'
import discoverImage from '../image/2680178.png'
import amexImage from '../image/unnamed.jpg';

interface CardLogoProps {
    cardNumber: string;
}

const CardLogo: React.FC<CardLogoProps> = ({ cardNumber }) => {
    const detectCardType = (cardNumber: string) => {
        const visaPattern = /^4/;
        const mastercardPattern = /^5[1-5]/;
        const amexPattern = /^3[47]/;
        const discoverPattern = /^6(?:011|5)/;

        if (cardNumber.match(visaPattern)) {
            return visaImage;
        } else if (cardNumber.match(mastercardPattern)) {
            return mastercardImage;
        } else if (cardNumber.match(amexPattern)) {
            return amexImage;
        } else if (cardNumber.match(discoverPattern)) {
            return discoverImage;
        } else {
            return '';
        }
    };

    const cardType = detectCardType(cardNumber);

    return <img src={cardType} alt='' />;
};

export default CardLogo;
