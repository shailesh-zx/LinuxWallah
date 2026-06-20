document.addEventListener("DOMContentLoaded", () => {

    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn
        ? themeToggleBtn.querySelector('i')
        : null;

    try {
        if (localStorage.getItem('theme') === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');

            if (themeIcon) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        }
    } catch (e) {}

    if (themeToggleBtn) {

        themeToggleBtn.addEventListener('click', () => {

            if (htmlElement.getAttribute('data-theme') === 'dark') {

                htmlElement.removeAttribute('data-theme');

                if (themeIcon) {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                }

                try {
                    localStorage.setItem('theme', 'light');
                } catch (e) {}

            } else {

                htmlElement.setAttribute('data-theme', 'dark');

                if (themeIcon) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                }

                try {
                    localStorage.setItem('theme', 'dark');
                } catch (e) {}

            }
        });
    }

});