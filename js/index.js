// Config is moved to another javascript file
// Used google's jquery cdn
//Edited by Harry Tom

//Login
$("#btn-login").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    try{


        if(email != "" && password != "")
        {
          firebase.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {

            //Your code after signing in...
           
            window.location.replace('index.html')
          })
          .catch((error) => {

            // Your code after failed to sign in

            var errorCode = error.code;
            var errorMessage = error.message;
            pop_msg('Message!',errorMessage);

          });
        }
        else{
          pop_msg('Message!',"This Field is required")
        }
    }
    catch(error){
      pop_msg('Message!',error);
    }

});


$("#btn-logout").click(function(){
  firebase.auth().signOut();
});
  


