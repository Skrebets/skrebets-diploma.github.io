import "./pages/analytics.css";

import {getDayAgo} from './scripts/help-functions.js';
import {getDayOfWeek} from './scripts/help-functions.js';
import {changeTextColor} from './scripts/help-functions.js';


const askTitle = document.querySelector('.ask__request');

const articleWeekNumber = document.querySelector('.ask__week-number');

const titleReferences = document.querySelector('.ask__references-number');

if (typeof localStorage.resultArray === 'undefined') {
    askTitle.textContent = '';

    articleWeekNumber.textContent = '0';

    titleReferences.textContent = '0';


    /* Вписываем нули в гистограмму и ставим им черный цвет */


    document.querySelector('.histogram__column-ref-number_this-day').textContent = '0';
    document.querySelector('.histogram__column-ref-number_sixth-day').textContent = '0';
    document.querySelector('.histogram__column-ref-number_fifth-day').textContent = '0';
    document.querySelector('.histogram__column-ref-number_fouth-day').textContent = '0';
    document.querySelector('.histogram__column-ref-number_third-day').textContent = '0';
    document.querySelector('.histogram__column-ref-number_second-day').textContent = '0';
    document.querySelector('.histogram__column-ref-number_first-day').textContent = '0';

    document.querySelector('.histogram__column-ref-number_this-day').style.color = 'black';
    document.querySelector('.histogram__column-ref-number_sixth-day').style.color = 'black';
    document.querySelector('.histogram__column-ref-number_fifth-day').style.color = 'black';
    document.querySelector('.histogram__column-ref-number_fouth-day').style.color = 'black';
    document.querySelector('.histogram__column-ref-number_third-day').style.color = 'black';
    document.querySelector('.histogram__column-ref-number_second-day').style.color = 'black';
    document.querySelector('.histogram__column-ref-number_first-day').style.color = 'black';


    /* Обнуляем длину столбцов */


    document.querySelector('.histogram__column-rectangle_this-day').style.width = '0%';
    document.querySelector('.histogram__column-rectangle_sixth-day').style.width = '0%';
    document.querySelector('.histogram__column-rectangle_fifth-day').style.width = '0%';
    document.querySelector('.histogram__column-rectangle_fouth-day').style.width = '0%';
    document.querySelector('.histogram__column-rectangle_third-day').style.width = '0%';
    document.querySelector('.histogram__column-rectangle_second-day').style.width = '0%';
    document.querySelector('.histogram__column-rectangle_first-day').style.width = '0%';
} else {
    const resultArray = JSON.parse(localStorage.resultArray); // Получаем result из localStorage

    const keyWord = localStorage.keyWord; // Получаем ключевое слово из localStorage


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
        let arr = [];

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
        let arrDay = [];

        for (let i = 0; i < array['articles'].length; i++) {
            
            array['articles'][i]['publishedAt'].substring(0, 10) === `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` ? arrDay.push(array['articles'][i]) : false;

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


    document.querySelector('.histogram__column-ref-number_this-day').textContent = countKeyReferences(stringThisDay, keyWord);
    document.querySelector('.histogram__column-ref-number_sixth-day').textContent = countKeyReferences(stringSixthDay, keyWord);
    document.querySelector('.histogram__column-ref-number_fifth-day').textContent = countKeyReferences(stringFifthDay, keyWord);
    document.querySelector('.histogram__column-ref-number_fouth-day').textContent = countKeyReferences(stringFouthDay, keyWord);
    document.querySelector('.histogram__column-ref-number_third-day').textContent = countKeyReferences(stringThirdDay, keyWord);
    document.querySelector('.histogram__column-ref-number_second-day').textContent = countKeyReferences(stringSecondDay, keyWord);
    document.querySelector('.histogram__column-ref-number_first-day').textContent = countKeyReferences(stringFirstDay, keyWord);

    changeTextColor(countKeyReferences(stringThisDay, keyWord), document.querySelector('.histogram__column-ref-number_this-day'));
    changeTextColor(countKeyReferences(stringSixthDay, keyWord), document.querySelector('.histogram__column-ref-number_sixth-day'));
    changeTextColor(countKeyReferences(stringFifthDay, keyWord), document.querySelector('.histogram__column-ref-number_fifth-day'));
    changeTextColor(countKeyReferences(stringFouthDay, keyWord), document.querySelector('.histogram__column-ref-number_fouth-day'));
    changeTextColor(countKeyReferences(stringThirdDay, keyWord), document.querySelector('.histogram__column-ref-number_third-day'));
    changeTextColor(countKeyReferences(stringSecondDay, keyWord), document.querySelector('.histogram__column-ref-number_second-day'));
    changeTextColor(countKeyReferences(stringFirstDay, keyWord), document.querySelector('.histogram__column-ref-number_first-day'));


    /* Управляем длинной столбцов гистограммы */


    document.querySelector('.histogram__column-rectangle_this-day').style.width = `${countKeyReferences(stringThisDay, keyWord)}%`;
    document.querySelector('.histogram__column-rectangle_sixth-day').style.width = `${countKeyReferences(stringSixthDay, keyWord)}%`;
    document.querySelector('.histogram__column-rectangle_fifth-day').style.width = `${countKeyReferences(stringFifthDay, keyWord)}%`;
    document.querySelector('.histogram__column-rectangle_fouth-day').style.width = `${countKeyReferences(stringFouthDay, keyWord)}%`;
    document.querySelector('.histogram__column-rectangle_third-day').style.width = `${countKeyReferences(stringThirdDay, keyWord)}%`;
    document.querySelector('.histogram__column-rectangle_second-day').style.width = `${countKeyReferences(stringSecondDay, keyWord)}%`;
    document.querySelector('.histogram__column-rectangle_first-day').style.width = `${countKeyReferences(stringFirstDay, keyWord)}%`;
}
