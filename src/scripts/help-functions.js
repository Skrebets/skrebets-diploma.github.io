import {showMoreButton} from '../scripts/results-cardList';

export function getMonthName(string) {      // Функция, которая переводит номер месяца в название

    let month = string.substring(5, 7);

    switch (month) {
        case '01': 
            month = 'января';
            break;
        case '02': 
            month = 'февраля';
            break;
        case '03': 
            month = 'марта';
            break;
        case '04': 
            month = 'апреля';
            break;
        case '05': 
            month = 'мая';
            break;
        case '06': 
            month = 'июня';
            break;
        case '07': 
            month = 'июля';
            break;
        case '08': 
            month = 'августа';
            break;
        case '09': 
            month = 'сентября';
            break;
        case '10': 
            month = 'октября';
            break;
        case '11': 
            month = 'ноября';
            break;
        case '12': 
            month = 'декабря';
            break;
    }

    return month;
}

export function getDayAgo(numberOfDays, timestampDate) {        // Функция для расчета дат за numberOfDays дней до текущей даты
    const millisecondsInDay = 86400000;

    const dayAgo = new Date(timestampDate - numberOfDays * millisecondsInDay);

    return dayAgo;
}

export function getDayOfWeek(date) {        // Функция для перевода числового значения дня недели даты в текстовый

    let dayWeek = date.getDay();

    switch (dayWeek) {
        case 0: 
            dayWeek = 'вс';
            break;
        case 1: 
            dayWeek = 'пн';
            break;
        case 2: 
            dayWeek = 'вт';
            break;
        case 3: 
            dayWeek = 'ср';
            break;
        case 4: 
            dayWeek = 'чт';
            break;
        case 5: 
            dayWeek = 'пт';
            break;
        case 6: 
            dayWeek = 'сб';
            break;
    }

    return dayWeek;
}

export function changeTextColor(count, text) {      // Функция, которая меняет цвет текста в столбце гистограммы на черный, если столбец слишком короткий
    count < 2 ? text.style.color = 'black' : false;
}

export function showPreloader(isLoading) {      // Функция, которая показывает или скрывает прелоудер
    const preloaderSpinner = document.querySelector('.results__preloader');

    if (isLoading) {
        preloaderSpinner.classList.add('results__preloader_active');
        showMoreButton.classList.remove('results__show-more_active');
    } else {
        preloaderSpinner.classList.remove('results__preloader_active');
    }
}