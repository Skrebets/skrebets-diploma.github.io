import "./pages/main.css";

import {ApiNews} from './scripts/api-news.js';
import {resultsErrorRequest} from './scripts/api-news.js';
import {CardList} from './scripts/results-cardList';
import {resultsErrorSearch} from './scripts/results-cardList';
import {showMoreButton} from './scripts/results-cardList';
import {resultsCardList} from './scripts/results-cardList';
import {showPreloader} from './scripts/help-functions';
import {moreCards} from './scripts/results-cardList';
import {titleContainer} from './scripts/results-cardList';


/* Запрос к api и отрисовка карточек */


const keyApi = '2a167f3597744000b755933294736cac';

const form = document.forms.search;

const formError = document.querySelector('.search__error');
const searchButton = document.querySelector('.search__button');
const inputSearch = document.querySelector('.search__input');

const numberOfDays = 7;

const millisecondsInDay = 86400000;

const now = new Date();

const nowTimestamp = +new Date();
const sevenAgoTimestamp = nowTimestamp - numberOfDays * millisecondsInDay;
const sevenAgo = new Date(sevenAgoTimestamp);

function revealStorgeCads(storageContent, storageKey) {
    if (storageContent === null) {
        titleContainer.classList.remove('results__title-container_active');
        resultsCardList.classList.remove('results__card-container_active');
        resultsErrorRequest.classList.remove('results__error_active');
        resultsErrorSearch.classList.remove('results__error_active');
    } else {
        const resultArray = JSON.parse(storageContent); // Получаем result из localStorage

        const keyWord = storageKey; // Получаем ключевое слово из localStorage

        inputSearch.value = keyWord;

        new CardList(resultsCardList).getStorageCards(resultArray);
    }
}

revealStorgeCads(localStorage.getItem('resultArray'), localStorage.getItem('keyWord'));

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
        titleContainer.classList.add('results__title-container_active');
        resultsCardList.classList.add('results__card-container_active');

        const url = 'https://newsapi.org/v2/everything?' +
                `q=${formInput}&` +
                `from=${sevenAgo.getFullYear()}-${sevenAgo.getMonth()+1}-${sevenAgo.getDate()}&` +
                `to=${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}&` +
                'sortBy=popularity&' +
                'pageSize=100&' +
                `apiKey=${keyApi}`;
        
        const apiNews = new ApiNews(url);

        apiNews.getNews()
            .then((result) => {
                localStorage.setItem('resultArray', JSON.stringify(result)); // Отправили result в localStorage

                localStorage.setItem('keyWord', formInput); // Отправили keyWord в localStorage
                    
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
