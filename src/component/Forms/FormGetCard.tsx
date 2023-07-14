import React, { useState } from 'react';
import './css/FormGetCard.css';
import cardStore from "../../store/CardStore";
import GetCard from "./GetCard";

interface FormGetCardProps {
    onClose: () => void;
}

const FormGetCard: React.FC<FormGetCardProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeInputVisible, setCodeInputVisible] = useState(false);
    const [isCardVisible, setCardVisible] = useState(false);
    const [isCodeSent, setCodeSent] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await cardStore.sendConfirmationCodeByEmail(email); // Вызов функции отправки кода на сервер
            setCodeInputVisible(true); // Показать инпут для кода
            setCodeSent(true); // Установить флаг, что код был отправлен
            console.log('Код подтверждения отправлен на почту');
        } catch (error) {
            console.error('Ошибка при отправке кода подтверждения:', error);
        }
    };

    const handleCodeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const card = await cardStore.getCardByCode(email, code); // Вызов функции получения данных карты по коду
            console.log('Данные карты:', card);
            setCardVisible(true); // Показать компонент GetCard
        } catch (error) {
            console.error('Ошибка при получении данных карты:', error);
        }
    };

    const handleCloseClick = () => {
        onClose();
    };

    return (
        <div className="overlay">
            <div className="formgetcard-container">
                <button className="formgetcard-close" onClick={handleCloseClick}>
                    &#x2716;
                </button>
                {!isCodeInputVisible ? (
                    <form className="formgetcard-form" onSubmit={handleEmailSubmit}>
                        <input
                            className="formgetcard-input"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                        />
                        <button className="formgetcard-submit-button" type="submit">
                            Отправить
                        </button>
                    </form>
                ) : (
                    <>
                        {isCodeSent && (
                            <p className="formgetcard-message">
                                Код подтверждения был отправлен на вашу почту.
                            </p>
                        )}
                        <form className="formgetcard-form" onSubmit={handleCodeSubmit}>
                            <input
                                className="formgetcard-input"
                                type="text"
                                value={code}
                                onChange={handleCodeChange}
                                placeholder="Код"
                            />
                            <button className="formgetcard-submit-button" type="submit">
                                Отправить
                            </button>
                        </form>
                        {isCardVisible && <GetCard />}
                    </>
                )}
            </div>
        </div>
    );
};

export default FormGetCard;
