function filterTag(query) {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("myFilter");
    filter = query.toUpperCase();
    cardContainer = document.getElementById("root");
    cards = cardContainer.getElementsByClassName("root-item");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector("span.root-tag");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

$('#search-qry').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        filterItem();  
    }
});

$('#mo-search').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        filterItem();  
    }
});

function filterItem() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("search-qry");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("root");
    cards = cardContainer.getElementsByClassName("root-item");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector("h2.root-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}