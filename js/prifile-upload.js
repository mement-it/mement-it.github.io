const file = document.getElementById('dp-up');

$( '#dp-prev' ).click(function(){
    $( '#dp-up' ).click()
    return false;
})

file.addEventListener("change", ev=>{
    const formdata = new FormData()
    formdata.append("image", ev.target.files[0])
    fetch("https://api.imgur.com/3/image/", {
        method: "post",
        headers:{
            Authorization: " Client-ID 79b89d2f1266ff6"
        },
        body:formdata
    }).then(data => data.json()).then(data => {
        $('#dp-prev').attr('src',data.data.link);
    })
})



