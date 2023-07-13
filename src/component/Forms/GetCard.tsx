import React from 'react';
import { observer } from 'mobx-react';
import cardStore from '../../store/CardStore';
import './css/GetCard.css';

const GetCard: React.FC = observer(() => {
    const { cardList } = cardStore;

    const generateRandomBalance = () => {
        return Math.floor(Math.random() * 10000) + 1; // Генерация случайного числа от 1 до 10000
    };

    return (
        <div className="getcard-container">
            {cardList.map((card) => (
                <div
                    className={`getcard-card ${card.cardType === 'Visa' ? 'getcard-card-visa' : 'getcard-card-mastercard'}`}
                    key={card._id}
                >
                    <div className="getcard-card-number">{card.cardNumber}</div>
                    <div className="getcard-card-owner">{card.cardHolder}</div>
                    <div className="getcard-card-cvc">{card.cvc}</div>
                    <div className="getcard-card-type">{card.cardType}</div>
                    <div className="getcard-card-balance">Баланс: {generateRandomBalance()} USD</div>
                </div>
            ))}
        </div>
    );
});

export default GetCard;
