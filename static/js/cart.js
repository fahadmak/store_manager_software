var grand = 0;
var idnum = 1;
var div = document.getElementById("shop-cart");
var record = document.getElementById("record");
var overall = document.getElementById("total");
var overall2 = document.getElementById("final-total");
var button = document.getElementById('create');
var section = document.getElementById('gen');
function addItem(id1, id2, id3) {
    var name = document.getElementById(id1).innerHTML;
    var price = document.getElementById(id2).innerHTML;
    var qty = document.getElementById(id3);
    var empty = document.getElementById("empty");
    var quantity = parseInt(qty.value);
    var intPrice = parseInt(price);
    var total = quantity * intPrice;
    var total_str = total.toString();
    var li = document.createElement("li");
    grand += total;
    var grand1 = grand.toString();
    overall.innerText = grand1;
    var idn = document.createElement('li');
    idn.id = 'id' + idnum.toString();
    idn.innerHTML = idnum.toString()
    idn.setAttribute('class', 'column columnone');
    var named = document.createElement('li');
    named.id = name + idnum.toString();
    named.setAttribute('class', 'column columntwo');
    named.innerHTML = name;
    var priced = document.createElement('li');
    priced.id = price + idnum.toString();
    priced.setAttribute('class', 'column columnthree');
    priced.innerHTML = price;
    var qtyed = document.createElement('li');
    qtyed.id = qty.value + idnum.toString();
    qtyed.setAttribute('class', 'column columnfour');
    qtyed.innerHTML = qty.value;
    var totaled = document.createElement('li');
    totaled.id = total + idnum.toString();
    idnum ++;
    totaled.setAttribute('class', 'column columnfive');
    totaled.innerHTML = total_str;
    var ul = document.createElement('ul');
    ul.setAttribute('class', 'bought');
    ul.innerHTML = idn.outerHTML + named.outerHTML + priced.outerHTML + qtyed.outerHTML + totaled.outerHTML;
    if (empty !== null) {
        div.removeChild(empty);
    }
    div.appendChild(ul);
    button.style.display = "block";
}

function createRecord() {
    overall2.innerText = overall.innerText;
    var div = document.getElementById("record");
    var lis = document.getElementById("shop-cart").getElementsByTagName("ul");
    for (let i = 0; i < lis.length; i++) {
        div.innerHTML += lis[i].outerHTML;
    }
    var div2 = document.getElementById("shop-cart");
    div2.innerHTML = "<div id='empty'>There currently no items</div>";
    overall.innerText = "0";
    button.style.display = "none";
    section.style.display = "flex";
}
function generate() {
    record.innerHTML = "";
    section.style.display = "none";
    alert("Sales Report Succesfully generated")
}