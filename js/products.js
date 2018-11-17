let nerrortext = document.querySelector('#nerrortext');
let qerrortext = document.querySelector('#qerrortext');
let perrortext = document.querySelector('#perrortext');

table = document.getElementById('table');

var myHeaders = new Headers({
        'Accept': 'application/json',
        'content-type': 'application/json',
        'Authorization' : 'Bearer '  + localStorage.getItem('token'),
    });

var myInit = {
    method: 'GET',
    headers: myHeaders,
    cache: 'default',
    mode: 'cors'
};


const product_url = 'http://127.0.0.1:5000/api/v1/products';
const myRequest = new Request(product_url, myInit);
function allproducts() {
    fetch(myRequest)
    .then(handleResponse)
    .then((data) => {
        var output = '';
        data.products.forEach(function (product) {
            output += '<ul class="product-columns product-row" id="item' + product.productId + '">\n' +
                '<li class="column columnone" id="id' + product.productId + '">' + product.productId + '</li>\n' +
                '<li class="column columntwo" id="name' + product.productId + '">' + product.name + '</li>\n' +
                '<li class="column columnthree" id="price' + product.productId + '">' + product.price + '</li>\n' +
                '<li class="column columnfour" id="qty' + product.productId + '">\n' +
                '' + product.quantity +
                '</li>\n' +
                '<li class="column columnfive pos">\n' +
                '<button id ="pdt' + product.productId + '" class="btn st mod" onclick="pmod()">Modify</button>\n' +
                '<button id="' + product.productId + '" class="btn st del" onclick="pdel()">Delete</button>\n' +
                '</li>\n' +
                '</ul>';
        });
        table.innerHTML = output
    })
    .catch(function (error) {
        console.log(error);
    });
}

var delInit = {
    method: 'DELETE',
    headers: myHeaders,
    cache: 'default',
    mode: 'cors'
};

function pdel() {
    var del = document.getElementsByClassName('del');
    var x;
    for(i = 0; i < del.length; i++){
        del[i].onclick = function () {
            if(confirm('Are You Want To Delete?')){
                var delete_url = 'http://127.0.0.1:5000/api/v1/products/' + this.id;
                const myRequest = new Request(delete_url, delInit);
                fetch(myRequest)
                .then(handleResponse)
                .then((data) => {
                    let name = this.parentNode.parentNode.children[1].innerHTML;
                    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                    alert('You have succesfully deleted ' + name);
                    console.log(data)
                })
                .catch(function (error) {
                console.log(error);
                });
            }
        }

    }
}
var modifier = document.getElementById('modifier');
function pmod() {
    var div = document.getElementsByClassName('mod');
    var i;
    for (i = 0; i < div.length; i++) {
        div[i].onclick = function () {
        console.log(this.parentNode.parentNode.id);
        var ul = document.getElementById(this.parentNode.parentNode.id);
        console.log(ul);
        var kids = ul.children;
        console.log(kids[0]);
        document.getElementById('qb').innerText = kids[0].innerHTML;
        document.getElementById('pname').value = kids[1].innerHTML;
        document.getElementById('pprice').value = kids[2].innerHTML;
        document.getElementById('pquantity').value = kids[3].innerHTML;
        modifier.style.display = "block";
        }
    }
}



function edit() {
    let pname = document.getElementById('pname').value;
    let pprice = parseInt(document.getElementById('pprice').value);
    let pquantity = parseInt(document.getElementById('pquantity').value);
    var modInit = {
        method: 'PUT',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body:JSON.stringify({name:pname, price:pprice, quantity:pquantity})
    };
    let modId = document.getElementById('qb').innerText;
    for (var li of document.querySelectorAll('li')) {
        if (modId === li.innerText) {
            let ul = document.getElementById(li.parentNode.id);
            var modify_url = 'http://127.0.0.1:5000/api/v1/products/' + parseInt(modId);
            const myRequest = new Request(modify_url, modInit);
            fetch(myRequest)
            .then(handleResponse)
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch(function (error) {
                if (error){
                    console.log(error);
                    nerrortext.style.display = 'block';
                    nerrortext.innerText= 'product name should contain at least letters or a number';
                    setTimeout(function () {
                    nerrortext.style.display = 'none'
                    }, 5000)
                    }
                if (error.error.price){
                    console.log(error.error.price);
                    perrortext.style.display = 'block';
                    perrortext.innerText = 'price should be greater than zero';
                    setTimeout(function () {
                    perrortext.style.display = 'none'
                }, 5000)
                }
                if (error.error.quantity){
                    console.log(error.error.quantity);
                    qerrortext.style.display = 'block';
                    qerrortext.innerText = 'quantity should be greater than zero';
                    setTimeout(function () {
                    qerrortext.style.display = 'none'
                }, 5000)
                }
            })
        }

    }
}

document.getElementById('add-btn').addEventListener('click', makeproduct);

const category_url = 'http://127.0.0.1:5000/api/v1/categories';

const catRequest = new Request(category_url, myInit);
cats = document.getElementById('all-cats');


function makeproduct(){
    fetch(catRequest)
    .then(handleResponse)
    .then((data) => {
        var output = '<option id="options" selected disabled>Choose a category</option>';
        data.categories.forEach(function (category) {
            output += '<option value="' + category.categoryId + '">' + category.name +'</option>';
        });
        cats.innerHTML = output;
        var add = document.getElementById('add');
        add.style.display = 'block'

    })
    .catch(function (error) {
        alert('There are no categories available');
    });
}

let anerrortext = document.querySelector('#anerrortext');
let aqerrortext = document.querySelector('#aqerrortext');
let aperrortext = document.querySelector('#aperrortext');
let acerrortext = document.querySelector('#acerrortext');

function addproduct() {
    let categoryselect = document.getElementById('all-cats');
    let category_id = parseInt(categoryselect.options[categoryselect.selectedIndex].value);
    let aname = document.getElementById('aname').value;
    let aprice = parseInt(document.getElementById('aprice').value);
    let aquantity = parseInt(document.getElementById('aquantity').value);
    var addInit = {
        method: 'POST',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body:JSON.stringify({category_id: category_id, name:aname, price:aprice, quantity:aquantity})
    };
    var add_url = 'http://127.0.0.1:5000/api/v1/products';
    const addRequest = new Request(add_url, addInit);
    fetch(addRequest)
    .then(handleResponse)
    .then((data) => {
        window.location.reload();
        console.log(data);
        return 'product' + data.name + ' has been added';
    })
    .catch(function (error) {
        console.log(error.error.category_id);
        if (error.error.category_id){
            acerrortext.style.display = 'block';
            acerrortext.innerText= 'Please select a category';
            setTimeout(function () {
            acerrortext.style.display = 'none'
            }, 5000)
            }
        if (error.error.name){
            console.log(error.error.name);
            anerrortext.style.display = 'block';
            anerrortext.innerText= 'product name should contain at least letters or a number';
            setTimeout(function () {
            anerrortext.style.display = 'none'
            }, 5000)
            }
        if (error.error.price){
            console.log(error.error.price);
            aperrortext.style.display = 'block';
            aperrortext.innerText = 'price should be greater than zero';
            setTimeout(function () {
            aperrortext.style.display = 'none'
        }, 5000)
        }
        if (error.error.quantity){
            console.log(error.error.quantity);
            aqerrortext.style.display = 'block';
            aqerrortext.innerText = 'quantity should be greater than zero';
            setTimeout(function () {
            aqerrortext.style.display = 'none'
        }, 5000)
        }
    });

}