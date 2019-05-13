$(document).ready(function () {

    // Intro fullscreen
    FullScreen();
    // if window resized
    $(window).resize(function () {
        FullScreen();
    })



    // Config Owl Carousel
    $(".owl-carousel").owlCarousel({
        rtl: true,
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });


    // Add smooth scrolling to Nav links
    $("nav li a").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();


            // Store hash (anchor url)
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (500) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
    // AboutMe button smooth
    $('#Btn-AboutMe').on('click', function (event) {
        $('html, body').animate({
            scrollTop: $('#AboutMe').offset().top
        }, 500, function () {
            window.location.hash = '#AboutMe';
        });
    });

    // Fix flex style on mobile size
    $("#Blog").css('display', 'block');


    // Animation on page scroll
    new WOW().init()

});



// FullScreen Function
function FullScreen() {
    $('#intro-video').css({
        width: $(window).width(),
        height: $(window).height()
    });

    // $('#divId').outerHeight($(Window).outerHeight() - $('#divId').offset().top);
}
