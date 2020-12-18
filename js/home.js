var my_email;

$( '#pop-home' ).fadeOut('fast');
$( '.search-ui' ).fadeOut('fast');

$( '#my-pic' ).click( function(){
    $( '#pop-home' ).fadeIn();
});

$(document).mouseup(function(e) 
{
    var container = $("#pop-home");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.fadeOut('fast');
    }
});

update_usr();

function update_usr(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            my_email = user.email; 

            $( '#view-myprofile' ).attr('href', 'profile.html?id=' + my_email)
            $( '#my-posts-home' ).attr('href', 'profile.html?id=' + my_email + '#my-posts')
            get_to_update(); 
        }
    });
}

function get_to_update(){
    var bucketsufix = my_email.replace(/\./g, '<dot>');
    firebase.database().ref('users/profile/' + bucketsufix ).once('value', function (snapshot) {
         try{
           $("#my-pic").attr('src', snapshot.val().pic)
           $("#my-pic").attr('title', snapshot.val().username)
         }
         catch(error){
              pop_msg('Message!',error);
         }
    });
}

const buttonRight = document.getElementById('slideRight');
const buttonLeft = document.getElementById('slideLeft');

buttonRight.onclick = function () {
  document.getElementById('tags-menu').scrollLeft += 100;
};
buttonLeft.onclick = function () {
  document.getElementById('tags-menu').scrollLeft -= 100;
};

function signOut() {
    firebase.auth().signOut().then(function() {
        
      }).catch(function(error) {
        pop_msg('could\'t signout')
      });
      
}
