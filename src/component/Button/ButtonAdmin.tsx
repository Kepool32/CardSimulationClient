import React, { useState } from 'react';
import './css/ButtonAddCard.css'
import FormAdmin from "../Forms/FormAdmin";



const ButtonAdmin: React.FC = () => {
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
                Войти как администратор
            </button>
            {isFormVisible && <FormAdmin onClose={closeForm} />}
        </div>
    );
};

export default ButtonAdmin;
