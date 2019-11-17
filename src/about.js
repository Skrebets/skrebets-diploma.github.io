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