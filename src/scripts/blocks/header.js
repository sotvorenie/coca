document.addEventListener('DOMContentLoaded', () => {
    //бургер-кнопка
    const burgerBtnElement = document.querySelector('.header-burger');

    //бургер-меню
    const burgerMenuElement = document.querySelector('.header-burger__content');

    //крестик для закрытия бургер-меню
    const burgerCloseElement = document.querySelector('.header-burger__close');

    //при клике по кнопке-бургеру - открыть бургер-меню
    burgerBtnElement.addEventListener('click', () => {
        document.documentElement.classList.add('is-lock');
    })

    //закрытие меню
    burgerCloseElement.addEventListener('click', () => {
        document.documentElement.classList.remove('is-lock');
    })

    //закрытие бургер-меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!burgerMenuElement) return;

        if (!burgerMenuElement.contains(e.target) && !e.target.closest('.header-burger')) {
            document.documentElement.classList.remove('is-lock');
        }
    })
})