import Swiper from 'swiper';
import 'swiper/css';

import changeController from "@scripts/composables/swiperController.js";

document.addEventListener('DOMContentLoaded', () => {
    // переменные //
    //классы для слайдера details
    const detailsSwiperClasses = {
        first: 'first',
        second: 'second',
        third: 'third'
    }
    //значения для переключения слайдов в details
    const detailsSwiperValues = {
        prev: 'prev',
        next: 'next',
    }

    //контроллер для слайдера details
    const detailsSwiperControllerElement = document.querySelector('.about-details__swiper-btn-bar');

    //все слайды слайдера details
    const detailsSlidesElements = document.querySelectorAll('.about-details__slide');

    //переключатель для слайдера meet
    //переключатель для слайдера news
    const meetSliderControllerElement = document.querySelector('.about-meet__swiper-btn-bar');


    // инициализация слайдеров //
    const detailsSwiper = new Swiper('.about-details__swiper', {
        direction: 'horizontal',
        spaceBetween: 32,
        allowTouchMove: false,
        slidesPerView: 2.4,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
                allowTouchMove: true,
            },
            767: {
                slidesPerView: 2.4,
                spaceBetween: 32,
                allowTouchMove: false,
            }
        },
    });

    const meetSwiper = new Swiper('.about-meet__swiper', {
        direction: 'horizontal',
        spaceBetween: 32,
        allowTouchMove: false,
        slidesPerView: 3,
        breakpoints: {
            0: {
                slidesPerView: 1.4,
                spaceBetween: 16,
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 32,
            }
        },
    });


    // основной код //
    //количество слайдов в слайдере details
    const detailsSwiperNumber = detailsSwiper.slides.length;

    //активный слайд
    let activeSlide = 2;

    //переключение слайдов в слайдере details
    detailsSwiperControllerElement.addEventListener('click', (e) => {
        if (detailsSwiperNumber >= 1) {
            changeDetailSwiper(changeController(e, detailsSwiperControllerElement, detailsSwiper));
        }
    })

    //задание классов в слайдере details
    function setDetailSwiperClasses () {
        if (window.innerWidth < 767) return;

        detailsSlidesElements.forEach((el, i) => {
            if (detailsSwiperNumber === 1 && i === 0) {
                el.classList.add(detailsSwiperClasses.second);
            } else if (detailsSwiperNumber === 2) {
                if (i === 0) el.classList.add(detailsSwiperClasses.first);
                if (i === 1) el.classList.add(detailsSwiperClasses.second);
            }
            if (detailsSwiperNumber >= 3) {
                if (i === 0) el.classList.add(detailsSwiperClasses.first);
                if (i === 1) el.classList.add(detailsSwiperClasses.second);
                if (i > 1) el.classList.add(detailsSwiperClasses.third);
            }
        });
    }
    setDetailSwiperClasses();

    //удаление классов у слайдов details
    function removeDetailsClasses (value) {
        if (
            (activeSlide > 1 && value === 'prev') ||
            (activeSlide < detailsSwiperNumber && value === 'next')
        ) {
            detailsSlidesElements.forEach(el =>
                el.classList.remove(...Object.values(detailsSwiperClasses))
            );
        }
    }

    //передвижение контроллера
    function replaceDetailsController (index) {
        if (detailsSwiperNumber < 3) return;

        if (index === detailsSwiperNumber - 1) {
            detailsSwiperControllerElement.style.left = 'calc(100% / 6.6)';
        } else {
            detailsSwiperControllerElement.style.left = '';
        }
    }

    //задаем новый activeSlide для details
    function setNewActiveDetailsSlide (value) {
        if (value === detailsSwiperValues.prev && activeSlide > 1) activeSlide -= 1;
        if (value === detailsSwiperValues.next && activeSlide < detailsSwiperNumber) activeSlide += 1;
    }

    //переключение слайдов в слайдере details
    function changeDetailSwiper (value) {
        if (window.innerWidth < 767) return;

        let index = detailsSwiper.activeIndex + 1;

        removeDetailsClasses(value);

        detailsSlidesElements.forEach((el, i) => {
            if (detailsSwiperNumber === 2) {
                if (value === detailsSwiperValues.prev) {
                    if (i === 0) el.classList.add(detailsSwiperClasses.second);
                    if (i === 1) el.classList.add(detailsSwiperClasses.third);
                }
                if (value === detailsSwiperValues.next) {
                    if (i === 0) el.classList.add(detailsSwiperClasses.first);
                    if (i === 1) el.classList.add(detailsSwiperClasses.second);
                }
            }
            if (detailsSwiperNumber >= 3) {
                if (value === detailsSwiperValues.prev) {
                    if (index === 1 && activeSlide === 2) {
                        if (i === 0) el.classList.add(detailsSwiperClasses.second);
                        if (i > 0) el.classList.add(detailsSwiperClasses.third);
                    }
                    if (index >= 1 && activeSlide > 2) {
                        if (i === activeSlide - 1) el.classList.add(detailsSwiperClasses.third);
                        if (i === activeSlide - 2) el.classList.add(detailsSwiperClasses.second);
                        if (i === activeSlide - 3) el.classList.add(detailsSwiperClasses.first);
                    }
                }
                if (value === detailsSwiperValues.next) {
                    if ((index === detailsSwiperNumber - 1 && activeSlide === detailsSwiperNumber - 1)) {
                        if (i === detailsSwiperNumber - 1) el.classList.add(detailsSwiperClasses.second);
                        if (i < detailsSwiperNumber - 1) el.classList.add(detailsSwiperClasses.first);
                    }
                    if (index <= detailsSwiperNumber - 1 && activeSlide < detailsSwiperNumber - 1) {
                        if (i === activeSlide - 1) el.classList.add(detailsSwiperClasses.first);
                        if (i === activeSlide) el.classList.add(detailsSwiperClasses.second);
                        if (i === activeSlide + 1) el.classList.add(detailsSwiperClasses.third);
                    }
                }
            }
        })

        replaceDetailsController(index);

        setNewActiveDetailsSlide(value);
    }

    //переключение слайдов в слайдере meet
    meetSliderControllerElement.addEventListener('click', (e) => {
        changeController(e, meetSliderControllerElement, meetSwiper);
    })
});