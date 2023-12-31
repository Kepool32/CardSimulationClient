import React, { useState } from 'react';
import './css/Card.css';
import chip from './image/chip.png';
import CardLogo from "../../hooks/useCardlogo";

import {Card} from "../../interface/Card";
import {message} from "antd";
import cardApi from "../../http/CardAPI";






const CreditСard: React.FC = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [cvc, setCVV] = useState('');
    const [isCardFlipped, setCardFlipped] = useState(false);
    const [isCVVHovered, setCVVHovered] = useState(false);
    const [email, setEmail] = useState('');


    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 16) {
            setCardNumber(value);
        } else {
            message.error('Номер карты должен состоять из 16 цифр');
        }
    };

    const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^A-Za-z\s]/g, '').toUpperCase();
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




    const handleClick: React.MouseEventHandler<HTMLInputElement> = async (event) => {
        event.preventDefault();

        const expirationDate = `${expirationMonth}/${expirationYear}`;

        if (cardNumber.length !== 16) {
            message.error('Номер карты должен состоять из 16 цифр');
            return;
        }

        if (!cardHolder) {
            message.error('Пожалуйста, введите имя владельца карты');
            return;
        }

        if (!expirationMonth || !expirationYear) {
            message.error('Пожалуйста, выберите месяц и год истечения срока действия');
            return;
        }

        if (!cvc) {
            message.error('Пожалуйста, введите CVV');
            return;
        }

        if (!email) {
            message.error('Пожалуйста, введите адрес электронной почты');
            return;
        }

        const cardData: Card = {
            cardNumber,
            cardHolder,
            expirationDate,
            cvc,
            email,
        };

        try {
            const response = await cardApi.addCard(cardData);
            if (response.success) {
                message.success(response.message);
                // Ваш код обработки успешного добавления карточки
            } else {
                message.error(response.message);
                // Ваш код обработки ошибки при добавлении карточки
            }

            setCardNumber('');
            setCardHolder('');
            setExpirationMonth('');
            setExpirationYear('');
            setCVV('');
            setEmail('');
        } catch (error) {
            console.error("Ошибка при добавлении карточки:", error);
        }
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
                            pattern="\d{16}"
                            className="card-number-input"
                            value={cardNumber}
                            required
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
                            required
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
                                required
                            />
                        </div>
                    </div>
                    <div className="inputBox">
                        <span>mail</span>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required


                        />
                    </div>
                    <input type="submit" value="submit" className="submit-btn" onClick={handleClick} />

                </form>
            </div>
        </div>
    );
};

export default CreditСard;