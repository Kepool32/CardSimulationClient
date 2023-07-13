import React, { useState } from 'react';
import './css/ButtonAddCard.css'
import FormAddCard from "../Forms/FormAddCard";

const ButtonAddCard: React.FC = () => {
    const [isFormVisible, setFormVisible] = useState(false);

    const handleButtonClick = () => {
        setFormVisible(true);
    };

    const closeForm = () => {
        setFormVisible(false);
    };

    return (
        <div >
            <button className="add-card-button" onClick={handleButtonClick}>
                Заполнить карту
            </button>
            {isFormVisible && <FormAddCard onClose={closeForm} />}
        </div>
    );
};

export default ButtonAddCard;
