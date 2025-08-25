import Swiper from 'swiper';
import {FreeMode} from "swiper/modules";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/navigation';

import changeController from "@scripts/composables/swiperController.js";
import checkSlider from "@scripts/composables/checkSlider.js";

document.addEventListener('DOMContentLoaded', () => {
    // переменные //
    //переключатели для banner слайдера
    const bannerSwiperControllerElement = document.querySelector('.blog-banner__swiper-btn-bar');

    //переключатели для слайдера articles
    const articlesSliderControllerPrevElement = document.querySelector('.blog-articles-prev');
    const articlesSliderControllerNextElement = document.querySelector('.blog-articles-next');

    // инициализация слайдеров //
    const tabsSwiper = new Swiper('.blog-banner__tabs', {
        modules: [FreeMode],
        direction: 'horizontal',
        spaceBetween: 16,
        allowTouchMove: true,
        slidesPerView: 'auto',
        breakpoints: {
            0: {
                spaceBetween: 8
            },
            767: {
                spaceBetween: 16
            }
        },
    });

    const bannerSwiper = new Swiper('.blog-banner__swiper', {
        direction: 'horizontal',
        spaceBetween: 32,
        allowTouchMove: false,
        slidesPerView: 2.5,
        breakpoints: {
            0: {
                slidesPerView: 1.3,
                spaceBetween: 16
            },
            767: {
                slidesPerView: 2.5,
                spaceBetween: 32
            }
        },
    });

    const articlesSwiper = new Swiper('.blog-articles__swiper', {
        modules: [Navigation],
        direction: 'horizontal',
        spaceBetween: 32,
        allowTouchMove: false,
        slidesPerView: 2.8,
        navigation: {
            nextEl: '.blog-articles-next',
            prevEl: '.blog-articles-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.3,
                spaceBetween: 16
            },
            767: {
                slidesPerView: 2.8,
                spaceBetween: 32
            }
        },
    });

    // основной код //
    //переключение слайдов в слайдере banner
    bannerSwiperControllerElement.addEventListener('click', (e) => {
        changeController(e, bannerSwiperControllerElement, bannerSwiper);
    })

    //проверка для слайдера articles:
    // если нет слайдеров для прокрутки вообще - обе кнопки неактивны
    // если последний слайд - активная только кнопка "назад"
    // если если первый слайд - активная только кнопка вперед

    //получаем количество слайдов
    let index;
    if (window.innerWidth > 767) {
        index = 2;
    } else {
        index = 0
    }
    const articlesSlideNumber = articlesSwiper.slides.length - index;

    checkSlider(articlesSlideNumber, articlesSwiper, articlesSliderControllerPrevElement, articlesSliderControllerNextElement);

    articlesSwiper.on('slideChange', () => {
        checkSlider(articlesSlideNumber, articlesSwiper, articlesSliderControllerPrevElement, articlesSliderControllerNextElement);
    })
})