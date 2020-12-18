const urlParams = new URLSearchParams(window.location.search);
var bucket_id = decodeURI(urlParams.get('id'));
var bucket_id_parsed = bucket_id.replace(/\./g, "<dot>")
getUserInfo();
function getUserInfo(){

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
        
           //update_prof(bio, username, gender, phone, address);
         }
         catch(error){
              window.location.replace("404.html")
         }
    });
}


firebase.database().ref('users/profile/' + bucket_id_parsed + '/posts').once('value', function (snapshot) {
   try{
      var array = snapshot.val();

      const posts = Object.values(array).map(post => `
      <div class="root-item card-box">
      <a href="story.html?read=${post.link}"><h2 class="root-title">${post.title}</h2></a>
      <p class="root-des">${post.text}</p>
      </div>

    `)
    document.querySelector('#my-posts').innerHTML = "<h4 class='top-post-title'>Top posts</h4>" + posts.join('')
            .replace(/:b/g, "").replace(/b:/g, "")
           .replace(/:h/g, "").replace(/h:/g, "")
           .replace(/:i/g, "").replace(/i:/g, "")
           .replace(/:c/g, "").replace(/c:/g, "")
           .replace(/\\n/g, '');;

    stop_loading();
   }
   catch(error){}
});
