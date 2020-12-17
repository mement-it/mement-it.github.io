const urlParams = new URLSearchParams(window.location.search);
var bucket_id = decodeURI(urlParams.get('id'));
getUserInfo();
function getUserInfo(){
    var bucket_id_parsed = bucket_id.replace(/\./g, "<dot>")
    firebase.database().ref('users/profile/' + bucket_id_parsed ).once('value', function (snapshot) {
         try{

           var bio = snapshot.val().bio;
           var username = snapshot.val().username;
           var pic = snapshot.val().pic;
           var address = snapshot.val().address.replace("⠀", "");

           $("#view-name").text(username)
           $("#view-bio").text(bio)
           $("#profile-pic-full").attr("src",pic)

           if(address !== ''){
              $("#view-add").text(address)
           }
           else{
              $("#view-add").text(bucket_id)
           }

           $("#favicon-prof").attr("href",pic);
           document.title = username + 'on Mement.'

           stop_loading();
           //update_prof(bio, username, gender, phone, address);
         }
         catch(error){
              window.location.replace("404.html")
         }
    });
}