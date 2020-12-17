$('.message-pop').fadeOut();

$(function(){
    $('#close-msg').on('click',function(){
        $('.message-pop').fadeOut();
    })
});

function pop_msg(title,message){
    $('.message-pop').fadeOut();
    $('#msg_title').html(title);
    $('#msg_des').html(message);
    $('.message-pop').fadeIn();
}

function stop_loading(){
    $( '.progress-lay' ).fadeOut();
}