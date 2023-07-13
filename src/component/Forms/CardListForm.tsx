import React from 'react';
import cardStore from "../../store/CardStore";
import { observer } from "mobx-react";
import './css/CardList.css';

const CardListForm: React.FC = observer(() => {
    const { cardList } = cardStore;

    const generateRandomBalance = () => {
        return Math.floor(Math.random() * 10000) + 1;
    };

    return (
        <div className="card-list-form">
            <form className="card-list-container">
                <div className="card-list-scroll">
                    {cardList.map((card) => (
                        <div
                            className={`card-list-item ${card.cardType === 'Visa' ? 'visa' : 'mastercard'}`}
                            key={card._id}
                        >
                            <div className="card-list-number">{card.cardNumber}</div>
                            <div className="card-list-owner">{card.cardHolder}</div>
                            <div className="card-list-cvc">{card.cvc}</div>
                            <div className="card-list-type">{card.cardType}</div>
                            <div className="card-list-balance">Баланс: {generateRandomBalance()} USD</div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
});

export default CardListForm;
