import "./pages/main.css";

import {ApiNews} from './scripts/api-news.js';
import {resultsErrorRequest} from './scripts/api-news.js';
import {CardList} from './scripts/results-cardList';
import {resultsErrorSearch} from './scripts/results-cardList';
import {showMoreButton} from './scripts/results-cardList';


/* Запрос к api и отрисовка карточек */


const resultsCardList = document.querySelector('.results__card-container');

const form = document.forms.search;

let now = new Date();

let nowTimestamp = +new Date();
let sevenAgoTimestamp = nowTimestamp - 7 * 86400000;
let sevenAgo = new Date(sevenAgoTimestamp);

form.addEventListener('submit', function(event) {
    event.preventDefault();

    resultsCardList.innerHTML = '';

    resultsErrorSearch.classList.remove('results__error_active');

    resultsErrorRequest.classList.remove('results__error_active');

    const formInput = event.currentTarget.elements.news.value.toLowerCase();

    checkInput(formInput);

    formError.textContent = checkInput(formInput);

    renderSearchButton(formError.textContent);

    localStorage.keyWord = formInput;

    if (renderSearchButton(formError.textContent)) {
        document.querySelector('.results__title-container').classList.add('results__title-container_active');
        document.querySelector('.results__card-container').classList.add('results__card-container_active');

        const url = 'https://newsapi.org/v2/everything?' +
                `q=${formInput}&` +
                `from=${sevenAgo.getFullYear()}-${sevenAgo.getMonth()+1}-${sevenAgo.getDate()}&` +
                `to=${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}&` +
                'sortBy=popularity&' +
                'pageSize=100&' +
                'apiKey=2a167f3597744000b755933294736cac';
        
        const apiNews = new ApiNews(url);

        apiNews.getNews().then((result) => {
            localStorage.resultArray = JSON.stringify(result); // Отправили result в localStorage

            /* Кнопка показать больше */

            const moreCards = (arr) => (event) => {
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

            showMoreButton.addEventListener('click', moreCards(result));

            return new CardList(resultsCardList).showCards(result); // Отправили result на отрисовку
        })

        form.reset();
    } else {
        document.querySelector('.results__title-container').classList.remove('results__title-container_active');
        document.querySelector('.results__card-container').classList.remove('results__card-container_active');
    }
})


/* Валидация формы */


const formError = document.querySelector('.search__error');

const searchButton = document.querySelector('.search__button');

function checkInput(searchInput) {
    if (searchInput.length === 0) {
        return 'Нужно ввести ключевое слово';
    } else {
        return '';
    }
}

function renderSearchButton(text) {
    if (text === '') {
        searchButton.removeAttribute('disabled');

        return true;
    } else {
        searchButton.setAttribute('disabled', true);

        return false;
    }
}

form.addEventListener('input', function(event) {
    event.preventDefault();

    const searchFormInput = event.currentTarget.elements.news.value;

    formError.textContent = checkInput(searchFormInput);

    renderSearchButton(formError.textContent);
})
