const urlParams = new URLSearchParams(window.location.search);
var bucket = decodeURI(urlParams.get('read'));
var local_owner;
var local_id;
var sec_mail;

get_data_async()


firebase.auth().onAuthStateChanged(function (user) {

    if (!user) {
        window.location.href = "sign-in.html"
    }
    else{  
        try {
            sec_mail =user.email; 
            stop_loading();
        } catch (error) {
            console.log('error')
        }              
    }
});

function get_data_async(){

    try{
        firebase.database().ref('posts/' + bucket).on('value', function (snapshot) {
            try {
                
                 var content = snapshot.val().content
                .replace(/:b/g, "<span class='bold'>").replace(/b:/g, "</span>")
                .replace(/:h/g, "<br><br><span class='heading'>").replace(/h:/g, "</span><br>")
                .replace(/:i/g, "<span class='italic'>").replace(/i:/g, "</span>")
                .replace(/:c/g, "<span class='code'>").replace(/c:/g, "</span>")
                .replace(/\\n/g, '<br>');

                $( '#view-title' ).text(snapshot.val().title);
                $( '#view-description' ).html(content);
                $( '#view-date' ).text(snapshot.val().date);
                $( '#post-topic' ).text(snapshot.val().topic);
                $( '#prof-red' ).attr("href", "profile.html?id=" + snapshot.val().owner);

                document.title = snapshot.val().title + " on Mement"

                setUserInfo(snapshot.val().owner)
                local_owner = snapshot.val().owner;
                local_id = snapshot.val().id;
            
            } catch (error) {
                window.location.replace('404.html')
            }

        });
    }
    catch(error){

    }

}



function setUserInfo(bucketsufix){
    try{
        firebase.database().ref('users/profile/' + bucketsufix.replace(/\./g, '<dot>')).on('value', function (snapshot) {
            try {
                $( '#user-pic' ).attr("src", snapshot.val().pic)
                $( '#my-pic-ii' ).attr("src", snapshot.val().pic)
                $( '#owner-username' ).text(snapshot.val().username)

                if(local_owner == sec_mail){
                    $( '.ricon' ).html('<div class="delete-icon" onclick="trash()" id="trash-icon" title="delete-this-post"></div>');
                }
                stop_loading();

            } catch (error) {
                window.location.replace('404.html')
            }

        });
    }
    catch(error){

    }
}

$( '#trash' ).click(function(){
    trash();
});
function trash(){
    


    try {
        firebase.database().ref('users/profile/' + sec_mail.replace(/\./g, '<dot>') + '/posts/' + local_id).remove();
        firebase.database().ref('posts/' + bucket).remove();
    } catch (error) {
        alert(error)
    }

}
