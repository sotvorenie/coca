export default function changeController (e, controller, swiper) {
    const rect = controller.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;

    // Определяем половину круга
    if (clickX < halfWidth) {
        // Левая половина - предыдущий слайд
        swiper.slidePrev();
        return 'prev';
    } else {
        // Правая половина - следующий слайд
        swiper.slideNext();
        return 'next';
    }
}