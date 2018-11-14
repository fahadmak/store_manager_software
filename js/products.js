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

            table.innerHTML = output;
        })
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
