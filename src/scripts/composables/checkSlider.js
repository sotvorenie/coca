export default function checkSlider (number, swiper, prev, next) {
    //получаем активный слайд
    const index = swiper.activeIndex + 1;

    console.log(number, index)

    if (number === 0 || number === 1) return;

    if (index === 1) {
        prev.classList.remove('active');
        next.classList.add('active');
        return;
    }

    if (index === number) {
        prev.classList.add('active');
        next.classList.remove('active');
        return;
    }

    next.classList.add('active');
    prev.classList.add('active');
}