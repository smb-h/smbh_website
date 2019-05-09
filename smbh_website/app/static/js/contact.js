$(document).ready(function () {

    // Intro fullscreen
    FullScreen();
    // if window resized
    $(window).resize(function () {
        FullScreen();
    })

});



// FullScreen Function
function FullScreen() {
    $('#Contact-image').css({
        width: $(window).width(),
        height: $(window).height()
    });

    // $('#divId').outerHeight($(Window).outerHeight() - $('#divId').offset().top);
}

