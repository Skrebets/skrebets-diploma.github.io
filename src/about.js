import "./pages/about.css";

import {Swiper, Navigation, Pagination} from '../node_modules/swiper/js/swiper.esm.js';

Swiper.use([Navigation, Pagination]);

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
});