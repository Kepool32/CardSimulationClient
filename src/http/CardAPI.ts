import { Card } from "../interface/Card";
import axios from "axios";
import { message } from "antd";

class CardApi {

    REACT_APP_API_URL='https://cardsim.onrender.com/'

    async fetchCards(): Promise<Card[]> {
        try {
            const response = await axios.get(this.REACT_APP_API_URL+'cards');
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении карточек:", error);
            return [];
        }
    }

    async addCard(cardData: Card): Promise<{ success: boolean; message: string }> {
        try {
            await axios.post(this.REACT_APP_API_URL+'cards', cardData);
            return { success: true, message: "Карточка успешно добавлена" };
        } catch (error: any) {
            if (error.response && error.response.data.message === 'Card with this email already exists') {
                // Обработка ошибки, когда на этот email уже есть карточка
                return { success: false, message: "На этот email уже есть карточка" };
            } else {
                console.error("Ошибка при добавлении карточки:", error);
                return { success: false, message: "Ошибка при добавлении карточки" };
            }
        }
    }


    async sendConfirmationCodeByEmail(email: string): Promise<string> {
        try {
            const response = await axios.post(
                this.REACT_APP_API_URL+'cards/email/' + email + "/code"
            );
            return response.data;
        } catch (error) {
            console.error("Ошибка при отправке кода подтверждения:", error);
            message.error("Ошибка при отправке кода подтверждения проверьте правильность email");
            throw error;
        }
    }

    async getCardByCode(email: string, code: string): Promise<Card> {
        try {
            const response = await axios.get(
                this.REACT_APP_API_URL+'cards/email/' + email + "/confirm/" + code
            );
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении данных карты:", error);
            message.error("Ошибка при получении данных карты");
            throw error;
        }
    }
}

const cardApi = new CardApi();
export default cardApi;
