firebase.database().ref('posts').once('value', function (snapshot) {
     try{
        var array = snapshot.val();

        const posts = Object.values(array).map(post => `
        <div class="root-item">
        <span class="root-tag tag-${post.topic}">${post.topic}</span>
        <a href="story.html?read=${post.link}"><h2 class="root-title">${post.title}</h2></a>
        <p class="root-des">${post.content}</p>
        <span class="root-date">${post.date}</span>
        </div>

      `)
      var sh_posts = shuffle(Object.values(posts))
      document.querySelector('#root').innerHTML = sh_posts.join('')
           .replace(/:b/g, "").replace(/b:/g, "")
           .replace(/:h/g, "").replace(/h:/g, "")
           .replace(/:i/g, "").replace(/i:/g, "")
           .replace(/:c/g, "").replace(/c:/g, "")
           .replace(/\\n/g, '');;

      stop_loading();
     }
     catch(error){
        alert(error.message);
     }
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  

function get_list_data_async(id){

    try{
        firebase.database().ref('posts/' + id).on('value', function (snapshot) {
            try {
                var a = snapshot.val().date;
                
            } catch (error) {
                alert(error);
            }

        });
    }
    catch(error){

    }

}

