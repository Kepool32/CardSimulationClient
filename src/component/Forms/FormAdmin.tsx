import React, { useState } from 'react';
import { observer } from 'mobx-react';
import cardStore from '../../store/CardStore';

import './css/FormAdmin.css';
import CardListForm from './CardListForm';

interface FormAdminProps {
    onClose: () => void;
}

const FormAdmin: React.FC<FormAdminProps> = ({ onClose }) => {
    const [password, setPassword] = useState('');
    const [isFormSubmitted, setFormSubmitted] = useState(false);
    const [isWrongPassword, setWrongPassword] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password === 'admin') {
            try {
                await cardStore.fetchCards();
                setFormSubmitted(true);
            } catch (error) {
                console.error('Ошибка при получении карточек:', error);
            }
        } else {
            setWrongPassword(true);
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setWrongPassword(false); // Сбрасываем состояние неправильного пароля при изменении значения
    };

    return (
        <div className="form-admin-container">
            {!isFormSubmitted ? (
                <form className="form-admin" onSubmit={handleSubmit}>
                    <label htmlFor="password" className="form-admin-label">
                        Введите пароль администратора:
                    </label>
                    {isWrongPassword && <p className="wrong-password-text">Неправильный пароль. Попробуйте еще раз.</p>}
                    <input
                        type="password"
                        id="password"
                        className={`form-admin-input ${isWrongPassword ? 'wrong-password' : ''}`}
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />

                    <button type="submit" className="form-admin-submit">
                        Войти
                    </button>
                    <button type="button" className="form-admin-close" onClick={onClose}>
                        Закрыть
                    </button>
                </form>
            ) : (
                <div className="form-admin">
                    <button className="form-admin-close" onClick={onClose}>
                        ✖
                    </button>
                    <CardListForm />
                </div>
            )}
        </div>
    );
};

export default observer(FormAdmin);
