document.addEventListener("DOMContentLoaded", () => {

    const burgerBtn = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('navLinks');

    if (burgerBtn && mobileMenu) {

        burgerBtn.addEventListener('click', (e) => {

            e.stopPropagation();

            mobileMenu.classList.toggle('active-mobile');
        });

        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        const actualLinks =
            mobileMenu.querySelectorAll('a:not(.dropbtn)');

        actualLinks.forEach(link => {

            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active-mobile');
            });

        });

        document.addEventListener('click', () => {
            mobileMenu.classList.remove('active-mobile');
        });
    }

});