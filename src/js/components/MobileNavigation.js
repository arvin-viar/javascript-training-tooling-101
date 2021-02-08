import { $, isMobile } from "../utils/helpers";

(() => {

    const SELECTOR = '.main-nav';

    if (!$(SELECTOR)) return;

    // Mobile Show Navigation
    function showNav() {
        const mainNav = $('.main-nav__menu', $(SELECTOR));
        if (!isMobile) return;
        if (mainNav.classList.contains('is-hidden')) {
            mainNav.classList.remove('is-hidden');
        } else {
            mainNav.classList.add('is-hidden');
        }
    }
    const logo = $('.main-nav__logo', $(SELECTOR));
    if (logo) {
        logo.addEventListener('click', showNav);
    }

}) ();
