
var auth = firebase.auth();


$("#btn-resetPassword").click(function () {

   var mail = $("#email").val();

   if (mail != "") {
      auth.sendPasswordResetEmail(mail).then(function () {
         pop_msg('Message!',"A password reset email is send to your email address! check it out to reset");
      })
      .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            pop_msg('Message!',"Message :" + errorMessage);

      });

   } else {
      pop_msg('Message!',"Email is required")
   }
});