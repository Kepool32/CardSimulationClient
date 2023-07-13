import React, { useState } from 'react';
import './Welcome.css';
import ButtonAddCard from './Button/ButtonAddCard';
import ButtonGetCard from './Button/ButtonGetCard';
import ButtonAdmin from "./Button/ButtonAdmin";


const Welcome: React.FC = () => {


    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Добро пожаловать в нашу базу карт!</h1>
            <div className="button-container">
                <ButtonAddCard />
                <ButtonGetCard  />
                <ButtonAdmin/>
            </div>



        </div>
    );
};

export default Welcome;
