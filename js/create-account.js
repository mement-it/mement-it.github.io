// Config is moved to another javascript file
// Used google's jquery cdn
//Edited by Harry Tom

var username;
var email;
var password;
var passconfirm;

//Sign up
$("#btn-signup").click(function(){
    email = $("#email").val();
    password = $("#password").val();
    passconfirm = $("#confirmPassword").val();
    username = $("#email").val().split('@')[0];

    try{

      //check if every info is filled
        if(email != "" && password != "" && passconfirm != ""){
          
          //check if confirm password is same
          if(password ===  passconfirm ){
            signupWithEmail(email,passconfirm)
          }
          else{
            alert('Confirm password is not same.')
          }

        }
        else{ 
          pop_msg('Oops!','All feilds are required.')
        }
    }
    catch(error){
      alert(error);
    }

});

function signupWithEmail(email, password){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    setProfile();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    pop_msg('Message',errorMessage);
    // ..
  });

}

function setProfile(){
  try{
    var bucketsufix = email.replace(/\./g, '<dot>');
    firebase.database().ref('users/profile/' + bucketsufix).set({

      bio: "Apparently, this user prefers to keep an air of mystery about them.",
      username: username,
      gender: "Male",
      phone: "⠀",
      address: "⠀",
      pic:"design_files/images/de-pic.png"

    }, function(error){
      if(error){

      }
      else{
        window.location.replace("settings.html")
      }
    });
  }
  catch(error){
    pop_msg('Message', error)
  }

}