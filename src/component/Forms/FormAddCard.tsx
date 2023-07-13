import React from 'react';
import './css/FormAddCard.css';
import CreditCard from "./CreditCard";


interface FormAddCardProps {
    onClose: () => void;
}

const FormAddCard: React.FC<FormAddCardProps> = ({ onClose }) => {

    return (
        <div className="form-overlay">

            <div className="form-container">
                <div className="form-wrapper">
                    <h2 className="form-title">Заполнить карту</h2>
                    <CreditCard />
                </div>
                <button className="close-button" onClick={onClose}>
                    &#x2715;
                </button>
            </div>
        </div>
    );
};

export default FormAddCard;
