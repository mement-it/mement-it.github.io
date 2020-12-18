var current_email_id;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        current_email_id = user.email; 
        get_to_update(); 
    }
});

$("#btn-update").click(function () {

     var fName = $("#firstName").val();
     var phone = $("#phone").val();
     var bio = $("#bio").val();
     var gender = $('#gender').find(":selected").text();
     var address = $("#address").val();

     var rootRef = firebase.database().ref().child("Users");
     var userID = firebase.auth().currentUser.uid;
     var userRef = rootRef.child(userID);

     if (fName != "" && bio != "" && gender != "") {
          update_prof();
     }
     else {
          pop_msg('Message!',"Some of these Fields are neseccary, Please fill those");
     }
});

function get_to_update(){
     var bucketsufix = current_email_id.replace(/\./g, '<dot>');
     firebase.database().ref('users/profile/' + bucketsufix ).once('value', function (snapshot) {
          try{

            var bio = snapshot.val().bio;
            var username = snapshot.val().username;
            var gender = snapshot.val().gender;
            var pic = snapshot.val().pic;
            var phone = snapshot.val().phone.replace("⠀", "");
            var address = snapshot.val().address.replace("⠀", "");

            $("#phone").val(phone)
            $("#firstName").val(username)
            $("#bio").val(bio)
            $("#gender").val(gender);
            $("#address").val(address)
            $("#dp-prev").attr("src",pic)

            stop_loading();
            //update_prof(bio, username, gender, phone, address);
          }
          catch(error){
               console.log(error);
               pop_msg('Message!',error);
          }
     });
}

function update_prof(){

     var fName = $("#firstName").val();
     var phone = $("#phone").val().replace("", "⠀");
     var bio = $("#bio").val().replace("", "⠀");
     var gender = $('#gender').find(":selected").text();
     var address = $("#address").val().replace("", "⠀");
     var pic = $("#dp-prev").attr('src');

     try {
          var bucketsufix = current_email_id.replace(/\./g, '<dot>');
          firebase.database().ref('users/profile/' + bucketsufix).update({
      
            bio: bio,
            username: fName,
            gender: gender,
            phone: phone,
            address: address,
            pic:pic
      
          }function(error){
              if(!error){
                  window.location.replace('index.html');
              }
          });

          pop_msg('Message!','Your profile is being updated');
     } catch (error) {
          pop_msg('Message!',error)
     }

}


