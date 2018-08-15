$(document).ready(function () {


    // Comments
    // $('.comment-reply').css('display', 'none');
    $('.comment-reply-btn').click(function(event) {
        event.preventDefault();
        $(this).parent().next('.comment-reply').fadeToggle();
        
    });


});
