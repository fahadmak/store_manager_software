function searching() {

    var li, i;
    var search = document.getElementById('search');
    var filter = search.value.toUpperCase();
    var div = document.getElementById("table");
    var ul = div.getElementsByTagName('ul');

    for (i = 0; i < ul.length; i++) {
        li = ul[i].getElementsByTagName("li")[1];
        if (li.innerHTML.toUpperCase().indexOf(filter) > -1) {
            ul[i].style.display = "";
        } else {
            ul[i].style.display = "none";
        }
    }
}
