$(document).ready(function () {
    footer();
});
$(window).resize(function () {
    footer();
});
function footer () {
    if ($(window).height() > $('body').height() +100) {
        $('footer').css('position', 'fixed');
        $('footer').css('bottom', '0');
    }
    else {
        $('footer').css('position', 'relative');
    }
}