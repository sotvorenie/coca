import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', () => {
    const newsSwiper = new Swiper('.home-news__swiper', {
        direction: 'horizontal',
        spaceBetween: 32,
        allowTouchMove: false,
        slidesPerView: 2,
        breakpoints: {
            0: {
                slidesPerView: 1.1,
                spaceBetween: 16
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 32
            }
        },
    });

    const commentsSwiper = new Swiper('.home-comments__swiper', {
        modules: [Navigation],
        direction: 'horizontal',
        //allowTouchMove: false,
        slidesPerView: 1,
        navigation: {
            nextEl: '.home-comments-next',
            prevEl: '.home-comments-prev',
        },
    });
});