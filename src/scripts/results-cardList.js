import {Card} from '../scripts/results-card.js';
import {getMonthName} from '../scripts/help-functions';

export const resultsErrorSearch = document.querySelector('.results__error_search');

export const showMoreButton = document.querySelector('.results__show-more');

export class CardList {
    constructor(container) {
        this.container = container;
    }

    showCards(arr) {
        if (arr['totalResults'] === 0) {
            resultsErrorSearch.classList.add('results__error_active');
        } else {
            resultsErrorSearch.classList.remove('results__error_active');

            if (arr['totalResults'] <= 3) {
                for(let i = 0; i < arr['totalResults']; i++) {
                    const { cardElement } = new Card(arr['articles'][i]['urlToImage'], `${arr['articles'][i]['publishedAt'].substring(8, 10)} ${getMonthName(arr['articles'][i]['publishedAt'])}, ${arr['articles'][i]['publishedAt'].substring(0, 4)}`, arr['articles'][i]['title'], arr['articles'][i]['description'], arr['articles'][i]['url'], arr['articles'][i]['source']['name']);

                    this.container.appendChild(cardElement);

                    showMoreButton.classList.remove('results__show-more_active');
                }
            } else {
                for(let i = 0; i < 3; i++) {
                    const { cardElement } = new Card(arr['articles'][i]['urlToImage'], `${arr['articles'][i]['publishedAt'].substring(8, 10)} ${getMonthName(arr['articles'][i]['publishedAt'])}, ${arr['articles'][i]['publishedAt'].substring(0, 4)}`, arr['articles'][i]['title'], arr['articles'][i]['description'], arr['articles'][i]['url'], arr['articles'][i]['source']['name']);

                    this.container.appendChild(cardElement);

                    showMoreButton.classList.add('results__show-more_active');
                }
            }
        }
    }

    showMoreCards(arr) {
        for(let i = 0; i < arr.length; i++) {
            const { cardElement } = new Card(arr[i]['urlToImage'], `${arr[i]['publishedAt'].substring(8, 10)} ${getMonthName(arr[i]['publishedAt'])}, ${arr[i]['publishedAt'].substring(0, 4)}`, arr[i]['title'], arr[i]['description'], arr[i]['url'], arr[i]['source']['name']);

            this.container.appendChild(cardElement);
        }
    }
}