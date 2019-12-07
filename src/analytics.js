import "./pages/analytics.css";

import {getDayAgo} from './scripts/help-functions.js';
import {getDayOfWeek} from './scripts/help-functions.js';
import {changeTextColor} from './scripts/help-functions.js';


const askTitle = document.querySelector('.ask__request');

const articleWeekNumber = document.querySelector('.ask__week-number');

const titleReferences = document.querySelector('.ask__references-number');

const thisDayColumnNumber = document.querySelector('.histogram__column-ref-number_this-day');
const sixthDayColumnNumber = document.querySelector('.histogram__column-ref-number_sixth-day');
const fifthDayColumnNumber = document.querySelector('.histogram__column-ref-number_fifth-day');
const fouthDayColumnNumber = document.querySelector('.histogram__column-ref-number_fouth-day');
const thirdDayColumnNumber = document.querySelector('.histogram__column-ref-number_third-day');
const secondDayColumnNumber = document.querySelector('.histogram__column-ref-number_second-day');
const firstDayColumnNumber = document.querySelector('.histogram__column-ref-number_first-day');

const thisDayColumnRectangle = document.querySelector('.histogram__column-rectangle_this-day');
const sixthDayColumnRectangle = document.querySelector('.histogram__column-rectangle_sixth-day');
const fifthDayColumnRectangle = document.querySelector('.histogram__column-rectangle_fifth-day');
const fouthDayColumnRectangle = document.querySelector('.histogram__column-rectangle_fouth-day');
const thirdDayColumnRectangle = document.querySelector('.histogram__column-rectangle_third-day');
const secondDayColumnRectangle = document.querySelector('.histogram__column-rectangle_second-day');
const firstDayColumnRectangle = document.querySelector('.histogram__column-rectangle_first-day');

if (localStorage.getItem('resultArray') === null) {
    askTitle.textContent = '';

    articleWeekNumber.textContent = '0';

    titleReferences.textContent = '0';


    /* Вписываем нули в гистограмму и ставим им черный цвет */


    thisDayColumnNumber.textContent = '0';
    sixthDayColumnNumber.textContent = '0';
    fifthDayColumnNumber.textContent = '0';
    fouthDayColumnNumber.textContent = '0';
    thirdDayColumnNumber.textContent = '0';
    secondDayColumnNumber.textContent = '0';
    firstDayColumnNumber.textContent = '0';

    thisDayColumnNumber.style.color = 'black';
    sixthDayColumnNumber.style.color = 'black';
    fifthDayColumnNumber.style.color = 'black';
    fouthDayColumnNumber.style.color = 'black';
    thirdDayColumnNumber.style.color = 'black';
    secondDayColumnNumber.style.color = 'black';
    firstDayColumnNumber.style.color = 'black';


    /* Обнуляем длину столбцов */


    thisDayColumnRectangle.style.width = '0%';
    sixthDayColumnRectangle.style.width = '0%';
    fifthDayColumnRectangle.style.width = '0%';
    fouthDayColumnRectangle.style.width = '0%';
    thirdDayColumnRectangle.style.width = '0%';
    secondDayColumnRectangle.style.width = '0%';
    firstDayColumnRectangle.style.width = '0%';
} else {
    const resultArray = JSON.parse(localStorage.getItem('resultArray')); // Получаем result из localStorage

    const keyWord = localStorage.getItem('keyWord') // Получаем ключевое слово из localStorage


    /* Вписываем ключевое слово в "Вы спросили" */


    askTitle.textContent = keyWord.toUpperCase();


    /* Вписываем количество новостей за неделю */


    articleWeekNumber.textContent = resultArray['articles'].length;


    /* Даты */


    const now = new Date(); // Сегодняшняя дата

    const nowTimestamp = +new Date(); // Сегодняшняя дата в timestamp


    /* Даты за numberOfDays дней до текущей даты */


    const nowOneAgo = getDayAgo(1, nowTimestamp);

    const nowTwoAgo = getDayAgo(2, nowTimestamp);

    const nowThreeAgo = getDayAgo(3, nowTimestamp);

    const nowFourAgo = getDayAgo(4, nowTimestamp);

    const nowFiveAgo = getDayAgo(5, nowTimestamp);

    const nowSixAgo = getDayAgo(6, nowTimestamp);


    /* Отрисовка дня месяца и дня недели в диаграме */


    const thisDay = document.querySelector('.histogram__date-number_this-day');
    thisDay.textContent = `${now.getDate()},${getDayOfWeek(now)}`;

    const sixthDay = document.querySelector('.histogram__date-number_sixth-day');
    sixthDay.textContent = `${nowOneAgo.getDate()},${getDayOfWeek(nowOneAgo)}`;

    const fifthDay = document.querySelector('.histogram__date-number_fifth-day');
    fifthDay.textContent = `${nowTwoAgo.getDate()},${getDayOfWeek(nowTwoAgo)}`;

    const fouthDay = document.querySelector('.histogram__date-number_fouth-day');
    fouthDay.textContent = `${nowThreeAgo.getDate()},${getDayOfWeek(nowThreeAgo)}`;

    const thirdDay = document.querySelector('.histogram__date-number_third-day');
    thirdDay.textContent = `${nowFourAgo.getDate()},${getDayOfWeek(nowFourAgo)}`;

    const secondDay = document.querySelector('.histogram__date-number_second-day');
    secondDay.textContent = `${nowFiveAgo.getDate()},${getDayOfWeek(nowFiveAgo)}`;

    const firstDay = document.querySelector('.histogram__date-number_first-day');
    firstDay.textContent = `${nowSixAgo.getDate()},${getDayOfWeek(nowSixAgo)}`;


    /* Получаем массив заголовков или описаний и преобразуем его в строку */


    function getKeyArray(array, key) {
        const arr = [];

        for (let i = 0; i < array.length; i++) {
            arr.push(array[i][key].toLowerCase());
        }

        return arr.join(' ');
    }


    /* Ищем сколько раз ключевое слово попадается в строке */


    function countKeyReferences(string, word) {
        let count = 0;

        let position = string.indexOf(word);

        while (position !== -1) {
            count++;
            position = string.indexOf(word, position + 1);
        }

        return count;
    }


    /* Вписываем количество упоминаний ключевого слова в заголовках в "Упоминаний в заголовках" */


    titleReferences.textContent = countKeyReferences(getKeyArray(resultArray['articles'], 'title'), keyWord);


    /* Получаем массивы статей по дням (каждому дню - массив статей обубликованных в этот день) */


    function separateArticlesForDays(array, date) {
        const arrDay = [];

        for (let i = 0; i < array['articles'].length; i++) {

            if (array['articles'][i]['publishedAt'].substring(0, 10) === `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` || array['articles'][i]['publishedAt'].substring(0, 10) === `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`) {
                arrDay.push(array['articles'][i]);
            }

        }

        return arrDay;
    }

    const arrThisDay = separateArticlesForDays(resultArray, now);
    const arrSixthDay = separateArticlesForDays(resultArray, nowOneAgo);
    const arrFifthDay = separateArticlesForDays(resultArray, nowTwoAgo);
    const arrFouthDay = separateArticlesForDays(resultArray, nowThreeAgo);
    const arrThirdDay = separateArticlesForDays(resultArray, nowFourAgo);
    const arrSecondDay = separateArticlesForDays(resultArray, nowFiveAgo);
    const arrFirstDay = separateArticlesForDays(resultArray, nowSixAgo);


    /* Получаем строки из заголовков и описаний от масивов статей по дням */


    const stringThisDay = getKeyArray(arrThisDay, 'title') + getKeyArray(arrThisDay, 'description');
    const stringSixthDay = getKeyArray(arrSixthDay, 'title') + getKeyArray(arrSixthDay, 'description');
    const stringFifthDay = getKeyArray(arrFifthDay, 'title') + getKeyArray(arrFifthDay, 'description');
    const stringFouthDay = getKeyArray(arrFouthDay, 'title') + getKeyArray(arrFouthDay, 'description');
    const stringThirdDay = getKeyArray(arrThirdDay, 'title') + getKeyArray(arrThirdDay, 'description');
    const stringSecondDay = getKeyArray(arrSecondDay, 'title') + getKeyArray(arrSecondDay, 'description');
    const stringFirstDay = getKeyArray(arrFirstDay, 'title') + getKeyArray(arrFirstDay, 'description');


    /* Вписываем количество упоминаний ключевого слова в строках в гистограмму */


    thisDayColumnNumber.textContent = countKeyReferences(stringThisDay, keyWord);
    sixthDayColumnNumber.textContent = countKeyReferences(stringSixthDay, keyWord);
    fifthDayColumnNumber.textContent = countKeyReferences(stringFifthDay, keyWord);
    fouthDayColumnNumber.textContent = countKeyReferences(stringFouthDay, keyWord);
    thirdDayColumnNumber.textContent = countKeyReferences(stringThirdDay, keyWord);
    secondDayColumnNumber.textContent = countKeyReferences(stringSecondDay, keyWord);
    firstDayColumnNumber.textContent = countKeyReferences(stringFirstDay, keyWord);

    changeTextColor(countKeyReferences(stringThisDay, keyWord), thisDayColumnNumber);
    changeTextColor(countKeyReferences(stringSixthDay, keyWord), sixthDayColumnNumber);
    changeTextColor(countKeyReferences(stringFifthDay, keyWord), fifthDayColumnNumber);
    changeTextColor(countKeyReferences(stringFouthDay, keyWord), fouthDayColumnNumber);
    changeTextColor(countKeyReferences(stringThirdDay, keyWord), thirdDayColumnNumber);
    changeTextColor(countKeyReferences(stringSecondDay, keyWord), secondDayColumnNumber);
    changeTextColor(countKeyReferences(stringFirstDay, keyWord), firstDayColumnNumber);


    /* Управляем длинной столбцов гистограммы */


    thisDayColumnRectangle.style.width = `${countKeyReferences(stringThisDay, keyWord)}%`;
    sixthDayColumnRectangle.style.width = `${countKeyReferences(stringSixthDay, keyWord)}%`;
    fifthDayColumnRectangle.style.width = `${countKeyReferences(stringFifthDay, keyWord)}%`;
    fouthDayColumnRectangle.style.width = `${countKeyReferences(stringFouthDay, keyWord)}%`;
    thirdDayColumnRectangle.style.width = `${countKeyReferences(stringThirdDay, keyWord)}%`;
    secondDayColumnRectangle.style.width = `${countKeyReferences(stringSecondDay, keyWord)}%`;
    firstDayColumnRectangle.style.width = `${countKeyReferences(stringFirstDay, keyWord)}%`;
}
