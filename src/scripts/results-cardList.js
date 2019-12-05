import {Card} from '../scripts/results-card.js';
import {getMonthName} from '../scripts/help-functions';

export const resultsErrorSearch = document.querySelector('.results__error_search');

export const showMoreButton = document.querySelector('.results__show-more');

export const resultsCardList = document.querySelector('.results__card-container');

export const titleContainer = document.querySelector('.results__title-container');

/* Кнопка показать больше */

export const moreCards = (arr) => (event) => {
    event.preventDefault();

    for(let i = 3; i < arr['totalResults']; i += 3) {
        const arrPart = arr['articles'].splice(`${i}`, 3);

        if (arrPart.length < 3) {
            showMoreButton.classList.remove('results__show-more_active');
        } else {
            showMoreButton.classList.add('results__show-more_active');
        }

        return new CardList(resultsCardList).showMoreCards(arrPart);
    }
}

export class CardList {
    constructor(container) {
        this.container = container;
    }

    showCards(arr) {
        if (arr['totalResults'] === 0) {
            resultsErrorSearch.classList.add('results__error_active');
            showMoreButton.classList.remove('results__show-more_active');
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

    getStorageCards(arr) {
        if (arr['articles'].length === 0) {
            resultsCardList.classList.remove('results__card-container_active');
            titleContainer.classList.add('results__title-container_active');
            resultsErrorSearch.classList.add('results__error_active');
        } else {
            resultsCardList.classList.add('results__card-container_active');
            titleContainer.classList.add('results__title-container_active');
            resultsErrorSearch.classList.remove('results__error_active');
    
            showMoreButton.addEventListener('click', moreCards(arr));

            this.showCards(arr);
        }
    }
}