import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', () => {
    // переменные //
    //переключатель для слайдера news
    const newsSliderControllerElement = document.querySelector('.home-news__swiper-btn-bar');

    //переключатели для слацйдера comments
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
    //обработчик события нажатия на контроллер для слайдера news
    function changeNewsSwiper (e) {
        const rect = newsSliderControllerElement.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const halfWidth = rect.width / 2;

        // Определяем половину круга
        if (clickX < halfWidth) {
            // Левая половина - предыдущий слайд
            newsSwiper.slidePrev();
        } else {
            // Правая половина - следующий слайд
            newsSwiper.slideNext();
        }
    }

    newsSliderControllerElement.addEventListener('click', (e) => changeNewsSwiper(e))

    //проверка для слайдера comments:
    // если нет слайдеров для прокрутки вообще - обе кнопки неактивны
    // если последний слайд - активная только кнопка "назад"
    // если если первый слайд - активная только кнопка вперед

    //получаем количество слайдов
    const commentsSlideNumber = commentsSwiper.slides.length;

    function checkCommentSlider () {
        //получаем активный слайд
        const index = commentsSwiper.activeIndex + 1;

        if (commentsSlideNumber === 0 || commentsSlideNumber === 1) return;

        if (index === 1) {
            commentsSliderControllerPrevElement.classList.remove('active');
            commentsSliderControllerNextElement.classList.add('active');
            return;
        }

        if (index === commentsSlideNumber) {
            commentsSliderControllerPrevElement.classList.add('active');
            commentsSliderControllerNextElement.classList.remove('active');
            return;
        }

        commentsSliderControllerNextElement.classList.add('active');
        commentsSliderControllerPrevElement.classList.add('active');
    }

    checkCommentSlider();

    commentsSwiper.on('slideChange', checkCommentSlider)
});