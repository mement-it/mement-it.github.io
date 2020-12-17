var bu_email;
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var CurrentDateTime = date+' '+time;
var id;
var content_text;
var content_title;
var bucket_post;
var pub_date;
var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november','december',]
var topic;

firebase.auth().onAuthStateChanged(function (user) {

    if (!user) {
        window.location.href = "sign-in.html"
    }
    else{  
        try {
            bu_email =user.email; 
            stop_loading();
        } catch (error) {
            console.log('error')
        }              
    }
});

$( '#goPublish' ).click(function(){

    date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    time = today.getHours() + "-" + today.getMinutes() + today.getSeconds();

    CurrentDateTime = date + '-' + time;
    id = CurrentDateTime.replace(/-/g ,"");

    content_text = $('#write-description').val();
    content_title = $('#write-title').text();
    topic = $('#topic').find(":selected").text();

    pub_date =today.getDate()  + ' ' + months[today.getMonth()] +' '+today.getFullYear()

    if(content_text != '' && content_title != ''){

        bucket_post = content_title.replace(/ /g, "-") + '-' + id;
        list_data();
    }
    else{
        pop_msg('Ooooops!', 'Please finish your story first befor proceeding to publish.')
    }


})

function list_data(){
    try{
        var bucketsufix = bu_email.replace(/\./g, '<dot>');
        firebase.database().ref('posts/' + bucket_post).set({
    
          owner: bu_email,
          id:id,
          title:content_title,
          content:content_text,
          date:pub_date,
          topic:topic,
          link:bucket_post
    
        },function(error){
            if(error){}else{
                window.location.replace('story.html?read=' + bucket_post)
            }
        });

        var obj_post = {};
        obj_post[id] = bucket_post;


        firebase.database().ref('users/profile/' + bucketsufix + '/posts').set(obj_post);
    }
      catch(error){
        pop_msg('Message', error)
    }
}