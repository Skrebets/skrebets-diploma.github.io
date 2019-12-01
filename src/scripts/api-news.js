import {showPreloader} from '../scripts/help-functions.js';

export const resultsErrorRequest = document.querySelector('.results__error_request');

export class ApiNews {
    constructor(url) {
        this.url = url;
    }

    getNews() {
        showPreloader(true);

        return fetch(`${this.url}`, {
            method: 'GET'
        })
            .then((res) => {
                if (res.ok) {

                showPreloader(false);
                
                return res.json();
            }
    
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}