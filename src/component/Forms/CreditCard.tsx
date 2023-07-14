import React, { useState } from 'react';
import './css/Card.css';
import chip from './image/chip.png';
import CardLogo from "../../hooks/useCardlogo";
import cardStore from "../../store/CardStore";
import {Card} from "../../interface/Card";
import {message} from "antd";







const CreditСard: React.FC = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cvc, setCVV] = useState('');
    const [isCardFlipped, setCardFlipped] = useState(false);
    const [isCVVHovered, setCVVHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [messageText, setMessageText] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);


    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCardNumber(value);
    };

    const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setCardHolder(value);

    };

    const handleExpirationMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setExpirationMonth(e.target.value);
    };

    const handleExpirationYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setExpirationYear(e.target.value);
    };

    const handleCVVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (!isNaN(Number(value))) {
            if (value.length <= 3) {
                setCVV(value);
            } else {
                message.error('Максимальная длина CVV - 3 символа');
            }
        } else {
            message.error('CVV должен быть числом');
        }
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleCVVMouseEnter = () => {
        setCVVHovered(true);
        setCardFlipped(true);
    };

    const handleCVVMouseLeave = () => {
        setCVVHovered(false);
        setCardFlipped(false);
    };

    const flipCard = () => {
        setCardFlipped(!isCardFlipped);
    };




    const handleClick = async () => {
        const expirationDate = `${expirationMonth}/${expirationYear}`;

        const cardData: Card = {
            cardNumber,
            cardHolder,
            expirationDate,
            cvc,
            email,
        };

        try {
            await cardStore.addCard(cardData);
            setMessageText('Карта успешно добавлена.');
            setIsSuccess(true);
        } catch (error) {
            setMessageText('Не удалось добавить карту.');
            setIsSuccess(false);
        }

        message.info(messageText);
    };
    return (
        <div className={`overlay ${isCardFlipped ? 'flipped' : ''}`}>
            <div className="container">
                <div className="card-container">
                    <div className={`front ${isCVVHovered ? 'flipped' : ''}`} >
                        <div className="image">
                            <img src={chip} alt="" className="chip-image" />
                            <CardLogo cardNumber={cardNumber}/>
                        </div>

                        <div className="card-number-box">{cardNumber || '################'}</div>
                        <div className="flexbox">
                            <div className="box">
                                <span>card holder</span>
                                <div className="card-holder-name">{cardHolder || 'full name'}</div>
                            </div>
                            <div className="box">
                                <span>expires</span>
                                <div className="expiration">
                                    <span className="exp-month">{expirationMonth || 'mm'}</span>
                                    /
                                    <span className="exp-year">{expirationYear || 'yy'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`back ${isCardFlipped ? 'flipped' : ''}`} onClick={flipCard}>
                        <div className="stripe"></div>
                        <div className="box">
                            <span>cvv</span>
                            <div className={`cvv-box ${isCVVHovered ? 'flipped' : ''}`}>{cvc}</div>
                            <CardLogo cardNumber={cardNumber}/>
                        </div>
                    </div>
                </div>

                <form >
                    <div className="inputBox">
                        <span>card number</span>
                        <input
                            type="text"
                            maxLength={16}
                            className="card-number-input"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                        />
                    </div>
                    <div className="inputBox">
                        <span>card holder</span>
                        <input
                            type="text"
                            className="card-holder-input"
                            value={cardHolder}
                            onChange={handleCardHolderChange}
                        />
                    </div>
                    <div className="flexbox">
                        <div className="inputBox">
                            <span>expiration mm</span>
                            <select
                                className="month-input"
                                value={expirationMonth}
                                onChange={handleExpirationMonthChange}
                            >
                                <option value="" disabled>
                                    month
                                </option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <span>expiration yy</span>
                            <select
                                className="year-input"
                                value={expirationYear}
                                onChange={handleExpirationYearChange}
                            >
                                <option value="" disabled>
                                    year
                                </option>
                                <option value="21">2021</option>
                                <option value="22">2022</option>
                                <option value="23">2023</option>
                                <option value="24">2024</option>
                                <option value="25">2025</option>
                                <option value="26">2026</option>
                                <option value="27">2027</option>
                                <option value="28">2028</option>
                                <option value="29">2029</option>
                                <option value="30">2030</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <span>cvc</span>
                            <input
                                type="text"
                                maxLength={3}
                                className={`cvv-input ${isCVVHovered ? 'flipped' : ''}`}
                                value={cvc}
                                onChange={handleCVVChange}
                                onMouseEnter={handleCVVMouseEnter}
                                onMouseLeave={handleCVVMouseLeave}
                            />
                        </div>
                    </div>
                    <div className="inputBox">
                        <span>mail</span>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}


                        />
                    </div>
                    <input type="submit" value="submit" className="submit-btn" onClick={handleClick} />

                </form>
            </div>
        </div>
    );
};

export default CreditСard;