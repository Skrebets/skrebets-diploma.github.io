import {Swiper, Navigation, Pagination} from '../../node_modules/swiper/js/swiper.esm.js';
import {CommitCard} from '../scripts/commits-card.js';
import {getMonthName} from '../scripts/help-functions.js';

Swiper.use([Navigation, Pagination]);

export class CommitCardList {
    constructor(container, array) {
        this.container = container;
        this.showCommits(array);
        this.initSwiper();
    }

    showCommits(arr) {
        for (let i = 0; i < arr.length; i++) {
            const { commitElement } = new CommitCard(`${arr[i]['commit']['committer']['date'].substring(8, 10)} ${getMonthName(arr[i]['commit']['committer']['date'])}, ${arr[i]['commit']['committer']['date'].substring(0, 4)}`, arr[i]['author']['avatar_url'], arr[i]['commit']['committer']['name'], arr[i]['commit']['committer']['email'], arr[i]['commit']['message']);
      
            this.container.appendChild(commitElement);
        }
    }

    initSwiper() {
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            centeredSlides: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                  slidesPerView: 'auto',
                  spaceBetween: 8,
                  centeredSlides: false,
                  loop: true,
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 8,
                    centeredSlides: false,
                    loop: true,
                },
                1000: {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    centeredSlides: true,
                    loop: true,
                },
                1440: {
                  slidesPerView: 'auto',
                  spaceBetween: 16,
                  centeredSlides: true,
                  loop: true,
                },
            }
        });
        
        return swiper;
    }
}