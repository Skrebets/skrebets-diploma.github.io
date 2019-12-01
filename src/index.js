import "./pages/main.css";

import {ApiNews} from './scripts/api-news.js';
import {resultsErrorRequest} from './scripts/api-news.js';
import {CardList} from './scripts/results-cardList';
import {resultsErrorSearch} from './scripts/results-cardList';
import {showMoreButton} from './scripts/results-cardList';
import {resultsCardList} from './scripts/results-cardList';
import {showPreloader} from './scripts/help-functions';
import {moreCards} from './scripts/results-cardList';


/* Запрос к api и отрисовка карточек */


const form = document.forms.search;

const formError = document.querySelector('.search__error');
const searchButton = document.querySelector('.search__button');

const now = new Date();

const nowTimestamp = +new Date();
const sevenAgoTimestamp = nowTimestamp - 7 * 86400000;
const sevenAgo = new Date(sevenAgoTimestamp);

function revealStorgeCads(storageContent) {
    if (typeof storageContent === 'undefined') {
        document.querySelector('.results__title-container').classList.remove('results__title-container_active');
        document.querySelector('.results__card-container').classList.remove('results__card-container_active');
        resultsErrorRequest.classList.remove('results__error_active');
        resultsErrorSearch.classList.remove('results__error_active');
    } else {
        const resultArray = JSON.parse(storageContent); // Получаем result из localStorage

        new CardList(resultsCardList).getStorageCards(resultArray);
    }
}

revealStorgeCads(localStorage.resultArray);

form.addEventListener('submit', function(event) {
    event.preventDefault();

    localStorage.clear(); // Очистили localStorage

    resultsCardList.innerHTML = '';

    resultsErrorSearch.classList.remove('results__error_active');

    resultsErrorRequest.classList.remove('results__error_active');

    const formInput = event.currentTarget.elements.news.value.toLowerCase();

    checkInput(formInput);

    formError.textContent = checkInput(formInput);

    renderSearchButton(formError.textContent);

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

        apiNews.getNews()
            .then((result) => {
                localStorage.resultArray = JSON.stringify(result); // Отправили result в localStorage

                localStorage.keyWord = formInput;
                    
                showMoreButton.addEventListener('click', moreCards(result));

                return new CardList(resultsCardList).showCards(result); // Отправили result на отрисовку
            })

            .catch((err) => {
                showPreloader(false);

                console.log(err);

                resultsErrorRequest.classList.add('results__error_active');
            })


    } else {
        showMoreButton.classList.remove('results__show-more_active');
    }
})


/* Валидация формы */


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
