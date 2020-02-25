document.addEventListener('DOMContentLoaded', function() {
    console.log('Hello');


    if (window.matchMedia("(max-width: 1023px)").matches) {
        return;
    }

    $('header').midnight();
});