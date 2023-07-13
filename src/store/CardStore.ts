import {observable, action} from 'mobx';
import {Card} from "../interface/Card";
import cardApi from "../http/CardAPI";



class CardStore {
    @observable cardList: Card[] = [];
    @observable currencyRates: any = null; // Данные курсов валют
    @observable selectedCurrency: string = "USD"; // Выбранная валюта


    @action
    async fetchCards() {
        try {
            const cards = await cardApi.fetchCards();
            this.cardList = cards;
        } catch (error) {
            console.error('Ошибка при получении карточек:', error);
        }
    }

    @action
    async addCard(cardData: Card) {
        try {
            await cardApi.addCard(cardData);

        } catch (error) {
            console.error('Ошибка при добавлении карточки:', error);
        }
    }

    @action
    async sendConfirmationCodeByEmail(email: string) {
        try {
            await cardApi.sendConfirmationCodeByEmail(email);
            // Действия после успешной отправки кода подтверждения
        } catch (error) {
            console.error('Ошибка при отправке кода подтверждения:', error);
        }
    }

    @action
    async getCardByCode(email: string, code: string) {
        try {
            const card = await cardApi.getCardByCode(email, code);
            this.cardList = [card]; // Сохранение полученных данных карты в свойство cardList
            console.log('Данные карты:', card);
        } catch (error) {
            console.error('Ошибка при получении данных карты:', error);
        }
    }



}

const cardStore = new CardStore();
export default cardStore;
