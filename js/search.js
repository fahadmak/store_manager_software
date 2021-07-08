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
var idnum;
var span = document.getElementById('add');
function addproduct() {
    var btn =  "<li class='column columnfive pos'><button class='btn st mod'>Modify</button>" +
        "<button class='btn st del'>Delete</button> </li>";
    var dispaly = document.getElementById('display');
    idnum = dispaly.getElementsByTagName('ul').length;
    var name, price, qty;
    var idn = document.createElement('li');
    idn.id = 'id' + idnum.toString();
    idn.innerHTML = idnum.toString();
    idn.setAttribute('class', 'column columnone');
    name = document.createElement('li');
    name.id = name + idnum.toString();
    name.setAttribute('class', 'column columntwo');
    name.innerHTML = document.getElementById('aname').value;
    price = document.createElement('li');
    price.id = price + idnum.toString();
    price.setAttribute('class', 'column columnthree');
    price.innerHTML = document.getElementById('aprice').value;
    qty = document.createElement('li');
    qty.id = qty+ idnum.toString();
    qty.setAttribute('class', 'column columnfour');
    qty.innerHTML = document.getElementById('aquantity').value + '\xa0units';
    var ul = document.createElement('ul');
    ul.id = 'item' + idnum.toString();
    ul.setAttribute('class', 'product-columns product-row');
    ul.innerHTML = idn.outerHTML + name.outerHTML + price.outerHTML + qty.outerHTML + btn;
    console.log(ul);
    dispaly.appendChild(ul);
    span.style.display = "none";
}

