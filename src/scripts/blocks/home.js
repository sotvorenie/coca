import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import changeController from "@scripts/composables/swiperController.js";
import checkSlider from "@scripts/composables/checkSlider.js";

document.addEventListener('DOMContentLoaded', () => {
    // переменные //
    //переключатель для слайдера news
    const newsSliderControllerElement = document.querySelector('.home-news__swiper-btn-bar');

    //переключатели для слайдера comments
    const commentsSliderControllerPrevElement = document.querySelector('.home-comments-prev');
    const commentsSliderControllerNextElement = document.querySelector('.home-comments-next');

    // инициализация слайдеров //
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


    // основной код //
    //переключение слайдов в слайдере news
    newsSliderControllerElement.addEventListener('click', (e) => {
        changeController(e, newsSliderControllerElement, newsSwiper);
    })

    //проверка для слайдера comments:
    // если нет слайдеров для прокрутки вообще - обе кнопки неактивны
    // если последний слайд - активная только кнопка "назад"
    // если если первый слайд - активная только кнопка вперед

    //получаем количество слайдов
    const commentsSlideNumber = commentsSwiper.slides.length;

    checkSlider(commentsSlideNumber, commentsSwiper, commentsSliderControllerPrevElement, commentsSliderControllerNextElement);

    commentsSwiper.on('slideChange', () => {
        checkSlider(commentsSlideNumber, commentsSwiper, commentsSliderControllerPrevElement, commentsSliderControllerNextElement)
    })
});