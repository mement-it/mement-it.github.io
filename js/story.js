const urlParams = new URLSearchParams(window.location.search);
var bucket = decodeURI(urlParams.get('read'));

get_data_async()

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
                stop_loading();

            } catch (error) {
                window.location.replace('404.html')
            }

        });
    }
    catch(error){

    }
}
