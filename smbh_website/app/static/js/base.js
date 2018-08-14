$(document).ready(function () {

    $('#btp-btn').hide();

    // Scrolling Functions
    window.onscroll = function () {
        ScrollHandler()
    };

    // Mark Down
    // $('.content-markdown').each(function() {
    //   var content = $(this).text();
    //   var markedContent = marked(content);
    //   $(this).html(markedContent);
    // });


});




// Back To Top Function
function BackToTop() {

    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;

    $('html, body').animate({
        scrollTop: 0
    }, {
        speed: 500,
        easing: "swing"
    });

}


// ScrollHandler Function
function ScrollHandler() {
    // Back To Top
    // when user scrolls down < >px
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        // document.getElementById('btp-btn').style.display = "block";
        // $('#btp-btn').animate({ opacity: '1', }, { speed: 'slow', easing: "linear" });
        $('#btp-btn').fadeIn();

    } else {
        // document.getElementById('btp-btn').style.display = 'none';
        // $('#btp-btn').animate({ opacity: '0', }, { speed: 'slow', easing: "linear" });
        $('#btp-btn').fadeOut();
    }


}
