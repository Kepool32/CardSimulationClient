import React, { useState } from 'react';
import './css/ButtonAddCard.css'
import FormGetCard from "../Forms/FormGetCard";


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
                Получить карту
            </button>
            {isFormVisible && <FormGetCard onClose={closeForm} />}
        </div>
    );
};

export default ButtonAddCard;
