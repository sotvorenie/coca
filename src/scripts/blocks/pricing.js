document.addEventListener('DOMContentLoaded', () => {
    const classes = {
        active: 'is-active',
    }

    const checkboxElement = document.querySelector('.pricing-banner__checkbox-body');
    const checkboxBtnElement = document.querySelector('.pricing-banner__checkbox-btn');

    checkboxElement.addEventListener('click', () => {
        checkboxBtnElement.classList.toggle(classes.active);
    })
})